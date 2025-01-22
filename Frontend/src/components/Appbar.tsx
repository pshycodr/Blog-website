import { Link, useNavigate } from "react-router-dom";
import UserDropdown from "./UserDropdown";

function Appbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-16 flex justify-between items-center px-4 sm:px-6 lg:px-8 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/blogs" className="text-xl sm:text-2xl font-bold text-gray-800">
          Blog Web 
        </Link>
      </div>

      {/* Navigation Actions */}
      <div className="flex items-center gap-4">
        {/* New Blog Button */}
        <button
          type="button"
          className="hidden sm:inline-block text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg font-medium rounded-lg text-sm px-4 py-2"
          onClick={() => navigate("/new-blog")}
        >
          + New Blog
        </button>

        {/* User Dropdown */}
        <div>
          <UserDropdown />
        </div>
      </div>

      {/* Mobile Button */}
      <button
        type="button"
        className="sm:hidden text-white bg-green-500 hover:bg-green-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={() => navigate("/new-blog")}
      >
        <span className="sr-only">Create New Blog</span>
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}

export default Appbar;
