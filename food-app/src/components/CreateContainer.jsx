import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Fastfood,
  CloudUpload,
  Delete,
  FoodBank,
  AttachMoney,
} from "@mui/icons-material";
import { categories } from "../utils/data";
import Loader from "./Loader";
import { storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { saveItem } from "../utils/firebaseFunction";
import { useStateValue } from "../context/StateProvider";
import { getAllFood } from "../utils/firebaseFunction";

const CreateContainer = () => {
  const [{ food }, dispatch] = useStateValue();

  const [title, setTitle] = useState("");
  const [calo, setCalo] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `image/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const upLoad = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (err) => {
        console.log(err);
        setFields(true);
        setMsg("Đã có lỗi khi upload ảnh: Vui lòng thử lại");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setAlertStatus("success");
          setMsg("Up ảnh thành công");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setAlertStatus("success");
      setMsg("Xoá ảnh thành công");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !calo || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("Ghi đầy đủ xem nào nguời anh em");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          img: imageAsset,
          category: category,
          calo: calo,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setAlertStatus("success");
        setMsg("Up thành công");
        clearData();
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (err) {
      console.log(err);
      setFields(true);
      setMsg("Đã có lỗi khi upload ảnh: Vui lòng thử lại");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
    fetchData();
  };

  const fetchData = async () => {
    await getAllFood().then((data) => {
      dispatch({
        type: "SET_FOOD",
        food: data,
      });
    });
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalo("");
    setPrice("");
    setCategory("Select Category");
  };

  return (
    <div className="mt-16 md:mt-20 py-4 px-16 w-full">
      <div className="w-full flex items-center justify-center">
        <div className="w-[90%] md:w-[60%] border border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center">
          {/* ========TITLE ========*/}
          {fields && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`w-full p-2 rounded-lg text-center text-base font-semibold ${
                alertStatus === "danger"
                  ? "bg-red-400 text-red-800"
                  : "bg-emerald-400 text-emerald-800"
              }`}
            >
              {msg}
            </motion.p>
          )}

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <Fastfood className="text-xl text-gray-700 " />
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Vui lòng ghi tiêu đề món"
              className="w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-400 text-textColor"
            />
          </div>

          {/* ======SELECT========= */}
          <div className="w-full m-[15px]">
            <select
              className="w-full p-2 rounded-lg border-gray-200 border-b-2 cursor-pointer"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="other" className=" bg-white">
                Select Category
              </option>
              {categories &&
                categories.map((item) => (
                  <option
                    key={item.id}
                    value={item.urlParamName}
                    className="text-base border-0 capitalize bg-white text-headingColor"
                  >
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          {/* =============UPLOAD IMG=========== */}
          <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-300 cursor-pointer">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {!imageAsset ? (
                  <>
                    <label className="w-full flex h-full flex-col items-center justify-center cursor-pointer">
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        <CloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                        <p className="text-gray-500 hover:text-gray-700">
                          Click vào đây để đăng ảnh
                        </p>
                      </div>
                      <input
                        type="file"
                        name="UploadImg"
                        accept="image/"
                        onChange={uploadImage}
                        className="hidden"
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div className="relative h-full">
                      <img
                        src={imageAsset}
                        alt="uploadImage"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={deleteImage}
                        type="button"
                        className="absolute bottom-3 right-0 p-3 rounded-full bg-red-500 cursor-pointer hover:shadow-md duration-100 ease-in-out transition-all"
                      >
                        <Delete className="text-white" />
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <div className="w-full flex flex-col items-center md:flex-row gap-3">
            {/* ========PRICE AND CALo */}
            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <FoodBank className="text-gray-700 text-2xl" />
              <input
                type="text"
                required
                value={calo}
                onChange={(e) => setCalo(e.target.value)}
                placeholder="Calories"
                className="w-full h-full text-lg bg-transparent "
              />
            </div>
            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <AttachMoney className="text-gray-700 text-2xl" />
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="Price"
                className="w-full h-full text-lg bg-transparent "
              />
            </div>
          </div>

          {/* =========BUTTON============ */}
          <div className="flex items-center w-full justify-center mt-4">
            <button
              type="button"
              className="md:ml-auto bg-emerald-400 text-white px-12 py-2 rounded-lg font-semibold text-lg active:scale-90 transition-all duration-100 ease-in-out"
              onClick={saveDetails}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
