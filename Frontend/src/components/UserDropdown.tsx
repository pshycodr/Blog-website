import React, { useState } from "react";
import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";
import ModalComponent from "./ModalComponent";

const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    const name = localStorage.getItem('name') || ""

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="relative">
            {/* Dropdown Button */}
            <button
                id="dropdownAvatarNameButton"
                onClick={toggleDropdown}
                className="flex items-center text-sm pe-1 font-medium text-black rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 "
                type="button"
            >
                <Avatar name={name} />
                <span className="ml-2">{name || "Unknown"}</span>
                
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    id="dropdownAvatarName"
                    className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownAvatarNameButton"
                    >
                        <li>
                            <Link
                                to="/my-blogs"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Settings
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Earnings
                            </Link>
                        </li>
                    </ul>
                    <div className="py-2">
                        <button
                            onClick={() => {
                              
                            }}
                            className="block w-full px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                            <ModalComponent />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
