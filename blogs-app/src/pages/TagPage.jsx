import React from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router";
import Blogs from "../components/Blogs";
import Pagination from "../components/Pagination";

const TagPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tag = location.pathname.split("/").at(-1);
  return (
    <div className="max-w-[900px] relative m-auto  py-8 flex flex-col justify-center items-center gap-y-10 mt-[60px] mb-[0px]">
      <Header />
      <div className="w-full pl-10 pr-10">
        <button className="border-2 cursor-pointer hover:bg-gray-200 p-1 pl-2 pr-2 text-[1rem]" onClick={() => navigate(-1)}>Back</button>
        <h2 className="font-bold text-[20px] mt-4">
          Blogs Tagged <span className="underline text-blue-600">#{tag}</span>
        </h2>
      </div>
      <Blogs />
      <Pagination />
    </div>
  );
};

export default TagPage;
