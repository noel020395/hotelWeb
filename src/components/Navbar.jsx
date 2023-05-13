import React, { useState, useEffect } from "react";
import MyButton from "./Mybutton";

export default function Navbar() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // 根据当前的语言状态更新页面内容
    // 这里可以使用翻译库或自己编写翻译逻辑
    console.log(`Language changed to ${language}`);
  }, [language]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <nav href="/" className="flex-shrink-0 flex items-center">
              <a className="text-xl text-white mr-4" href="/">
                HotelWeb
              </a>
              <a className=" text-white m-4" href="/services">
                Services
              </a>
              <a className=" text-white mr-4" href="/about">
                About
              </a>
              <a className=" text-white mr-4" href="/book">
                Book
              </a>
              <a className=" text-white mr-4" href="/contact">
                Contact Us
              </a>
              <span>
                <MyButton
                  text="Login"
                  onClick={() => (window.location.href = "/login")}
                  color="gray"
                />
              </span>
            </nav>
          </div>
          <div className="flex items-center">
            <div className="ml-3 relative">
              <select
                value={language}
                onChange={handleLanguageChange}
                className="block appearance-none w-full bg-gray-700 border border-gray-500 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-500 focus:border-gray-500"
              >
                <option value="en">English</option>
                <option value="zh-CN">简体中文</option>
                <option value="zh-TW">繁體中文</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.29289,13.2929 C9.68342,12.9024 10.3166,12.9024 10.7071,13.2929 L14.7071,17.2929 C15.0976,17.6834 15.0976,18.3166 14.7071,18.7071 C14.3166,19.0976 13.6834,19.0976 13.2929,18.7071 L10,15.4142 L6.70711,18.7071 C6.31658,19.0976 5.68342,19.0976 5.29289,18.7071 C4.90237,18.3166 4.90237,17.6834 5.29289,17.2929 L9.29289,13.2929 Z M9.29289,6.29289 L5.29289,2.29289 C4.90237,1.90237 4.90237,1.2692 5.29289,0.87868 C5.68342,0.488155 6.31658,0.488155 6.70711,0.87868 L10,4.17157 L13.2929,0.87868 C13.6834,0.488155 14.3166,0.488155 14.7071,0.87868 C15.0976,1.2692 15.0976,1.90237 14.7071,2.29289 L10.7071,6.29289 C10.3166,6.68342 9.68342,6.68342 9.29289,6.29289 Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
