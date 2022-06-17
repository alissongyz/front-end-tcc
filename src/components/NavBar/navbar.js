import React, { useState } from "react";
import { FaBars, FaLastfmSquare } from "react-icons/fa";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";

import { SideBarData } from "../../utils/SideBarData";
import { NavbarMenu, NavMenu, NavText, ShowSidebarButton } from "./styles";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#5e5e60" }}>
        <NavbarMenu>
          <button onClick={showSidebar} className="ml-8 text-[1.5rem]">
            <FaBars color="#fff" />
          </button>
        </NavbarMenu>
        <NavMenu className={sidebar && "active"}>
          <ul className="w-full">
            <li className="nav-toggle">
              <Link to={"/"} className="ml-8 text-[2.5rem]">
                <FaLastfmSquare color="#fff" />
              </Link>
              <ShowSidebarButton onClick={showSidebar}>
                <HiOutlineChevronDoubleLeft />
              </ShowSidebarButton>
            </li>
            {SideBarData.map((item, index) => {
              return (
                <NavText key={index}>
                  <Link to={item.path}>
                    <div className="text-[1.5rem]">{item.icon}</div>
                    <span className="ml-4">{item.title}</span>
                  </Link>
                </NavText>
              );
            })}
          </ul>
        </NavMenu>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
