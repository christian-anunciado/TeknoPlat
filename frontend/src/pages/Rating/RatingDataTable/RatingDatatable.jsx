import "./RatingDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "./RatingDatatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from 'react'


const Datatable = () => {
  const [session, setSession] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/getRatings?format=json')
      .then((data) => data.json()).then((data) => setSession(data))
  }, [])


  return (
    <div className="datatable">

      <DataGrid
        className="datagrid"
        rows={session.map((sessions, index) => {
          return {
            id: sessions.id,
            feedback: sessions.feedback,
          }
        })}
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Datatable;
