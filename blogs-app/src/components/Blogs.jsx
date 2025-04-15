import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import Spinner from "./Spinner";
import BlogDetails from "./BlogDetails";

const Blogs = () => {
  const { posts, loading } = useContext(AppContext);
  return (
    <div className="max-w-[900px] m-auto md:text-[1rem] py-8 pl-10 pr-10 flex flex-col justify-center items-center gap-y-10 mt-[60px] mb-[60px]">
      {loading ? (
        <Spinner />
      ) : posts.length === 0 ? (
        <div>
          <p>No Post Found</p>
        </div>
      ) : (
        posts.map((post) => (
          <BlogDetails key={post.id} post={post}/>
        ))
      )}
    </div>
  );
};

export default Blogs;
