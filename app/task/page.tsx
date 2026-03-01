"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import TaskApi from "../api/task/TaskApi";
import { PaginateResponse } from "../model/entity/PaginateResponse";
import { ITaskDto } from "../model/inteface/task/ITaskDto";
import axiosInstance from "../api/axios";
import { dataTableHeader } from "../common/dataTableHeader";
import ErrorModal from "../component/ErrorModal";
import { Button } from "@mui/material";
import { isNullOrUndefined } from "../utils/objectUtil";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

export default function Task() {
  const [tasks, setTasks] = React.useState<PaginateResponse<ITaskDto>>(
    new PaginateResponse<ITaskDto>(),
  );

  const [rowItem, setRowItem] = React.useState<TaskRow[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [rowCount, setRowCount] = React.useState(0);
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 10 });
  const [error, setError] = React.useState<Error | null>(null);

  const taskApi = React.useMemo(() => new TaskApi(axiosInstance), []);

  let dataTableItem = dataTableHeader;
  dataTableItem = [
    ...dataTableItem,
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const statusRow = params.row.status;
        if (statusRow === "Pending") {
          return (
            <Button
              variant="contained"
              color="error"
              sx={{ width: "80%" }}
              size="small"
              // onClick={() => handleCancel(params.row.id)}
            >
              Cancel
            </Button>
          );
        } else if (!isNullOrUndefined(params.row)) {
          return (
            <Button
              variant="contained"
              sx={{ width: "80%" }}
              color="primary"
              size="small"
              onClick={() => handleDuplicate(params.row.activity)}
            >
              Duplicate
            </Button>
          );
        }
        return null;
      },
    },
  ];

  const router = useRouter();

  function handleDuplicate(activity: string) {
    router.push(`task/create?activity=${encodeURIComponent(activity)}`);
  }
  type TaskRow = ITaskDto & { id: string };

  async function fecthData(pageIndex: number, pageSize: number) {
    try {
      setLoading(true);
      const res = await taskApi.getAllTask({
        page: pageIndex + 1,
        size: pageSize,
      });

      const page = new PaginateResponse<ITaskDto>(res.data);

      setRowItem((prev) => {
        return page.content.map((item: ITaskDto, index) => ({
          id: item.id ?? `${pageIndex}-${index}`,
          activity: item.activity,
          dateTimeSelected: item.dateTimeSelected,
          createdDate: item.createdDate,
          status: item.status,
        }));
      });
      setRowCount(page.totalElements);
      setTasks(page);
      setError(null);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }

  function onCancelTask() {}

  React.useEffect(() => {
    fecthData(paginationModel.page, paginationModel.pageSize);
  }, []);

  React.useEffect(() => {
    fecthData(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel.page, paginationModel.pageSize]);

  return (
    <React.Fragment>
        {error && (
          <ErrorModal
            error={error}
            onRetry={() =>
              fecthData(paginationModel.page, paginationModel.pageSize)
            }
            onClose={() => setError(null)}
          ></ErrorModal>
        )}
      <div className="relative">
        <div>
          <Paper sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={rowItem}
              columns={dataTableItem}
              loading={loading}
              initialState={{ pagination: { paginationModel } }}
              // pageSizeOptions={[5, 10]}
              // checkboxSelection
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              paginationMode="server"
              rowCount={rowCount}
              // sx={{ border: 0 ,color:"red"}}
            />
          </Paper>
        </div>
      </div>
    </React.Fragment>
  );
}
