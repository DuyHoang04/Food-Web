import React, { useEffect } from "react";
import Logo from "../img/logo.png";
import Google from "../img/google.png";
import { app } from "../firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";

const Login = () => {
  const [{ user }, dispatch] = useStateValue();

  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const login = async () => {
    if (!user) {
      const responsive = await signInWithPopup(auth, provider).then((res) => {
        console.log(res.user);
        navigate("/home");
        dispatch({
          type: "SET_USER",
          user: res.user,
        });
        localStorage.setItem("user", JSON.stringify(res.user));
      });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-2 bg-gradient-to-br from-orange-400 to-orange-500 w-full">
      <img className="w-[150px]" src={Logo} alt="" />
      <h1 className="text-3xl font-bold text-[white] italic">
        Thơm ngon mời bạn ăn nha
      </h1>
      <button
        onClick={login}
        className="flex items-center justify-center rounded-[40px] border-solid border-2 border-[gray] mt-8 py-[4px] pr-[12px] bg-white "
      >
        <img className="w-[50px]" src={Google} alt="" />
        Đăng nhập bằng Google
      </button>
    </div>
  );
};

export default Login;
