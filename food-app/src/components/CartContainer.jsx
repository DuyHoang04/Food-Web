import React, { useEffect, useState } from "react";
import { ArrowBack, RemoveRedEye, Add, Minimize } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { motion } from "framer-motion";
import CardItem from "./CardItem";
import C1 from "../img/c1.png";
import { useStateValue } from "../context/StateProvider";
import EmptyCart from "../img/emptyCart.svg";

const CartContainer = () => {
  const [{ cartShow, cartItem }, dispatch] = useStateValue();
  const [delivery, setDelivery] = useState(2.5);
  const [flag, setFlag] = useState(1);
  const [total, setTotal] = useState(0);

  const closeCart = () => {
    dispatch({
      type: "SET_CART_SHOW",
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    let totalPrice = cartItem.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTotal(totalPrice);
  });

  const clearCart = () => {
    dispatch({
      type: "SET_CART_ITEMS",
      cartItem: [],
    });
    localStorage.setItem("cart", JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className={`z-[101] fixed top-0 right-0 w-full md:w-[350px] h-screen bg-white drop-shadow-md flex flex-col `}
    >
      <div className="w-full flex items-center justify-between p-4">
        <IconButton onClick={closeCart}>
          <ArrowBack className="text-headingColor" />
        </IconButton>
        <p>Giỏ Hàng</p>
        <motion.button
          onClick={clearCart}
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded-[10px]"
        >
          Xóa hết <RemoveRedEye />
        </motion.button>
      </div>

      {/* CardItem */}
      {cartItem && cartItem.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col ">
          <div className="w-full h-340  px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none ">
            {cartItem.map((item) => (
              <CardItem
                key={item.id}
                data={item}
                setFlag={setFlag}
                flag={flag}
              />
            ))}
          </div>

          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ {total}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ {delivery}</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex flex-col gap-3 items-center justify-between">
              <div className="w-full flex items-center justify-between">
                <p className="text-white text-lg font-semibold">Sub Total</p>
                <p className="text-white text-lg font-semibold">
                  $ {total + delivery}
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Check Out
              </motion.button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}

      {/* Total */}
    </motion.div>
  );
};

export default CartContainer;
