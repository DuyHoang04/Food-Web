import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";

export const HomeContainer = () => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-[calc(100% - 88px]"
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start justify-center md:items-start gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-7 h-7 rounded-full overflow-hidden bg-white">
            <img
              className="w-full h-full object-contain"
              src={Delivery}
              alt="Delivery"
            />
          </div>
        </div>

        <p className="text-[2.5rem] font-bold tracking-wide text-headingColor md:text-[4.5rem]">
          The Fastest Delivery in{""}
          <span className="text-orange-600 text-[3rem] md:text-[5rem]">
            Your City
          </span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis
          iste itaque aliquam nulla consectetur saepe fugit cupiditate facilis
          exercitationem sunt, esse quod autem doloribus, eius obcaecati
          dolorem, officiis odio et?
        </p>

        <button
          type="button"
          className=" bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease md:w-auto"
        >
          Đặt ngay
        </button>
      </div>
      <div className=" relative py-2 flex-1 flex items-center justify-center">
        <img
          src={HeroBg}
          alt=""
          className="lg:h-[650px] ml-auto h-420 w-full lg:w-auto "
        />

        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32  py-4 gap-4 md:gap-2 flex-wrap">
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className="  lg:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={n.img}
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20 "
                  alt="I1"
                />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {n.name}
                </p>

                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                  {n.decp}
                </p>

                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span> {n.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
