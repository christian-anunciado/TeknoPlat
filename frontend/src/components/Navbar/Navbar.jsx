
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// Components
import Backdrop from "../Elements/Backdrop";

// Assets
import LogoIcon from "../../assets/svg/Logo";
import BurgerIcon from "../../assets/svg/BurgerIcon";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SideNav from "./SideNav";

const Navbar = () => {
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
        <UlWrapper className="flexNullCenter">
          <li className="semiBold font15 pointer">
            <Link activeClass="active" style={{ padding: "10px 15px" }} to="/dashboard" spy={true} smooth={true} offset={-80}>
          Dashboard
            </Link>
          </li>
          <li className="semiBold font15 pointer">
            <Link activeClass="active" style={{ padding: "10px 15px" }} to="/add_session" spy={true} smooth={true} offset={-80}>
            Create Session
            </Link>
          </li>
          <li className="semiBold font15 pointer">
            <Link activeClass="active" style={{ padding: "10px 15px" }} to="/search_session" spy={true} smooth={true} offset={-80}>
             My Session
            </Link>
          </li>
          
        </UlWrapper>
        <UlWrapperRight className="flexNullCenter">
        <NotificationsOutlinedIcon />
        <SettingsOutlinedIcon />
         <Link to="/profile"><PersonOutlineOutlinedIcon/></Link>  
        </UlWrapperRight>
      </NavInner>
    </Wrapper>
  </>
  )
}

export default Navbar
const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
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
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
display: flex;
align-items: center;
cursor: pointer;
transition-duration: 0.3s;
transition-property: transform;
gap: 30px;
margin-right: 5rem;  


@media (max-width: 760px) {
  display: none;
  
  }
`;


