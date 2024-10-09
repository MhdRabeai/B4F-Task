// import React, { useEffect, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { IoMoon } from "react-icons/io5";
// import { IoSunny } from "react-icons/io5";
export default function Navbar() {
  // const [dark, setDark] = useState(false);

  // const darkModeHandler = () => {
  //   setDark(!dark);
  //   document.body.classList.toggle("dark");
  // };

  return (
    <div className="flex justify-between py-3 px-6 bg-gray-50  ">
      <form action="" className="w-1/3 md:w-1/2 ">
        <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
          <svg
            className="w-5 h-5 absolute ml-3 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <input
            type="text"
            name="search"
            placeholder="Search songs"
            aria-label="Search songs"
            className="placeholder-opacity-0 sm:placeholder-opacity-100 max-w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-2 border-green-500"
          />
        </div>
      </form>

      <div className="relative  flex-shrink-0 self-center">
        <div className="rounded-full ">
          <img
            className="inline w-8 h-8 rounded-full "
            src="https://picsum.photos/150"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
}
