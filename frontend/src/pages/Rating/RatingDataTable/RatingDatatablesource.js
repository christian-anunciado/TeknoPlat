export const userColumns = [
    {
      field: "room",
      headerName: "Name",
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
      field: "feedback",
      headerName: "Feedback",
      width: 700,
      editable: true,
    },
  ];    
   