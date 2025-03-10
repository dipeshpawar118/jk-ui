import React from "react";
import { useNavigate } from "react-router";
import { post as postApi } from "../utlis/api.serive";

const CreatePost = () => {
  const navigate = useNavigate();
  const [post, setPost] = React.useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await postApi("posts", post);
      if (response.status === 201) {
        handleCacnel();
        navigate("/user/dashboard");
      } else {
        console.log(response);
      }
    } catch (error) {}
  };

  const handleCacnel = () => {
    setPost({ title: "", content: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900">
        Create Post
      </h2>

      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900"> New Post</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label
                htmlFor="title"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  onChange={handleChange}
                  value={post.title}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="content"
                className="block text-sm/6 font-medium text-gray-900"
              >
                content
              </label>
              <div className="mt-2">
                <textarea
                  id="content"
                  name="content"
                  rows={4}
                  onChange={handleChange}
                  value={post.content}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write a few sentences about topic.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={handleCacnel}
          className="text-sm/6 font-semibold text-gray-900"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
