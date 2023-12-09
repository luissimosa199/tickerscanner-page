import React from "react";

const ItemCardSkeleton = () => {
  return (
    <>
      <li
        className={`m-2 bg-gray-300 p-4 rounded-3xl md:w-full md:mx-10 animate-pulse`}
      >
        <div className="h-24"></div>
      </li>
      <li
        className={`m-2 bg-gray-300 p-4 rounded-3xl md:w-full md:mx-10 animate-pulse`}
      >
        <div className="h-24"></div>
      </li>
      <li
        className={`m-2 bg-gray-300 p-4 rounded-3xl md:w-full md:mx-10 animate-pulse`}
      >
        <div className="h-24"></div>
      </li>
      <li
        className={`m-2 bg-gray-300 p-4 rounded-3xl md:w-full md:mx-10 animate-pulse`}
      >
        <div className="h-24"></div>
      </li>
    </>
  );
};

export default ItemCardSkeleton;
