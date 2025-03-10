import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { get, remove } from "../utlis/api.serive";
import { convertTime } from "../utlis/pipe";

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const products = [
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
  ];

  const getUserPost = async () => {
    try {
      let data = await get("posts");
      if (data ) {
        setPosts(data);
      }
    } catch (error) {
      alert("error");
    }
  };

  const handelDelete = async (id) => {
    try {
      let url = "posts/" + id;
      const result = await remove(url);

      if (result.status === 200) {
        alert("Post Delete Success")
       await getUserPost();
      }else {

        alert("Unable to delete")
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUserPost();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900">
        Welecome to the Dashboard
      </h2>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl p-4  sm:p-6  lg:max-w-7xl lg:px-8">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">
            User Posts
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {posts?.map((post, index) => (
              <div key={index} className="group relative">
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm ">
                  <Link to={`/view/${post._id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {post.title}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 ">
                      {post.content}
                    </p>
                    <p className="mb-2 text-sm font-medium text-gray-400">
                      created At : {convertTime(post.createdAt)}
                    </p>
                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </button>
                  </Link>

                  <div className="flex mt-4  gap-2 ustify-between">
                    <button
                      type="button"
                      class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-2 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                    >
                      Edit
                    </button>

                    <button
                      onClick={()=>handelDelete(post._id)}
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
