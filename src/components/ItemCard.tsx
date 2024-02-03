import { SearchResultItem } from "@/types";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import React from "react";

const ItemCard = ({ item }: { item: SearchResultItem }) => {
  return (
    <li
      className={`m-2 bg-gray-100 p-4 rounded-3xl md:w-full md:mx-10 md:max-w-[35%]`}
    >
      <div className="flex gap-2">
        <div className="h-24 w-24 rounded-3xl bg-white overflow-hidden shrink-0">
          <Image
            alt={`${item.supermarket} logo`}
            src={item.logo_link}
            width={120}
            height={120}
          />
        </div>
        <div className="">
          <p className="font-bold">{item.name}</p>
          <p className="text-gray-400 font-semibold text-sm">${item.price}</p>
          <p className="text-gray-400 font-semibold text-sm">
            {item.supermarket} {formatDate(item.date)}
          </p>
        </div>
        {/* <div className="w-6 h-6 ml-auto self-center flex justify-center items-center rounded-full bg-white p-4 shadow-md">
        <OpenCardButton setState={toggleOpenCard} />
      </div> */}
      </div>
    </li>
  );
};

export default ItemCard;
