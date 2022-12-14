import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {  useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import {Link} from 'react-router-dom';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
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
            <span className="span" onClick={()=>{
              navigate("/dashboard")
            }}>Dashboard</span>
          </li>
          <Link to="/add_session" style={{ textDecoration: "none" }}>
            <li>
              <MeetingRoomIcon className="icon" />
              <span className="span">Add Session</span>
            </li>
          </Link>
          <li>
            <Link to="/profile" style={{ textDecoration: "none" }}>
            <AccountCircleOutlinedIcon className="icon" />
            <span className="span">Profile</span>
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
