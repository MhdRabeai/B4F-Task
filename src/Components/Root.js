import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

export default function Root() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 w-3/4	">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
