import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const Pagination = () => {
  const { page, totalPages, handlePageChange} = useContext(AppContext);
  return (
    <div className="w-full flex justify-center items-center border-2 fixed bottom-0 bg-white">
      <div className="flex justify-between w-11/12 max-w-[820px] py-2">
        <div className="flex gap-x-2">
        {page > 1 && (
          <button
            className="rounded-md border-2 px-4 py-1 active:bg-gray-500 cursor-pointer"
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </button>
        )}

        {page < totalPages && (
          <button
            className="rounded-md border-2 px-4 py-1 active:bg-gray-500 cursor-pointer"
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        )}
        </div>

        <p className="text-sm font-bold">
          Page {page} of {totalPages}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
