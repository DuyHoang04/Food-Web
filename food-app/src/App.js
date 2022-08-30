import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import CreateContainer from "./components/CreateContainer";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import Login from "./components/Login";
import { getAllFood } from "./utils/firebaseFunction";
import { useStateValue } from "./context/StateProvider";

const App = () => {
  const [{ food }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFood().then((data) => {
      dispatch({
        type: "SET_FOOD",
        food: data,
      });
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <Router>
        <div className="w-screen h-auto flex flex-col bg-primary">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <>
                  <Header />
                  <MainContainer />
                </>
              }
            />
            <Route
              path="/create"
              element={
                <>
                  <Header />
                  <CreateContainer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AnimatePresence>
  );
};

export default App;
