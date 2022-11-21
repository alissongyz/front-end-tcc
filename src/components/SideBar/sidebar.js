import React, { useState } from "react";
import { FaBars, FaLastfmSquare } from "react-icons/fa";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";

import { SideBarData } from "../../utils/SideBarData";
import "../../styles/global.css"
import { NavbarMenu, NavMenu, NavText, ShowSidebarButton } from "./styles";
import {acessoValido} from "../../utils/typeValidation";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
 
  const showSidebar = () => setSidebar(!sidebar);

  const role = localStorage.getItem("x-access-type");
  
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <NavbarMenu>
          <button onClick={showSidebar} className="ml-8 text-[1.5rem]">
            <FaBars color="#2D8AE0" />
          </button>
        </NavbarMenu>
        <NavMenu className={sidebar && "active"}>
          <ul className="w-full">
            <li className="nav-toggle">
              <ShowSidebarButton onClick={showSidebar}>
                <HiOutlineChevronDoubleLeft />
              </ShowSidebarButton>
            </li>
            {SideBarData.map((item, index) => {
              return (
                acessoValido(item.access, role) ? 
                <Link className="button-edited" to={item.path} onClick={item.title === 'Sair' ? () => {localStorage.removeItem("x-access-token"); localStorage.removeItem("x-access-type")} : ''}>
                  <NavText key={index}>
                      <div className="text-[1.5rem]" onClick={showSidebar}>{item.icon}</div>
                      <span className="ml-4" onClick={showSidebar}>{item.title}</span>
                  </NavText>
                </Link> : ""
              );
            })}
          </ul>
        </NavMenu>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
