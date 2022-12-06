import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {  useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import {Link} from 'react-router-dom'
const Sidebar = () => {
  let {user,logoutUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const { dispatch } = useContext(DarkModeContext);
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
