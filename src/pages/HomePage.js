import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";

const HomePage = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      history.push("/");
    }
  }, [history]);

  return (
    <div class="h-screen md:flex">
      <div class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <div>
          <h1 class="text-white font-bold text-4xl font-sans">GoChat</h1>
          <p class="text-white mt-1">
            Chat with your friends and family with GoChat
          </p>
        </div>
        <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div class="flex flex-col md:w-1/2 justify-center py-5 items-center space-y-8 bg-white">
        <div class="relative flex flex-col text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
          <h4 class="block font-sans text-2xl text-center antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {activeTab === "login" ? "Log In" : "Sign Up"}
          </h4>
          {activeTab === "login" ? (
            <Login setActiveTab={setActiveTab} />
          ) : (
            <SignUp setActiveTab={setActiveTab} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
