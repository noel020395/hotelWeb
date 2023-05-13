import React from "react";
import Carousel from "../components/home/Carousel";
import Banner from "../components/home/Banner";
import ImgCard from "../components/ImgCard";

export default function HomePage() {
  return (
    <div>
      <Carousel />
      <Banner />
      <div className="flex flex-row justify-center">
        <div className="grid grid-cols-2 grid-rows-3">
          <ImgCard />
          <ImgCard />
          <ImgCard />
          <ImgCard />
          <ImgCard />
          <ImgCard />
        </div>
      </div>
    </div>
    
  );
}
