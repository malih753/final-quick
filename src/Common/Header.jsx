import React, { useState } from "react";
import { BellIcon, CloseIcon, MenuIcon, SearchIcon } from "../assets/icons";
import { Link, useLocation } from "react-router-dom";
import { useNav } from "../Context/NavContext";
import Breadcrumb from "./Breadcrumb";

const Header = () => {
  const path = useLocation().pathname;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { handleNav } = useNav();

  const handleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  return (
    <>
      <div
        className={`flex items-center gap-5 w-full justify-between px-2.5 xs:px-5 md:px-[34px] sm:pt-[44px] py-5 sm:pb-[25px] ${
          path === "/" && "bg-white"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="lg:hidden block " onClick={handleNav}>
            <MenuIcon />
          </div>
         <Breadcrumb/>
        </div>

        <div className="flex items-center gap-5 md:gap-8">
          <div className=" md:relative lg:block hidden">
            <span className="absolute top-1/2 -translate-y-1/2 left-2">
              <SearchIcon />
            </span>
            <input
              type="text"
              className="outline-none border-none py-4 md:py-[22px] bg-header-search-gradient text-black placeholder:text-[#AFB3B3] lg:w-[485px] rounded-[13px] pl-12"
              placeholder="Search"
            />
          </div>

          {isSearchOpen && (
            <div
              className="bg-white w-full p-5 h-[150px] flex justify-center absolute left-0 z-40 duration-300 lg:hidden"
              style={{ top: isSearchOpen ? "0" : "-45%" }}
            >
              <div
                className="absolute  top-5 translate-y-1/2 right-5"
                onClick={handleSearch}
              >
                <CloseIcon />
              </div>
              <div className="relative h-fit w-[250px] xs:w-[300px] md:w-[400px]">
                <span className="absolute top-1/2 -translate-y-1/2 left-2">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  className="outline-none border-none py-4 md:py-[22px] bg-header-search-gradient text-black placeholder:text-[#AFB3B3] md:w-[485px] w-full rounded-[13px] pl-12"
                  placeholder="Search"
                />
              </div>
            </div>
          )}

          <div onClick={handleSearch} className="lg:hidden block w-5">
            <SearchIcon classNames={"w-6 sm:w-auto"} />
          </div>

          
            <BellIcon
              color={"#15A9A0"}
              classNames={"w-6 sm:w-[31px] sm:h-[40px]"}
            />
         
          <img
            src="/avatar.jpg"
            alt="avatar"
            className="sm:w-[58px] sm:h-[58px] w-[40px] h-[40px] rounded-full object-cover"
          />
        </div>
      </div>
      {isSearchOpen && (
        <div
          className="w-full h-screen bg-[#00000067] fixed z-10"
          onClick={handleSearch}
        ></div>
      )}
    </>
  );
};

export default Header;
