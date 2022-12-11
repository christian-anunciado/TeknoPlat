import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns} from "./datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect} from 'react'


const Datatable = () => {
  const [session, setSession] = useState([]);
  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/sessions?format=json')
    .then((data)=>data.json()).then((data)=>setSession(data))
},[])   

console.log(session)
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/search_session" style={{ textDecoration: "none" }}>
              <div className="viewButton">Join</div>
            </Link>
            <div
              className="deleteButton"
             
            >
              Report
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      
      <DataGrid
        className="datagrid"
        rows = {session.map((sessions, index) => {
          return{
            id : sessions.id,
            room: sessions.sessionName,
            creator: sessions.creator,
            details: sessions.sessionDescription,
            date: sessions.startsAt,
            status: sessions.status === 1 ? "Active" : "Inactive",
          }
        })}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        
      />
    </div>
  );
};

export default Datatable;
