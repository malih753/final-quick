import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sideLinks } from "../Constants/sideLinks";
import { useNav } from "../Context/NavContext";
import { CloseIcon } from "../assets/icons";

const Sidebar = () => {
  const [active, setActive] = useState("/");

  const path = useLocation().pathname;

  const { isNavOpen, handleNav } = useNav();
  const handleClick = (name) => {
    setActive(name);
  };

  return (
    <div>
      <div
        className={`w-[300px] lg:w-[257px] pb-10 h-screen md:h-auto bg-white shadow-side-nav fixed overflow-y-auto duration-300 lg:static left-0 top-0 z-50  ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex justify-center mt-[48px]">
          <img src="/logo.png" alt="logo" className="h-[56px]" />
        </div>

        <h2 className="pl-[29px] text-xl text-[#999999]">Menu</h2>
        <ul className="mt-[28px]">
          {sideLinks.map((link) => (
            <li key={link.name}>
              <Link
                onClick={() => handleClick(link.path)}
                to={link.path}
                className={`flex items-center pl-[49px] gap-[14px] text-xl py-4 ${
                  path === link.path || active === link.path
                    ? "font-semibold text-[#15A8A0] bg-[#EBF4F9] "
                    : "text-[#999999]"
                }`}
              >
                {/* Render the Icon component here */}
                <link.Icon
                  color={
                    path === link.path || active === link.path
                      ? "#15A8A0"
                      : "#999999"
                  }
                />
                <h4>{link.name}</h4>
              </Link>
            </li>
          ))}
        </ul>
        <div
          className="absolute top-4 right-5 md:hidden block"
          onClick={handleNav}
        >
          <CloseIcon />
        </div>
      </div>
      {isNavOpen && (
        <div
          className={`w-full h-screen bg-[#00000067] top-0 fixed z-20`}
          onClick={handleNav}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
