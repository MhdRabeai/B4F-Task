import React from "react";
import { NavLink } from "react-router-dom";
import { FaChartSimple } from "react-icons/fa6";
import { FaHeadphones } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { FaFireAlt } from "react-icons/fa";

const SideBar = () => {
  return (
    <div className="  w-1/4 bg-gray-50  shadow-lg fixed left-0 h-full">
      <div className=" py-3 px-2 md:px-6 text-center border-b-2 border-green-500">
        <NavLink to="/" className="text-3xl md:text-4xl	">
          B4F
          <span className="text-green-600  text-7xl leading-3">.</span>
        </NavLink>
      </div>

      <div className="mt-10">
        <h3 className="text-center md:text-left  mx-3 md:mx-6 mb-2  text-gray-400 uppercase tracking-widest md:text-xl text-lg font-bold">
          Main
        </h3>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "active  flex justify-center md:justify-start items-center px-6 py-2.5 text-green-600 border-r-2	 border-green-600 text-md font-semibold	gap-3"
              : " flex justify-center md:justify-start items-center px-6 py-2.5 text-gray-500 hover:text-green-600 text-md font-semibold gap-3"
          }
        >
          <FaFireAlt />
          <p className="md:block hidden">Trindy</p>
        </NavLink>
        <NavLink
          to="/tracks"
          className={({ isActive }) =>
            isActive
              ? "active  flex justify-center md:justify-start items-center px-6 py-2.5 text-green-600 border-r-2	 border-green-600 text-md font-semibold	gap-3"
              : " flex justify-center md:justify-start items-center px-6 py-2.5 text-gray-500 hover:text-green-600 text-md font-semibold gap-3"
          }
        >
          <FaHeadphones />
          <p className="md:block hidden">Tracks</p>
        </NavLink>
        <NavLink
          to="/playlist"
          className={({ isActive }) =>
            isActive
              ? "active  flex justify-center md:justify-start items-center px-6 py-2.5 text-green-600 border-r-2	 border-green-600 text-md font-semibold	gap-3"
              : " flex justify-center md:justify-start items-center px-6 py-2.5 text-gray-500 hover:text-green-600 text-md font-semibold gap-3"
          }
        >
          <FaListUl />
          <p className="md:block hidden">Playlist</p>
        </NavLink>
        <NavLink
          to="/artists"
          className={({ isActive }) =>
            isActive
              ? "active  flex justify-center md:justify-start items-center px-6 py-2.5 text-green-600 border-r-2	 border-green-600 text-md font-semibold	gap-3"
              : " flex justify-center md:justify-start items-center px-6 py-2.5 text-gray-500 hover:text-green-600 text-md font-semibold gap-3"
          }
        >
          <FaUserGroup />
          <p className="md:block hidden">Artists</p>
        </NavLink>
        <NavLink
          to="/boadcast"
          className={({ isActive }) =>
            isActive
              ? "active  flex justify-center md:justify-start items-center px-6 py-2.5 text-green-600 border-r-2	 border-green-600 text-md font-semibold	gap-3"
              : " flex justify-center md:justify-start items-center px-6 py-2.5 text-gray-500 hover:text-green-600 text-md font-semibold gap-3"
          }
        >
          <FaChartSimple />
          <p className="md:block hidden">Boadcast</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
