import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns} from "./datatablesource";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useEffect} from 'react'
import Button from '@mui/material/Button';
import "../../pages/Rating/RatingSession.scss"

import axios from 'axios'
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: '16px',
  p: 4,
};

const Datatable = () => {

  const [open, setOpen] = React.useState(false);
  const [api, setApi] = useState([])
  const [search, setSearch] = useState('')  

  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState(false);
  const [joinPassword, setJoinPassword] = useState([])
  const [session, setSession] = useState([]); //QUERY DATA 
  const [filteredSession, setFilteredSession] = useState([]);
  
  useEffect(()=>{
      fetch('http://127.0.0.1:8000/api/sessions?format=json')
      .then((data)=>data.json()).then((data)=>setSession(data))
  },[])   

  useEffect(()=>{
    console.log(search);
    console.log(session.filter(item => item.searchID === search));
    setFilteredSession(() =>session.filter(item => item.searchID === search))
  },[search, session] ) 
  
  // console.log(filteredSession[0].sessionPassword != null);

  const actionColumn = [
    {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => {
      return (
      <div className="cellAction">
        <div className={`viewButton ${params.row.actions}`} onClick={() => handleOpen(params.row.actions)}>
          
          Join
        </div>
        </div>
      );
    },
  },
];

  const handleClose = () => {
    setOpen(false)
    setPassword(true)
    // setPassword(false)
  };

  const handleOpen = (searchID) => {
    setOpen(true);
    setSearch(searchID);
    // if(filteredSession[0].sessionPassword === null)
    //   setPassword(false);
    // else
    //   setPassword(true);
    
  }  
  console.log("TEST:", password);




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
            status: sessions.status,
            actions: sessions.searchID,
          }
        })}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
      {filteredSession.length > 0 ?
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {filteredSession[0].sessionName}
          </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {filteredSession[0].sessionDescription}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            value={joinPassword}
            onChange = {(e) => setJoinPassword(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Join</Button>
        </DialogActions>
      </Dialog> : null}
    </div>
  );
};

export default Datatable;
