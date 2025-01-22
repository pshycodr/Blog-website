import React, { useEffect, useState } from 'react'
import { BlogCard } from './BlogCard'
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useValidation } from '../hooks/useValidation';
import { useNavigate } from 'react-router-dom';
import { BlogsSkeletonLoader } from './loader/BlogsSkeletonLoader';

interface BlogsProps {
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: string;
    author: {
        name: string;
    };
}

function DashboardBlogs({endPoint} : {endPoint : string}) {

    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<BlogsProps[]>([]);
    const [loading, setLoading] = useState(true);

    const user = useValidation();

    const blogsCall = async (jwt: string | null) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${endPoint}`, {
                headers: { Authorization: jwt },
            });
            // console.log(response.data.blogs)
            setBlogs(response.data.blogs);
        } catch (error) {
            console.log(error);
            alert("Error while fetching blogs");
            navigate('/signin')
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const jwt: string | null = localStorage.getItem("token");

        console.log(user)

        if (!jwt) { 
            navigate("/signin");
            return; 
        }

        blogsCall(jwt);
    }, [user, navigate]);

  return (
 

            <div className="flex flex-col items-center">
                {loading
                    ? Array(6).fill(null).map((_, index) => (
                        <BlogsSkeletonLoader key={index} />
                    ))
                    : blogs.map((blog) => (
                        <div className="m-3" key={blog.id}>
                            <BlogCard
                                id={blog.id}
                                title={blog.title}
                                content={blog.content}
                                authorName={blog.author.name}
                                publishedDate={blog.createdAt}
                                isDraft={endPoint==='draft' ? true : false}
                            />
                        </div>
                    ))}
            </div>

  )
}

export default DashboardBlogs