import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import "./Session.scss"
import "./JoinSessionModal.scss"
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Rating } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { CopyToClipBoard} from "react-copy-to-clipboard"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '16px',
    p: 4,
  };

function Session() {
    const [api, setApi] = useState([])
    const [search, setSearch] = useState([])
    const [password, setPassword] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [modal, setModal] = useState(false);

    const [sessionName, setSessionName] = useState("")
    const [description, setDescription] = useState("")
    const [startsAt, setStartsAt] = useState("")
    const [creator, setCreator] = useState(0)
    const [searchID, setSearchID] = useState("")
    const [list, setList] = useState("")

    


    //Temp
    const [passwordStatus, setPasswordStatus] = useState(false)
    const navigate = useNavigate()
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    useEffect(() => {
        fetchApi()
    }, [])


    const fetchApi = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/joinsession/1')
        const data = await response.data
        setApi(data)

        setSessionName(data[0].sessionName)
        setDescription(data[0].sessionDescription)
        setStartsAt(data[0].startsAt)
        setSearchID(data[0].searchID)


        const responseUser = await axios.get('http://127.0.0.1:8000/api/users')
        const dataUser = await responseUser.data
        setApi(dataUser)
        
        for(let i = 0; i < dataUser.length; i++){
            if(dataUser[i].id == data[0].creator){
            setCreator(dataUser[i].first_name)
            break
            }
        }
        console.log(data);
        console.log(dataUser);
    }

    const joinSession = async () => {
        await fetch('http://localhost:8000/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                password
            })
        });
    }


    //Temp
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const handleJoin = (e) => {
        e.preventDefault()

        setPasswordStatus(true)
        toggleModal()

    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        if (password === api[0].sessionPassword) {
            navigate(`/session`)
        } else {
            alert("Incorrect Password!")
        }

    }

    const handleOpen = () => {
        setOpen(true);
        setList(`http://localhost:3000/#/session/${searchID}`)
    }

    return (
        <>
        <Navbar />
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-description">
            <div className="rating-space">
            <div className="rating-container">
              <div className = "items-1 item">
                <div className = "items-1-2 item rating-logo">
                  <IconButton onClick = {handleClose} >
                  <HighlightOffIcon/>
                  </IconButton>
                </div>
              </div>
              <div className = "items-2 items">{sessionName} Session Details</div>
              <span className = "rating-line"></span>
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className="item-session">Description</div>
                </Grid>
                <Grid item xs={12}>
                    <div className="item-session-description">
                        <p> {description}</p>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="item-session">Date</div>
                </Grid>
                <Grid item xs={4}>
                    <div className="item-session">Visiblity</div>
                </Grid>
                <Grid item xs={4}>
                    <div className="item-session">Author</div>
                </Grid>
                <Grid item xs={4}>
                    <div className="item-session-description">
                        <p> {startsAt}</p>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="item-session-description">
                        <p>Private</p>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="item-session-description">
                        <p>{creator}</p>
                    </div>
                </Grid>          
                <Grid item xs={12}>
                    <div className="item-session">Link</div>
                </Grid>
                <Grid item xs={8}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="link"
                    type="text"
                    // defaultValue={`http://localhost:3000/#/session/${searchID}`}
                    defaultValue={list}
                    value={list}
                    // value={joinPassword}
                    onChange = {(e) => setList(e.target.value)}
                    fullWidth
                    inputProps={{ readOnly: true }}
                    variant="standard"
                />
                </Grid>
                <Grid item xs={4}>
                    <Button
                        size = "medium"
                        sx = {{
                            width: 300
                        }}
                        color = "success"
                        variant="contained"
                        onClick={() => {
                            navigator.clipboard.writeText(list)
                            alert('Copied Link');
                        }}
                        >
                        Copy
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <div className="item-session">Code</div>
                </Grid>
                <Grid item xs={6}>
                    <div className="item-session">
                        <Button
                        size = "medium"
                        sx = {{
                            width: 200
                        }}
                        variant="contained"
                        onClick={() => {
                            navigator.clipboard.writeText(searchID)
                            alert('Copied session search ID');
                        }}
                        >
                        Copy
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className="item-session-close">
                        <Button
                        size = "medium"
                        sx = {{
                            width: 200
                        }}
                        variant="outlined"
                        onClick={
                            handleClose
                        }
                        >
                        Close
                        </Button>
                    </div>
                </Grid>
            </Grid>
            </Box>
                </div>
            </div>
            </Typography>
            </Box>
        </Modal>
        {/* <div>

            <div className='session-space'>
                <div className="session-container">
                    <div className='session-1 session button'>
                        <input type="text"
                            placeholder="Search Session ID"
                            name="search" value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Link to={`/session/${search}`} ><button>Search</button></Link>
                    </div>
                    <div className='session-2 session'>
                        <div className='session-2-1'>Picture</div>
                        {api.map((apis) => {
                            return <div className='session-2-2'>
                                <div className='session-2-2-1'>
                                    <div className="session-2-2-1" key={apis.id}>{apis.sessionName}</div>
                                </div>
                                <div className='session-2-2-2'>
                                    <div className="session-2-2-2" key={apis.id}>{apis.sessionDescription}</div>
                                </div>
                                <div className='session-2-2-3'>
                                    <div className='session-2-2-3-1 button-shaded'>
                                         <Link to={`/insession/${apis.id}`} ><button onClick={joinSession}>Join</button></Link> 
                                        <button onClick={handleJoin}>Join</button>

                                        {modal && (
                                            <div className="modal">
                                                <div className="overlay">
                                                    <div className="modal-content">
                                                        <div className="verifypassword">
                                                            <div className="verifypassword-1">
                                                                <button onClick={toggleModal}>Close</button>
                                                            </div>
                                                            <div className="verifypassword-2">
                                                                {passwordStatus &&
                                                                    <>
                                                                        <div className="verifypassword-2-1">
                                                                            <input type="password" name="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                                                                        </div>
                                                                        <div className="verifypassword-2-2">
                                                                            <button onClick={handlePasswordSubmit}>Join</button>
                                                                        </div>
                                                                    </>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className='session-2-2-3-2 button-noshade'>
                                        <Link to={`/insession/${apis.id}`} ><button disabled>Leave</button></Link>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div> */}
        </>
    )
}

export default Session
