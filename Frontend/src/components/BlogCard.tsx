import { Link } from "react-router-dom";
import Header from "./Header";
import DateTime from "./DateTime";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Loader from "./loader/Loader";
import { useState } from "react";

interface BlogCardProps {
  id: string;
  title: string;
  content: string;
  authorName: string;
  publishedDate: string;
  isDraft?: boolean;
}

export const BlogCard = ({
  id,
  title,
  content,
  authorName,
  publishedDate,
  isDraft = false,
}: BlogCardProps) => {
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please login.");
        return;
      }

      const response = await axios.put(
        `${BACKEND_URL}/api/v1/blog/blog`,
        { id, title, content, published: true },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        alert("Blog published successfully!");
        window.location.reload();
      } else {
        alert("Failed to publish the blog.");
      }
    } catch (error) {
      console.error("Error while publishing the blog:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col gap-5 sm:w-[600px] relative">
      {loading && <Loader />}
      {isDraft && (
        <button
          onClick={handlePublish}
          className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-md hover:bg-green-600 sm:text-sm"
        >
          {loading ? "Publishing": "Publish"}
        </button>
      )}
      <div className="flex items-center gap-4">
        <Avatar name={authorName} />
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-800">{authorName ? authorName : "Anonymous"}</p>
          <p className="text-xs text-gray-500">
            <DateTime isoDate={publishedDate} />
          </p>
        </div>
      </div>
      <div>
        <Header text={title} />
      </div>
      <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
        {content.length > 150 ? `${content.slice(0, 150)}...` : content}
      </div>
      <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500">
        <span>{`${Math.ceil(content.length / 100)} minutes read`}</span>
        <Link to={`/blog/${id}`} className="text-blue-500 hover:underline">
          Read More
        </Link>
      </div>
    </div>
  );
};

export const Avatar = ({ name }: { name: string }) => {
  return name ? (
    <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 text-blue-500 rounded-full">
      <span className="text-sm sm:text-lg font-semibold">{name.charAt(0).toUpperCase()}</span>
    </div>
  ) : (
    <div className="relative w-6 h-6 sm:w-8 sm:h-8 overflow-hidden bg-gray-100 rounded-full">
      <svg
        className="absolute w-8 h-8 sm:w-10 sm:h-10 text-gray-400 -left-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};
