import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { get } from "../utlis/api.serive";
import { convertTime } from "../utlis/pipe";

const ViewPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const getPostDeatils = async () => {
    try {
      let url = "posts/" + id;
      const data = await get(url);
      setPost(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (id) {
      getPostDeatils();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="my-5 text-4xl font-bold tracking-tight text-gray-900">
        ViewPost
      </h2>
      <>
        {post !== null ? (
          <div className="max-w-sm p-6 bg-white">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Title : {post.title}
            </h5>
            <p className="my-3 font-xl text-gray-700 ">Content </p>

            <p className="mb-3 font-normal text-gray-700 ">{post.content}</p>
            <p className="mb-2 text-sm font-medium text-gray-400">
              created At : {convertTime(post.createdAt)}
            </p>
          </div>
        ) : (
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Loading Data
          </h5>
        )}
      </>
    </div>
  );
};

export default ViewPost;
