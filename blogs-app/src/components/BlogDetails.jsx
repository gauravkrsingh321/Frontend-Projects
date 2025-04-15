import React from "react";
import { NavLink } from "react-router";

const BlogDetails = ({post}) => {
  return (
    <div className="flex flex-col mb-4">
      <NavLink to={`/blog/${post.id}`}>
        <span className="font-bold text-[1rem]">{post.title}</span>
      </NavLink>
      <p>
        By <span>{post.author}</span>on{" "}
        <NavLink className="font-medium underline" to={`/categories/${post.category.replaceAll(" ", "-")}`}>
          <span>{post.category}</span>
        </NavLink>
      </p>
      <p className="mb-2">Posted on {post.date}</p>
      <p className="mb-1 text-[0.9rem] md:text-[1rem]">{post.content}</p>
      <div>
        {post.tags.map((tag,index)=> (
          <NavLink key={index} to={`/tags/${tag.replaceAll(" ","-")}`}>
            <span className="text-blue-600 underline hover:text-blue-800 pr-3 text-[0.9rem] md:text-[1rem]">{`#${tag}`}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BlogDetails;
