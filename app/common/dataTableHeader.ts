import { GridColDef } from "@mui/x-data-grid";

export const dataTableHeader: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "activity", headerName: "Activity", width: 130 },
  { field: "dateTimeSelected", headerName: "Date Time Selected", width: 130 },
  {
    field: "status",
    headerName: "Status",
    width: 90,
  },
  {
    field: "createdDate",
    headerName: "Created Date ",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];
