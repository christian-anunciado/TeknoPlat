import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "./datatablesource";
import React, { useContext, useState } from "react";
import { useEffect } from 'react'
import Button from '@mui/material/Button';
import "../../pages/Rating/RatingSession.scss"
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AuthContext from "../../context/AuthContext";
import SessionContext from "../../context/SessionContext";
import axios from "axios";
import { useHMSActions } from "@100mslive/react-sdk";
import { useNavigate } from "react-router";


const Datatable = () => {

  // Context
  const hmsActions = useHMSActions();
  const { user } = useContext(AuthContext)
  const { dispatch } = useContext(SessionContext)
  const navigate = useNavigate()

  // UseState
  const [open, setOpen] = React.useState(false);
  const [api, setApi] = useState([])
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState(false);
  const [joinPassword, setJoinPassword] = useState([])
  const [session, setSession] = useState([]); //QUERY DATA 
  const [filteredSession, setFilteredSession] = useState([]);
  const [role, setRole] = useState(null)


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/sessions?format=json')
      .then((data) => data.json()).then((data) => setSession(data))
  }, [])

  useEffect(() => {
    const fetchFilter = () => setFilteredSession(() => session.filter(item => item.searchID === search))
    return (
      fetchFilter()
    )
  }, [search, session])

  useEffect(() => {
    const unsub = () => {
      if (filteredSession.length > 0) {
        filteredSession[0].creator === user.userID ? setRole('creator') : setRole('participant')
      }
    }

    return (
      unsub()
    )
  }, [filteredSession.length])


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
  };

  const handleOpen = (searchID) => {
    setOpen(true);
    setSearch(searchID);
  }

  const joinRoom = async () => {
    const capitalizedName =
      user.first_name.charAt(0).toUpperCase()
      + user.first_name.slice(1)
    try {
      const req = await axios.post('http://localhost:8000/api/generateAppToken', {
        "room_id": filteredSession[0].sessionID,
        "role": role,
        "user_id": capitalizedName
      })
      if (req) {
        await hmsActions.join({
          userName: capitalizedName,
          authToken: req.data
        });

        dispatch({
          type: "UPDATE_SESSION",
          payload: {
            session: filteredSession
          }
        })

        dispatch({
          type: "UPDATE_ROLE",
          payload: {
            role: role
          }
        })

        navigate(`/session/${filteredSession[0].sessionID}`)


      }
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className="datatable">

      <DataGrid
        className="datagrid"
        rows={session.map((sessions) => {
          return {
            id: sessions.id,
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
              onChange={(e) => setJoinPassword(e.target.value)}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={joinRoom}>Join</Button>
          </DialogActions>
        </Dialog> : null}
    </div>
  );
};

export default Datatable;
