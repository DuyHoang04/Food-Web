import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import C1 from "../img/c1.png";
import { Add, Minimize } from "@mui/icons-material";
import { useStateValue } from "../context/StateProvider";

const CardItem = ({ data, flag, setFlag }) => {
  const [{ cartItem }, dispatch] = useStateValue();
  const [items, setItems] = useState([]);
  const [qty, setQty] = useState(data.qty);

  const cartDispatch = () => {
    localStorage.setItem("cart", JSON.stringify(items));
    dispatch({
      type: "SET_CART_ITEMS",
      cartItem: items,
    });
  };

  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      cartItem.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      // initial state value is one so you need to check if 1 then remove it
      if (qty === 1) {
        setItems(cartItem.filter((item) => item.id !== id)); //xóa id nếu không có id thì ko thể trừ thêm dc nx
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItem.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    setItems(cartItem);
  }, [qty, items]);

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center justify-between gap-2 ">
      <img
        src={data?.img}
        alt=""
        className="w-20 h-20 max-w-[60px]  rounded-full object-contain"
      />

      {/* Name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{data?.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          ${data?.price * qty}
        </p>
      </div>

      {/* Button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <IconButton onClick={() => updateQty("remove", data?.id)}>
          <Minimize className="text-white mb-4" />
        </IconButton>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-white flex items-center justify-center text-lg">
          {qty}
        </p>
        <IconButton onClick={() => updateQty("add", data?.id)}>
          <Add className="text-white" />
        </IconButton>
      </div>
    </div>
  );
};

export default CardItem;
