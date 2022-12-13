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
    headerName: "Starts at",
    width: 250,
    renderCell: (params) => {
      var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      var formattedDate = new Date(params.row.date)
      return (
        <div className="cellWithImg">
          {formattedDate.toLocaleDateString("en-US", options)}
        </div>
      );
    },
  },

  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      let statusText = ''
      let statusClass = ''
      switch (params.row.status) {
        case 0:
          statusClass = 'Inactive'
          statusText = 'Inactive'
          break;

        case 1:
          statusClass = 'Active'
          statusText = 'Active'
          break;

        case 2:
          statusClass = 'Active'
          statusText = 'Live'
          break;

        case 3:
          statusClass = 'Inactive'
          statusText = 'Ended'
          break;

        default:
          break;
      }
      return (
        <div className={`cellWithStatus ${statusClass}`}>
          {statusText}
        </div>
      );
    },
  },
];

