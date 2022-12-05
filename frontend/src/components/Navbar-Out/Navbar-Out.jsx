import { useRef } from "react";
import "./Navbar-Out.scss"
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="left"> 
        <Link to="/" style={{textDecoration:"none"}}>
            <span>TEKNOPLAT</span>
         </Link>
        </div>
    </div>
  )
}
export default Navbar
