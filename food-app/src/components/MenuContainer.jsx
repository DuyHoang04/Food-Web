import React, { useEffect, useState } from "react";
import { Fastfood } from "@mui/icons-material";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { FruitSection } from "./FruitSection";
import { useStateValue } from "../context/StateProvider";

export const MenuContainer = () => {
  const [filter, setFilter] = useState("chicken");
  const [{ food }, dispatch] = useStateValue();

  console.log(food);

  useEffect(() => {}, [filter]);

  return (
    <section className="w-full my-6">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl mr-auto font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-[6rem] before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
          Our Hot Dishes
        </p>

        <div className=" mt-8 w-full flex items-start md:justify-center gap-8 py-6 overflow-scroll scroll-bar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                onClick={() => setFilter(category.urlParamName)}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category.urlParamName
                      ? "bg-white"
                      : "bg-cartNumBg"
                  } group-hover:bg-white flex items-center justify-center p-3`}
                >
                  <Fastfood
                    className={`${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : "text-white"
                    } group-hover:text-textColor text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full h-screen">
          <RowContainer
            flag={false}
            data={food?.filter((e) => e.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};
