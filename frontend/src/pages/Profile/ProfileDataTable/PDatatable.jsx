import "./ProfileDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";

import Box from "@mui/material/Box";
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "sessionName",
    headerName: "Session Name",
    width: 150,
    editable: true,
  },
  {
    field: "sessionDescription",
    headerName: "Session Description",
    width: 600,
    editable: true,
  },
];
const rows = [
  {
    id: 1,
    sessionDescription: "asdadklasdklsjakdlasdjasdkljsadlsadlkdlsadkjsaskjdsa",
    sessionName: "CJ Session",
  },
  {
    id: 2,
    sessionDescription: "asdadklasdklsjakdlasdjasdkljsadlsadlkdlsadkjsaskjdsa",
    sessionName: "CJ Session",
  },
];

const Datatable = () => {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default Datatable;
