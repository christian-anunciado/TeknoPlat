import React, { useState } from "react";
import { useEffect } from "react";
import { IconButton } from "@mui/material";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import Datatable from "../../pages/Rating/RatingDataTable/RatingDatatable";
import "./RatingSession.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Api from "../../api/Api";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "16px",
  p: 4,
};

const RatingDetails = ({ ratingsModalState, setRatingsModalState, selectedPitch }) => {
  const [punctuality, setPunctuality] = useState("");
  const [presentation, setPresentation] = useState("");
  const [delivery, setDelivery] = useState("");
  const [innovativeness, setInnovativeness] = useState("");
  const [feedback, setFeedback] = useState("");
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await Api.get(`api/getAverageRatings/${selectedPitch.id}`);
      const data = response.data;

      setPunctuality(data[0].AveragePunctuality);
      setPresentation(data[0].AveragePresentation);
      setDelivery(data[0].AverageDelivery);
      setInnovativeness(data[0].AverageInnovativeness);

      const ratingResponse = await Api.get(
        `api/getRatings/${selectedPitch.id}`
      );
      const ratingData = ratingResponse.data;
      setFeedback(ratingData);
    };
    fetchApi();
  }, []);

  const data = [
    { name: "Goals and Significance", value: punctuality },
    { name: "Plan and Timeline", value: presentation },
    { name: "Resource Request", value: delivery },
    { name: "Relevant Experience", value: innovativeness },
  ];

  const handleClose = () => {
    setRatingsModalState(false);

  };

  return (
    <Modal
      open={ratingsModalState}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={handleClose}
    >
      <Box sx={style}>
        <Typography id="modal-modal-description">
          <div className="rating-space">
            <div className="rating-container">
              <div className="items-1 item">
                <div className="items-1-2 item rating-logo">
                  <IconButton onClick={handleClose}>
                    <HighlightOffIcon />
                  </IconButton>
                </div>
              </div>
              <div className="items-2 items">
                {selectedPitch.sessionName} Session Results
              </div>
              <span className="rating-line"></span>
              <div className="items-3">
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab label="Score" value="1" />
                        <Tab label="Feedback" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <ResponsiveContainer width="95%" height={300}>
                        <BarChart width={1000} height={250} data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="value"
                            barSize={100}
                            fill="#8884d8"
                            name="Session Rating"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </TabPanel>
                    <TabPanel value="2">
                      <Datatable feedback={feedback} />
                    </TabPanel>
                  </TabContext>
                </Box>
              </div>
            </div>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default RatingDetails;
