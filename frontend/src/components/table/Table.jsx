import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect , useState, axios} from 'react'


import { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
const List = () => {
  
  const [session,setSession] = useState([]);
 

  useEffect(()=>{
      const fetchSession = async () => {
          const response = await axios.get('http://localhost:8000/api/joinsession')
          setSession(response.data)
      }
      fetchSession()
  },[])    
  
  return (


    <TableContainer component={Paper} className="table">
      <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Session Name</TableCell>
            <TableCell className="tableCell">Creator</TableCell>
            <TableCell className="tableCell">Session Details</TableCell>
            <TableCell className="tableCell">Date & Time</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell">Action</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {session.map((sessions, index) => {
                       
                       return (
                        <TableRow key={sessions.sessionName}>
                        <TableCell className="tableCell">{sessions.sessionName}</TableCell>
                        <TableCell className="tableCell">{sessions.creator}</TableCell>
                        <TableCell className="tableCell">{sessions.sessionDescription}</TableCell>
                        <TableCell className="tableCell">{sessions.sessionDate}</TableCell>
                        <TableCell className="tableCell">{sessions.sessionStatus}</TableCell>

                      </TableRow>
                       );
                     
                    
                   })}
        </TableBody>
      </Table>
    </TableContainer>

    );
};

export default List;
