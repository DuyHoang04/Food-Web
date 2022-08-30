import React, { useEffect, useState } from "react";
import CartContainer from "./CartContainer";
import { FruitSection } from "./FruitSection";
import { HomeContainer } from "./HomeContainer";
import { MenuContainer } from "./MenuContainer";
import { useStateValue } from "../context/StateProvider";

const MainContainer = () => {
  const [{ cartShow }, dispatch] = useStateValue();

  return (
    <div className="mt-16 md:mt-20 py-4 px-8 w-full">
      <div className="w-full h-auto flex flex-col items-center justify-center overflow-x-hidden">
        <HomeContainer />
        <FruitSection />
        <MenuContainer />
        {cartShow ? <CartContainer /> : <></>}
      </div>
    </div>
  );
};

export default MainContainer;
