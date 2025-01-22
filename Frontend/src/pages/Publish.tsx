import React, { useState } from "react";
import axios from "axios";
import Appbar from "../components/Appbar";
import Input from "../components/Input";
import Loader from "../components/loader/Loader";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

function Publish() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (isPublished: boolean) => {
    if (!title || !content) {
      alert("Please fill out both title and content.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please login.");
        navigate("/signin");
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content, published: isPublished },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        alert(isPublished ? "Blog published successfully!" : "Draft saved successfully!");
        setTitle("");
        setContent("");
        navigate(isPublished ? "/blogs" : "/dashboard");
      } else {
        alert("Failed to process the request.");
      }
    } catch (error) {
      console.error("Error while processing the request:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {loading && <Loader />}
      <Appbar />
      <div className="mx-auto bg-white p-6 mt-6 rounded-md shadow-md w-full max-w-md sm:w-[600px]">
        <div className="mb-6">
          <Input
            label="Title"
            placeholder="Enter Blog Title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
            Blog Content
          </label>
          <textarea
            id="content"
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-700"
          ></textarea>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => handleSubmit(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md font-medium"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default Publish;
