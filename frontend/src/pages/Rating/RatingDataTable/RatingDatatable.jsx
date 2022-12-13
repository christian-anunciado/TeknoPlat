import "./RatingDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "./RatingDatatablesource";


const Datatable = ({ feedback }) => {
  return (
    <div className="datatable">

      <DataGrid
        className="datagrid"
        rows={feedback.map((sessions, index) => {
          return {
            id: sessions.id,
            feedback: sessions.feedback,
          }
        })}
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Datatable;
