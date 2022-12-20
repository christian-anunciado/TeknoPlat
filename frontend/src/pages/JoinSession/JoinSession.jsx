import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./JoinSessionModal.scss";
import AuthContext from "../../context/AuthContext";
import { useHMSActions } from "@100mslive/react-sdk";
import SessionContext from "../../context/SessionContext";
import Api from "../../api/Api";

import Button from "@mui/material/Button";
import "../../pages/Rating/RatingSession.scss";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

function JoinSession() {
  // Context
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(SessionContext);

  // Local Variables
  const [role, setRole] = useState("");
  const [api, setApi] = useState([]);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [password, setPassword] = useState("");
  const hmsActions = useHMSActions();
  const { id } = useParams();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  // Hooks

  useEffect(() => {
    const fetchApi = async () => {
      const response = await Api.get(`api/joinsession/${id}`);
      const data = await response.data;
      setApi(data);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const unsub = () => {
      if (api.length > 0) {
        api[0].creator === user.userID
          ? setRole("creator")
          : setRole("participant");
      }
    };

    return unsub();
  }, [api.length]);

  const handleJoinButton = (e) => {
    e.preventDefault();

    setPasswordStatus(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPassword(true);
    onClickHandler();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onClickHandler = () => navigate(`/dashboard/`);

  const joinRoom = async () => {
    const capitalizedName =
      user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);
    try {
      const req = await Api.post("api/generateAppToken", {
        room_id: api[0].sessionID,
        role: role,
        user_id: capitalizedName,
      });
      if (req) {
        await hmsActions.join({
          userName: capitalizedName,
          authToken: req.data,
        });

        dispatch({
          type: "UPDATE_SESSION",
          payload: {
            session: api,
          },
        });

        dispatch({
          type: "UPDATE_ROLE",
          payload: {
            role: role,
          },
        });
      }
    } catch (err) {
      alert(err);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === api[0].sessionPassword) {
      joinRoom();
    } else {
      alert("Incorrect Password!");
    }
  };

  return (
    <div>
      {api.map((apis) => {
        return (
          <div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>{apis.sessionName}</DialogTitle>
              <DialogContent>
                <DialogContentText>{apis.sessionDescription}</DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePasswordSubmit}>Join</Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      })}
    </div>
  );
}

export default JoinSession;
