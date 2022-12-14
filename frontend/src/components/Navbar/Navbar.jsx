
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// Components
import Backdrop from "../Elements/Backdrop";

// Assets
import LogoIcon from "../../assets/svg/Logo";
import BurgerIcon from "../../assets/svg/BurgerIcon";
import SideNav from "./SideNav";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import './Navbar.scss'

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);
  return (
    <>
    <SideNav sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
    {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
           
    <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
      <NavInner className="container flexSpaceCenter">
        <Link className="pointer flexNullCenter" to="/dashboard" smooth={true}>
          <LogoIcon />
          <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
            Teknoplat
          </h1>
        </Link>
        <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
          <BurgerIcon />
        </BurderWrapper>
      <div className="navbar">
      <div className="wrapper">
   
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
            />
          </div>
         
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <Link to="/profile"className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </Link>
        </div>
    
  
      </div>
    </div>
    </NavInner>
    </Wrapper>
   
  </>
  )
}

export default Navbar
const Wrapper = styled.nav`
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;


