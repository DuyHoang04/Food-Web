import React, { useState, useEffect } from "react";
import Logo from "../img/logo.png";
import { ShoppingCart, Add, Logout } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import Avatars from "../img/avatar.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const Header = ({ addItem }) => {
  //navbar scroll when active state
  const [navbar, setNavbar] = useState(false);
  const [{ user, cartShow, cartItem }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  //navbar scroll changeBackground function
  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground);
  });

  const auth = getAuth();
  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth).then(() => {
      navigate("/");
      dispatch({
        type: "SET_USER",
        user: null,
      });
      localStorage.clear();
    });
  };

  const ShowCart = () => {
    dispatch({
      type: "SET_CART_SHOW",
      cartShow: !cartShow,
    });
  };

  return (
    <div
      className={`fixed z-50 w-screen p-3 px-8 md:p-6 md:px-16 ${
        navbar && "bg-white"
      }`}
    >
      {/* desktop and tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to="/home">
          <div className="flex items-center gap-2">
            <img className="w-10 object-cover" src={Logo} alt="" />
            <p className="text-headingColor text-xl font-bold">Hoang</p>
          </div>
        </Link>

        <div className="flex items-center ">
          <ul className="flex items-center gap-10">
            <li className="text-base text-[gray] cursor-pointer hover:text-headingColor duration-100">
              Trang chủ
            </li>
            <li className="text-base text-[gray] cursor-pointer hover:text-headingColor duration-100">
              Menu
            </li>
            <li className="text-base text-[gray] cursor-pointer hover:text-headingColor duration-100">
              Giới thiệu
            </li>
            <li className="text-base text-[gray] cursor-pointer hover:text-headingColor duration-100">
              Dịch vụ
            </li>
          </ul>

          <div className="relative flex items-center justify-center">
            <ShoppingCart
              onClick={ShowCart}
              className="text-textColor ml-8 cursor-pointer"
            />
            {cartItem && cartItem.length > 0 ? (
              <div className=" absolute -top-1.5 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItem.length}
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="relative" onClick={(e) => setIsMenu(!isMenu)}>
            <Avatar
              className="ml-8 cursor-pointer active:scale-90"
              src={user ? user.photoURL : ""}
            ></Avatar>
            {isMenu && (
              <div className=" w-max bg-gray-50 shadow-xl rounded-lg absolute flex flex-col top-11 right-0">
                {user && user.email === "duyhoang220904@gmail.com" && (
                  <Link to="/create">
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-sm">
                      Thêm sản phẩm <Add />
                    </p>
                  </Link>
                )}
                <p
                  onClick={logOut}
                  className="px-4 py-2 flex items gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-sm"
                >
                  Đăng xuất <Logout />
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex md:hidden w-full h-full items-center justify-between">
        <div className="relative flex items-center justify-center">
          <ShoppingCart
            onClick={ShowCart}
            className="text-textColor cursor-pointer"
          />
          {cartItem && cartItem.length > 0 ? (
            <div className=" absolute -top-1.5 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItem.length}
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold">Hoang</p>
        </Link>

        <div className="relative" onClick={(e) => setIsMenu(!isMenu)}>
          <Avatar
            className="ml-8 cursor-pointer active:scale-90"
            src={user ? user.photoURL : ""}
          ></Avatar>
          {isMenu && (
            <div className=" w-max bg-gray-50 shadow-xl rounded-lg absolute flex flex-col top-11 right-0">
              {user && user.email === "duyhoang220904@gmail.com" && (
                <Link to="/create">
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-sm">
                    Thêm sản phẩm <Add />
                  </p>
                </Link>
              )}

              <p className="px-4 py-2 flex items gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-sm">
                Trang chủ
              </p>
              <p className="px-4 py-2 flex items gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-sm">
                Menu
              </p>
              <p className="px-4 py-2 flex items gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-sm">
                Giới thiệu
              </p>
              <p className="px-4 py-2 flex items gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-sm">
                Dịch vụ
              </p>

              <p
                onClick={logOut}
                className="px-4 py-2 flex items gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-sm"
              >
                Đăng xuất <Logout />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
