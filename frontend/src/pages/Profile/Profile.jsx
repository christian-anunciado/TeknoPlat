import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Profile.module.scss";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Api from "../../api/Api";

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
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import Sidebar from "../../components/sidebar/Sidebar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Datatable from "../../pages/Profile/ProfileDataTable/PDatatable";

const Profile = () => {
  const [filtersearch, filter] = useState("");

  const logout = async () => {
    await Api.post("api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
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
                          <Box
                            component="img"
                            sx={{
                              height: "100%",
                              width: "100%",
                              maxHeight: { xs: 0, md: 250 },
                              maxWidth: { xs: 0, md: 250 },
                              borderRadius: "50%",
                            }}
                            alt="Profile Picture"
                            src="data:image/jpeg;base64,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"
                          />
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
                      <Grid item xs={12}></Grid>
                      <Grid
                        item
                        xs={12}
                        container
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="stretch"
                      >
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={6}
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-end"
                          >
                            <Typography
                              gutterBottom
                              variant="h4"
                              component="div"
                            >
                              Pitch Session History
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                          >
                            <TextField
                              id="input-with-icon-textfield"
                              label="Search Pitch"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchIcon />
                                  </InputAdornment>
                                ),
                              }}
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              variant="standard"
                            />
                            <Button variant="contained">Search</Button>
                          </Grid>
                          <Grid
                            item
                            xs
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-end"
                          >
                            <Typography
                              gutterBottom
                              variant="subtitle1"
                              component="div"
                            >
                              Session Name
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                          >
                            <IconButton>
                              <StarHalfIcon />
                              <StarHalfIcon />
                              <StarHalfIcon />
                              <StarHalfIcon />
                              <StarHalfIcon />
                            </IconButton>
                          </Grid>
                          <Grid item xs={12}>
                            <Box
                              sx={{
                                mb: 2,
                                display: "flex",
                                flexDirection: "column",
                                flexWrap: "wrap",
                                width: "100%",
                                height: "100%",
                                p: 1,
                                border: 1,
                                height: 400,
                                overflow: "hidden",
                                overflowY: "scroll",
                              }}
                            >
                              <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="div"
                              >
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Aenean feugiat lectus sit amet
                                euismod tincidunt. Donec mollis at mi id
                                rhoncus. Praesent et bibendum turpis, sed
                                ultricies mi. Curabitur a mollis risus, at
                                fringilla tortor. Duis accumsan metus ut tortor
                                euismod, pharetra pretium lacus volutpat. Sed
                                malesuada orci elit, a ullamcorper odio finibus
                                at. Nullam ullamcorper lacus sapien, in
                                dignissim nisl finibus sed. Vestibulum id
                                dapibus lorem. Proin commodo massa mattis elit
                                gravida, id pulvinar justo egestas. Nunc ac nunc
                                mauris. Integer mattis lorem vitae lobortis
                                laoreet. Nunc ut orci sit amet sapien iaculis
                                tincidunt sit amet sit amet neque. Cras in
                                facilisis ante. Orci varius natoque penatibus et
                                magnis dis parturient montes, nascetur ridiculus
                                mus. Curabitur eget elit ac nisl gravida
                                suscipit vitae ac leo. Lorem ipsum dolor sit
                                amet, consectetur adipiscing elit. Aenean
                                feugiat lectus sit amet euismod tincidunt. Donec
                                mollis at mi id rhoncus. Praesent et bibendum
                                turpis, sed ultricies mi. Curabitur a mollis
                                risus, at fringilla tortor. Duis accumsan metus
                                ut tortor euismod, pharetra pretium lacus
                                volutpat. Sed malesuada orci elit, a ullamcorper
                                odio finibus at. Nullam ullamcorper lacus
                                sapien, in dignissim nisl finibus sed.
                                Vestibulum id dapibus lorem. Proin commodo massa
                                mattis elit gravida, id pulvinar justo egestas.
                                Nunc ac nunc mauris. Integer mattis lorem vitae
                                lobortis laoreet. Nunc ut orci sit amet sapien
                                iaculis tincidunt sit amet sit amet neque. Cras
                                in facilisis ante. Orci varius natoque penatibus
                                et magnis dis parturient montes, nascetur
                                ridiculus mus. Curabitur eget elit ac nisl
                                gravida suscipit vitae ac leo. Lorem ipsum dolor
                                sit amet, consectetur adipiscing elit. Aenean
                                feugiat lectus sit amet euismod tincidunt. Donec
                                mollis at mi id rhoncus. Praesent et bibendum
                                turpis, sed ultricies mi. Curabitur a mollis
                                risus, at fringilla tortor. Duis accumsan metus
                                ut tortor euismod, pharetra pretium lacus
                                volutpat. Sed malesuada orci elit, a ullamcorper
                                odio finibus at. Nullam ullamcorper lacus
                                sapien, in dignissim nisl finibus sed. Lorem
                                ipsum dolor sit amet, consectetur adipiscing
                                elit. Aenean feugiat lectus sit amet euismod
                                tincidunt. Donec mollis at mi id rhoncus.
                                Praesent et bibendum turpis, sed ultricies mi.
                                Curabitur a mollis risus, at fringilla tortor.
                                Duis accumsan metus ut tortor euismod, pharetra
                                pretium lacus volutpat. Sed malesuada orci elit,
                                a ullamcorper odio finibus at. Nullam
                                ullamcorper lacus sapien, in dignissim nisl
                                finibus sed. Vestibulum id dapibus lorem. Proin
                                commodo massa mattis elit gravida, id pulvinar
                                justo egestas. Nunc ac nunc mauris. Integer
                                mattis lorem vitae lobortis laoreet. Nunc ut
                                orci sit amet sapien iaculis tincidunt sit amet
                                sit amet neque. Cras in facilisis ante. Orci
                                varius natoque penatibus et magnis dis
                                parturient montes, nascetur ridiculus mus.
                                Curabitur eget elit ac nisl gravida suscipit
                                vitae ac leo. Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Aenean feugiat
                                lectus sit amet euismod tincidunt. Donec mollis
                                at mi id rhoncus. Praesent et bibendum turpis,
                                sed ultricies mi. Curabitur a mollis risus, at
                                fringilla tortor. Duis accumsan metus ut tortor
                                euismod, pharetra pretium lacus volutpat. Sed
                                malesuada orci elit, a ullamcorper odio finibus
                                at. Nullam ullamcorper lacus sapien, in
                                dignissim nisl finibus sed. Vestibulum id
                                dapibus lorem. Proin commodo massa mattis elit
                                gravida, id pulvinar justo egestas. Nunc ac nunc
                                mauris. Integer mattis lorem vitae lobortis
                                laoreet. Nunc ut orci sit amet sapien iaculis
                                tincidunt sit amet sit amet neque. Cras in
                                facilisis ante. Orci varius natoque penatibus et
                                magnis dis parturient montes, nascetur ridiculus
                                mus. Curabitur eget elit ac nisl gravida
                                suscipit vitae ac leo. Lorem ipsum dolor sit
                                amet, consectetur adipiscing elit. Aenean
                                feugiat lectus sit amet euismod tincidunt. Donec
                                mollis at mi id rhoncus. Praesent et bibendum
                                turpis, sed ultricies mi. Curabitur a mollis
                                risus, at fringilla tortor. Duis accumsan metus
                                ut tortor euismod, pharetra pretium lacus
                                volutpat. Sed malesuada orci elit, a ullamcorper
                                odio finibus at. Nullam ullamcorper lacus
                                sapien, in dignissim nisl finibus sed. Lorem
                                ipsum dolor sit amet, consectetur adipiscing
                                elit. Aenean feugiat lectus sit amet euismod
                                tincidunt. Donec mollis at mi id rhoncus.
                                Praesent et bibendum turpis, sed ultricies mi.
                                Curabitur a mollis risus, at fringilla tortor.
                                Duis accumsan metus ut tortor euismod, pharetra
                                pretium lacus volutpat. Sed malesuada orci elit,
                                a ullamcorper odio finibus at. Nullam
                                ullamcorper lacus sapien, in dignissim nisl
                                finibus sed. Vestibulum id dapibus lorem. Proin
                                commodo massa mattis elit gravida, id pulvinar
                                justo egestas. Nunc ac nunc mauris. Integer
                                mattis lorem vitae lobortis laoreet. Nunc ut
                                orci sit amet sapien iaculis tincidunt sit amet
                                sit amet neque. Cras in facilisis ante. Orci
                                varius natoque penatibus et magnis dis
                                parturient montes, nascetur ridiculus mus.
                                Curabitur eget elit ac nisl gravida suscipit
                                vitae ac leo. Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Aenean feugiat
                                lectus sit amet euismod tincidunt. Donec mollis
                                at mi id rhoncus. Praesent et bibendum turpis,
                                sed ultricies mi. Curabitur a mollis risus, at
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
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
                            <Datatable />
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
