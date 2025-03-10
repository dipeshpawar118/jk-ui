import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function Header() {
  const { logout, user, token } = useAuth();
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("/user/create-post");
  };

  const handleGoToHome = () => {
    navigate("/user/dashboard");
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-6"
      >
        <div className="flex lg:flex-1">
          <a onClick={handleGoToHome} className="-m-1.5 ">
            <span className="text-3xl  ">JK </span>
          </a>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user && token ? (
            <a className="text-sm/6 font-semibold text-gray-900">
              Welcome, {user.name}{" "}
              <span>
                <button
                  onClick={handleCreatePost}
                  type="button"
                  class="ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create Post
                </button>
              </span>
              <span>
                <button
                  className="mx-3 py-2 px-5 me-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </span>
            </a>
          ) : (
            <a href="/login" className="text-sm/6 font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
