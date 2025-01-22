import { useState } from "react";
import Appbar from "../components/Appbar";
import Header from "../components/Header";
import DashboardBlogs from "../components/DashboardBlogs";

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("my-blogs");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Appbar */}
      <Appbar />

      {/* Header */}
      <div className="w-full text-center my-4">
        <Header text="Your Blogs" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row lg:justify-evenly mt-6 mx-4">
        {/* Sidebar */}
        <div className="lg:mr-6 mb-4 lg:mb-0">
          <div className="flex lg:flex-col gap-4 lg:gap-2 border-b lg:border-b-0 lg:border-r lg:border-r-gray-300 pb-2 lg:pb-0">
            <div
              className={`px-4 py-2 cursor-pointer transition ${
                selectedTab === "my-blogs"
                  ? "text-blue-500 font-bold border-b-2 lg:border-b-0 lg:border-r-2 border-blue-500"
                  : "hover:text-blue-400"
              }`}
              onClick={() => setSelectedTab("my-blogs")}
            >
              <p>Published</p>
            </div>
            <div
              className={`px-4 py-2 cursor-pointer transition ${
                selectedTab === "draft"
                  ? "text-blue-500 font-bold border-b-2 lg:border-b-0 lg:border-r-2 border-blue-500"
                  : "hover:text-blue-400"
              }`}
              onClick={() => setSelectedTab("draft")}
            >
              <p>Draft</p>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="flex-grow">
          {selectedTab === "my-blogs" && (
            <DashboardBlogs endPoint="my-blogs" />
          )}
          {selectedTab === "draft" && <DashboardBlogs endPoint="draft" />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
