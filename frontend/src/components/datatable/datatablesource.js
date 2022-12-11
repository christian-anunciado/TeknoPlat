export const userColumns = [
  {
    field: "room",
    headerName: "Session Name",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
         
          {params.row.room}
        </div>
      );
    },
  },
  {
    field: "details",
    headerName: "Details",
    width: "700",
    editable: true,
  
  },

  {
    field: "date",
    headerName: "Date & Time",
    width: 250,
  },

  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

 