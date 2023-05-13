import React from "react";
import ImgCard from "../components/ImgCard";
import RoomPagination from "../components/RoomPagination";

export default function ServicePage() {
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 grid-rows-3 gap-7">
        <ImgCard />
        <ImgCard />
        <ImgCard />
        <ImgCard />
        <ImgCard />
        <ImgCard />
        <ImgCard />
        <ImgCard />
        <ImgCard />
        <ImgCard />
        <ImgCard />
        <ImgCard />
        <ImgCard />
        <ImgCard />
      </div>
      <RoomPagination />
    </div>

  );
}
