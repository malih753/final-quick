import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import { useAuth } from "../Context/AuthContext";

const Layout = () => {
  const {user} = useAuth();
  const path = useLocation().pathname;

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="lg:flex overflow-x-hidden ">
      <Sidebar />
      <div className="flex-1 relative">
        {/* <div className="w-full h-full bg-white right-0 z-[-2] bg-opacity-10 absolute"></div> */}
        {/* <img
          src="/dashboard.png"
          alt=""
          className="absolute w-full h-full  bottom-0 left-0 -z-10
      "
        /> */}
        <Header />
        <div
          className="px-2.5 xs:px-5 pb-5 md:px-[34px] "
          style={{
            backgroundColor: path === "/" && "white",
            minHeight: path === "/" ? "100vh" : "180vh",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
