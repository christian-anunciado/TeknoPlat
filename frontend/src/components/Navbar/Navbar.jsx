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
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>TEKNOPLAT</span>
        </Link>
      </div>
      <div className="center">
        <Link className="center" to="/session">My Session</Link>
        <Link className="center" to="/add_session">Create Session</Link>
        <Link className="center" to="/search_session">Join Session</Link>
      </div>
      <div className="right">
        <NotificationsOutlinedIcon />
        <SettingsOutlinedIcon />
        <PersonOutlineOutlinedIcon />
      </div>
    </div>
  )
}
export default Navbar
