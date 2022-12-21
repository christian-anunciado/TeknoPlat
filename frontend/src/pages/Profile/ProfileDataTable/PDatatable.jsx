import "./ProfileDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import ReactLoading from 'react-loading';

const Datatable = ({ userSessions, selectedPitch, setSelectedPitch }) => {

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerAlign: 'center',
      align: 'center',
      editable: false,
    },
    {
      field: "sessionName",
      headerName: "Session Name",
      width: 150,
      editable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: "sessionDescription",
      headerName: "Session Description",
      width: 600,
      editable: false,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {

        if (params.row.status === 3) {
          if (params.row.id !== params.row.selectedSession)
            return (
              <button
                style={{ padding: '4px 10px', backgroundColor: 'transparent', border: '2px solid green', borderRadius: '5px', cursor: 'pointer' }}
                onClick={() => setSelectedPitch(params.row.currSession)}
              >
                View
              </button>
            )
          else
            return (
              <p style={{ fontSize: '0.8rem', color: 'blue' }}>Currently Viewing</p>
            )
        } else {
          return (

            <p style={{ fontSize: '0.8rem' }}>Session is not yet over.</p>
          )
        }


      }
    },

  ];

  return (
    <Box sx={userSessions === null
      ? { height: 400, width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' } :
      { height: 400, width: "100%" }
    }>
      {userSessions === null
        ? <>
          <ReactLoading color='#000' type='spinningBubbles' />
          <h3>Fetching your sessions...</h3>
        </>
        : <DataGrid
          sx={{ textAlign: 'center' }}
          rows={userSessions.map(sessions =>
          ({
            id: sessions.id,
            sessionName: sessions.sessionName,
            sessionDescription: sessions.sessionDescription,
            selectedSession: selectedPitch.id,
            status: sessions.status,
            currSession: sessions
          })
          )}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      }
    </Box>
  );
};

export default Datatable;
