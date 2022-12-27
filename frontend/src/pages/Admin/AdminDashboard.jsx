import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import AdminDatatable from "../../components/admindatable/AdminDatatable";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const AdminDashboard = () => {
  const [sessionExport, setSessionExport] = React.useState("");

  const handleChange = (event) => {
    setSessionExport(event.target.value);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <AdminDatatable />
        </div>
      </div>
    </>
  );
};
export default AdminDashboard;
