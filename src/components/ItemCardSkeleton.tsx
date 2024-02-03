import React from "react";

const ItemCardSkeleton = () => {
  return (
    <>
      <li
        className={`m-2 bg-gray-300 p-4 rounded-3xl md:w-full md:mx-10 md:max-w-[35%] animate-pulse`}
      >
        <div className="h-24 flex gap-2">
          <div className="h-24 w-24 rounded-3xl bg-white overflow-hidden shrink-0"></div>
          <div className=""></div>
        </div>
      </li>
      <li
        className={`m-2 bg-gray-300 p-4 rounded-3xl md:w-full md:mx-10 md:max-w-[35%] animate-pulse`}
      >
        <div className="h-24 flex gap-2">
          <div className="h-24 w-24 rounded-3xl bg-white overflow-hidden shrink-0"></div>
          <div className=""></div>
        </div>
      </li>
      <li
        className={`m-2 bg-gray-300 p-4 rounded-3xl md:w-full md:mx-10 md:max-w-[35%] animate-pulse`}
      >
        <div className="h-24 flex gap-2">
          <div className="h-24 w-24 rounded-3xl bg-white overflow-hidden shrink-0"></div>
          <div className=""></div>
        </div>
      </li>
      <li
        className={`m-2 bg-gray-300 p-4 rounded-3xl md:w-full md:mx-10 md:max-w-[35%] animate-pulse`}
      >
        <div className="h-24 flex gap-2">
          <div className="h-24 w-24 rounded-3xl bg-white overflow-hidden shrink-0"></div>
          <div className=""></div>
        </div>
      </li>
    </>
  );
};

export default ItemCardSkeleton;
