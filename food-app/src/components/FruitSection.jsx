import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

export const FruitSection = () => {
  const [{ food }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0); //scrollValue ===  scrollOffset

  useEffect(() => {}, [scrollValue]);

  return (
    <section className=" w-full my-6">
      <div className="w-full flex items-center justify-between">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
          Our fresh & healthy fruits
        </p>

        <div className="items-center hidden md:flex gap-3 ">
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="p-2 w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg"
            onClick={() => setScrollValue(-200)}
          >
            <ArrowBackIosNewRounded className="text-white" />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="p-2 w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg"
            onClick={() => setScrollValue(200)}
          >
            <ArrowForwardIosRounded className="text-white" />
          </motion.div>
        </div>
      </div>
      <RowContainer
        scrollValue={scrollValue}
        flag={true}
        data={food?.filter((e) => e.category === "fruits")}
      />
    </section>
  );
};
