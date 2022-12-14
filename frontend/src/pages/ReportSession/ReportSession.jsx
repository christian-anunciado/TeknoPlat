import React, { useContext, useState } from 'react'
import { IconButton } from '@mui/material';
import "./ReportSessions.scss"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SessionContext from '../../context/SessionContext';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify'
import Api from '../../api/Api';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '16px',
  p: 4,
};
const ReportSession = ({ setReportModal, reportModal, roomEnded, setRoomEnded, roomEndedNotif }) => {
  const { user } = useContext(AuthContext)
  const { session } = useContext(SessionContext)
  const [report, setReport] = useState("")
  const [fetchedData, setFetchedData] = useState(null)

  const reportSession = async () => {
    let formField = new FormData()

    formField.append('report', report);
    formField.append('creator', user.userID);
    formField.append('sessionID', session.session[0].id);

    try {
      if ((fetchedData == null)) {
        const req = await Api.post(`api/addReport`, formField)
        setFetchedData(req.data);
        toast.warning('Reported Succesfully')
      } else {
        toast.error('You have already reported this session')
      }
    } catch {
      toast.error('Something went wrong')
    }
  }


  const handleCancel = () => {
    setReportModal(false);
    if (roomEnded && roomEndedNotif) {
      setRoomEnded(false);
    }
  }


  return (
    <Modal
      open={reportModal}
      onClose={handleCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <div className="rating-space">
            <div className="rating-container">
              <div className="items-1 item">
                <div className="items-1-1 item">Report Session</div>
                <div className="items-1-2 item rating-logo">
                  <IconButton onClick={handleCancel} >
                    <HighlightOffIcon />
                  </IconButton>
                </div>
              </div>
              <div className="items-2 items">{session.session[0].sessionName}</div>
              <span className="rating-line"></span>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                  '& > legend': {
                    mt: 2,
                  },
                }}
              >
              </Box>
              <div className="items-5 item">
                <div className="items-5-1 item item-direction">
                  <label className="details">Why would you report this session?</label>
                  <textarea type="text" name="report" placeholder="Write your report here.." onChange={(e) => setReport(e.target.value)} value={report} />
                </div>
              </div>
              <div className="button_report">
                <input type="submit" value="Submit" onClick={reportSession} />
              </div>
            </div>
          </div>
        </Typography>
      </Box>
    </Modal>
  )
}

export default ReportSession
