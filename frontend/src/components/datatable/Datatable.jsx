import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "./datatablesource";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import "../../pages/Rating/RatingSession.scss";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AuthContext from "../../context/AuthContext";
import SessionContext from "../../context/SessionContext";
import { useHMSActions } from "@100mslive/react-sdk";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Api from "../../api/Api";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const Datatable = () => {
  // Context
  const hmsActions = useHMSActions();
  const { dispatch } = useContext(SessionContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // UseState
  const [open, setOpen] = React.useState(false);
  const [api, setApi] = useState([]);
  const [search, setSearch] = useState("");
  const [searchSession, setSearchSession] = useState("");
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState(false);
  const [joinPassword, setJoinPassword] = useState([]);
  const [sessions, setSession] = useState([]); //QUERY DATA
  const [filteredSession, setFilteredSession] = useState([]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const res = await Api.get("api/sessions");
      setSession(res.data);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const fetchFilter = () =>
      setFilteredSession(() =>
        sessions.filter((item) => item.searchID === search)
      );
    return fetchFilter();
  }, [search, sessions]);

  useEffect(() => {
    const unsub = () => {
      if (filteredSession.length > 0) {
        filteredSession[0].creator === user.userID
          ? setRole("creator")
          : setRole("participant");
      }
    };

    return unsub();
  }, [filteredSession.length]);

  const actionColumn = [
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        let statusClass = "";
        switch (params.row.status) {
          case 1:
            statusClass = "Active";
            break;

          case 2:
            statusClass = "Live";
            break;

          case 3:
            statusClass = "Ended";
            break;

          default:
            break;
        }
        return (
          <div className="cellAction">
            {(statusClass === "Live" || params.row.creator === user.userID) &&
            statusClass !== "Ended" ? (
              <button
                className={`viewButton ${
                  params.row.creator === user.userID && statusClass !== "Live"
                    ? "start"
                    : "join"
                }`}
                onClick={() => handleOpen(params.row.actions)}
              >
                {params.row.creator === user.userID && statusClass !== "Live"
                  ? "Start"
                  : "Join"}
              </button>
            ) : (
              <p>Joining Disabled</p>
            )}
          </div>
        );
      },
    },
  ];

  const handleClose = () => {
    setOpen(false);
    setPassword(true);
  };

  const handleOpen = (searchID) => {
    setOpen(true);
    setSearch(searchID);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (joinPassword === filteredSession[0].sessionPassword) {
      joinRoom();
    } else {
      toast.error("Incorrect Password!");
    }
  };

  const joinRoom = async () => {
    const capitalizedName =
      user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);
    try {
      const req = await Api.post("api/generateAppToken", {
        room_id: filteredSession[0].sessionID,
        role: role,
        user_id: capitalizedName,
      });
      if (req) {
        await hmsActions.join({
          userName: capitalizedName,
          authToken: req.data,
          settings: {
            isAudioMuted: true,
            isVideoMuted: true,
          },
        });

        const formField = new FormData();
        formField.append("status", 2);
        await Api.put(`api/updateSession/${filteredSession[0].id}`, formField);

        const responseUser = await Api.get("api/users");

        const dataUser = await responseUser.data.filter(
          (user) => parseInt(user.id) === parseInt(filteredSession[0].creator)
        );

        dispatch({
          type: "UPDATE_ROLE",
          payload: {
            role: role,
          },
        });

        dispatch({
          type: "UPDATE_SESSION",
          payload: {
            session: filteredSession,
            hostName:
              dataUser[0].first_name.charAt(0).toUpperCase() +
              dataUser[0].first_name.slice(1),
            isConnected: true,
            isRatingOpen: filteredSession[0].ratingOpen === 1 ? true : false,
          },
        });

        navigate(`/session/${filteredSession[0].searchID}`);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="datatable">
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <div className="item-session-description">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              value={searchSession}
              onChange={(e) => setSearchSession(e.target.value)}
              fullWidth
              variant="standard"
            />
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className="item-session-description">
            <Button
              size="medium"
              sx={{
                width: 200,
              }}
              variant="contained"
              onClick={() => {
                handleOpen(searchSession);
              }}
            >
              Search
            </Button>
          </div>
        </Grid>
      </Grid>

      <DataGrid
        className="datagrid"
        rows={sessions.map((sessions) => {
          return {
            id: sessions.id,
            room: sessions.sessionName,
            creator: sessions.creator,
            details: sessions.sessionDescription,
            date: sessions.startsAt,
            status: sessions.status,
            actions: sessions.searchID,
            user: user.userID,
          };
        })}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
      {filteredSession.length > 0 ? (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{filteredSession[0].sessionName}</DialogTitle>
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
            <Button onClick={handlePasswordSubmit}>Join</Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </div>
  );
};

export default Datatable;
