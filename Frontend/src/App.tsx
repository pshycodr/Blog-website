import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Publish from "./pages/Publish";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Signup/>} />
                    <Route path="/signin" element={<Signin/>} />
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/blogs" element={<Blogs/>} />
                    <Route path="/blog/:id" element={<Blog/>} />
                    <Route path="/new-blog" element={<Publish/>} />
                    <Route path="/my-blogs" element={<Dashboard/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
