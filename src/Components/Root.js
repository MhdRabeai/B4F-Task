import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

export default function Root() {
  return (
    <div className="flex min-h-screen justify-end bg-gray-100 dark:bg-[#777777]">
      <SideBar />
      <div className=" w-3/4	">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
