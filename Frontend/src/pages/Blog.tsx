import  { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Appbar from "../components/Appbar";
import DateTime from "../components/DateTime";
import Loader from "../components/loader/Loader";

interface Blog {
    title: string;
    content: string;
    createdAt : string;
    author:{
        name : string;
    };
}

function Blog() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const getBlog = async (id: string) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            })
            console.log(response.data.blogs[0])            
            setBlog(response.data.blogs[0]);
        } catch (err) {
            setError("Failed to fetch the blog. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!id) {
            alert("Invalid blog ID.");
            navigate("/blogs");
            return;
        }

        getBlog(id);
    }, [id, navigate]);

    return (
        <div>
            {/* Header */}
            <Appbar/>

            {/* Content */}
            <div className="max-w-4xl mx-auto p-6">
                {loading && <Loader />}
                {error && <p className="text-red-500">{error}</p>}
                {blog && (
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <Header text={blog.title} />
                        <p className="text-sm text-gray-500 mb-6">
                            By <span className=" font-bold">{blog.author.name || "Anonymous"} </span> on <span className="italic"> <DateTime isoDate={blog.createdAt} /></span>
                        </p>
                        <div className="text-gray-700 leading-relaxed">{blog.content}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Blog;
