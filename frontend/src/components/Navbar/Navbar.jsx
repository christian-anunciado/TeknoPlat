import { useRef } from "react";
import "./Navbar.scss"
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Link } from 'react-router-dom';
const Navbar = () => {
    

  return (
    <div className='navbar'>
        <div className="left"> 
        <Link to="/" style={{textDecoration:"none"}}>
            <span>TEKNOPLAT</span>
         </Link>
        </div>
        <div className="center">
            <h3 >My Session</h3>
            <h3>Create Session</h3>
            <h3>Join Session</h3>
        </div>
        <div className="right">
        
            <NotificationsOutlinedIcon/>
            <SettingsOutlinedIcon/>
            
            <PersonOutlineOutlinedIcon/>
           
            </div>
           
    </div>
  )
}

export default Navbar
