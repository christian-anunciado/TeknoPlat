import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.scss";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EmailIcon from "@mui/icons-material/Email";
import FaceIcon from "@mui/icons-material/Face";
import SchoolIcon from "@mui/icons-material/School";
import KeyIcon from "@mui/icons-material/Key";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Sidebar from "../../components/sidebar/Sidebar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Datatable from "../../pages/Profile/ProfileDataTable/PDatatable";
import AuthContext from "../../context/AuthContext";
import Api from "../../api/Api";
import { toast } from "react-toastify";
import { Avatar } from "@mui/material";
import PitchHistory from "./PitchHistory";

const Profile = () => {
  const { user } = useContext(AuthContext)
  const [search, setSearch] = useState('');
  const [filteredSession, setFilteredSession] = useState([])
  const [selectedPitch, setSelectedPitch] = useState(null)
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [institute, setInstitute] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userSessions, setUserSessions] = useState(null)

  useEffect(() => {
    const getUserSession = async () => {
      try {
        const res = await Api.get(`api/sessionByCreator/${user.userID}`)
        const sortedRes = res.data.sort((a, b) => {
          let c = new Date(a.endsAt)
          let d = new Date(b.endsAt)

          return d - c
        })
        setUserSessions(sortedRes)
        setSelectedPitch(sortedRes[0])
      } catch (error) {

      }
    }

    getUserSession()

  }, [])


  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await Api.get(`api/user/${user.userID}`)
        const currUser = res.data
        setFirstName(currUser[0].first_name)
        setLastName(currUser[0].last_name)
        setEmail(currUser[0].email)
        setUsername(currUser[0].username)
        setInstitute(currUser[0].institute)
      } catch (err) {
        toast.error(err)
      }
    }

    getUser()

  }, [])


  useEffect(() => {
    if (userSessions !== null) {
      const results = userSessions.filter(session => {
        if (search === "") return userSessions
        return session.sessionName.toLowerCase().includes(search.toLowerCase())
      })
      setFilteredSession(results)
    }
  }, [search, userSessions])


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  const styles = {
    heroContainer: {
      height: 800,
      backgroundImage: `url(${"../static/DSC_1037.jpg"})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: `calc(100vw + 48px)`,
      margin: -24,
      padding: 24,
    },
  };
  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="upper-background">
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={12}></Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={3}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexWrap: "wrap",
                    "& > :not(style)": {
                      m: 1,
                      p: 2,
                      width: "85%",
                      height: "100%",
                    },
                  }}
                >
                  <Paper elevation={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid
                          item
                          xs={12}
                          container
                          justifyContent="center"
                          alignItems="center"
                        ></Grid>
                        <Grid
                          item
                          xs={12}
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          {firstName.length !== 0 && <Avatar
                            sx={{
                              height: "200px",
                              width: "200px",
                              maxHeight: { xs: 0, md: 250 },
                              maxWidth: { xs: 0, md: 250 },
                              borderRadius: "50%",
                              fontSize: "3.225rem",
                              backgroundColor: "#F2B300",
                            }}
                            alt="Profile Picture"
                          >
                            {firstName[0].toUpperCase() + lastName[0].toUpperCase()}
                          </Avatar>}


                        </Grid>
                        <Grid
                          item
                          xs={12}
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Button
                            variant="contained"
                            startIcon={<AccountBoxIcon />}
                          >
                            Change Profile
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid
                            spacing={2}
                            container
                            direction="row"
                            justifyContent="stretch"
                            alignItems="center"
                          >
                            <Grid item xs={12}>
                              <TextField
                                sx={{ textTransform: 'capitalize' }}
                                margin="dense"
                                id="firstName"
                                label="First Name"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <AccountCircle />
                                    </InputAdornment>
                                  ),
                                }}
                                type="text"
                                placeholder="Enter First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                fullWidth
                                variant="standard"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                margin="dense"
                                id="input-with-icon-textfield"
                                label="Last Name"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <AccountCircle />
                                    </InputAdornment>
                                  ),
                                }}
                                type="text"
                                placeholder="Enter Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                fullWidth
                                variant="standard"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                margin="dense"
                                id="input-with-icon-textfield"
                                label="Email Address"
                                placeholder="Enter Email Address"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <EmailIcon />
                                    </InputAdornment>
                                  ),
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                variant="standard"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                margin="dense"
                                id="input-with-icon-textfield"
                                label="Username"
                                placeholder="Enter Username"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <FaceIcon />
                                    </InputAdornment>
                                  ),
                                }}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                                variant="standard"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                margin="dense"
                                id="input-with-icon-textfield"
                                label="Institute"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <SchoolIcon />
                                    </InputAdornment>
                                  ),
                                }}
                                placeholder="Enter Institute"
                                value={institute}
                                onChange={(e) => setInstitute(e.target.value)}
                                fullWidth
                                variant="standard"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl
                                sx={{ width: "100%" }}
                                variant="standard"
                              >
                                <InputLabel htmlFor="standard-adornment-password">
                                  Password
                                </InputLabel>
                                <Input
                                  id="standard-adornment-password"
                                  placeholder="Enter Password"
                                  type={showPassword ? "text" : "password"}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                      >
                                        {showPassword ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <KeyIcon />
                                    </InputAdornment>
                                  }
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl
                                sx={{ width: "100%" }}
                                variant="standard"
                              >
                                <InputLabel htmlFor="standard-adornment-password">
                                  Confirm Password
                                </InputLabel>
                                <Input
                                  id="standard-adornment-password"
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  placeholder="Enter Confirm Password"
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={
                                          handleMouseDownConfirmPassword
                                        }
                                      >
                                        {showConfirmPassword ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <KeyIcon />
                                    </InputAdornment>
                                  }
                                  value={confirmPassword}
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          container
                          justifyContent="space-evenly"
                          alignItems="center"
                        >
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="contained"
                            endIcon={<ModeEditIcon />}
                          >
                            Edit
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              </Grid>
              <Grid item xs={9}>

                <PitchHistory selectedPitch={selectedPitch} setSearch={setSearch} search={search} />

                <Grid item xs={12}>
                  <Box
                    sx={{
                      mb: 2,
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                      "& > :not(style)": {
                        m: 1,
                        p: 2,
                        width: "95%",
                        height: "100%",
                      },
                      maxHeight: { xs: 0, md: 890 },
                      // height: 890,
                      // overflow: "hidden",
                      // overflowY: "scroll",
                    }}
                    InputLabelProps={{ shrink: true }}
                  >
                    <Paper elevation={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Item>
                            <Datatable userSessions={filteredSession} selectedPitch={selectedPitch} setSelectedPitch={setSelectedPitch} />
                          </Item>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
