import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import LoginNav from '../../components/Nav/LoginNav'
import "./Login.scss"
import AuthContext from '../../context/AuthContext'
import header from '../../assets/img/header.png'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Login = () => {

    let { user, loginUser } = useContext(AuthContext)

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return (
        user ? 
        <Navigate to={'/dashboard'} /> :
            <>
            <LoginNav />
            <form onSubmit={loginUser}>
            <Grid 
            container 
            spacing={0}
            direction="row"
            alignItems="flex-start"
            justifyContent="space-around">
            <Grid item xs={6}
                sx={{
                    pt: "3%",
                }}>
                <div className="login-image">
                <img src={header}></img>
                </div>
                
            </Grid>
            <Grid item xs={6}
                    sx={{
                        pl: "15%",
                        pt: "5%",
                    }}
                    >
            <Box sx={{ 
                flexGrow: 1,
                border: 5,
                p: "3%",
                width: "50%",
                    }}>
                <Grid container spacing={2}
                direction="row"
                alignItems="center"
                justifyContent="space-around">
                    <Grid item xs={12}
                    display="flex"
                    direction="row"
                    justifyContent="center">
                    <Typography variant="h4" component="h2">
                        Login
                        </Typography>;
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name='email'
                        label="Enter Email"
                        type="text"
                        fullWidth
                        variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name='password'
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}
                            display="flex"
                            direction="row"
                            justifyContent="center">
                        <button className='button button1' >
                            Login
                        </button>
                    </Grid>
                </Grid>
                </Box>
            </Grid>
        </Grid>
    </form>
            </>
    )
}
export default Login
