import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {  useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import {Link} from 'react-router-dom'
import StoreIcon from "@mui/icons-material/Store";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  let {user,logoutUser} = useContext(AuthContext)
  const navigate = useNavigate()
  
  return (
    <div className="sidebar">
    
    
      <div className="center">
        <ul>
         
          <li>
            <DashboardIcon className="icon" />
            <span onClick={()=>{
              navigate("/dashboard")
            }}>Dashboard</span>
          </li>
          <Link to="/add_session" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Add Session</span>
            </li>
          </Link>
          
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
        
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <Link to="/profile" style={{ textDecoration: "none" }}>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
            </Link>
          </li>
          
          <li>
            <ExitToAppIcon className="icon" />
            <Link className="link" to="/login" onClick={logoutUser}>Logout</Link>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
