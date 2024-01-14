import React, { useEffect } from "react";
import { Table } from '../../components/Table'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"; 
import { useDispatch, useSelector } from "react-redux";
import { createDBDAScore, showDBDAScore } from "../../redux/dbdaScoreSlice";
import { Box, IconButton, Tooltip} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Delete, Edit, Preview } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert"; 
import { deleteDBDAScore } from "../../redux/dbdaScoreSlice";
import CircularProgress from '@mui/material/CircularProgress';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { read, utils, writeFile } from 'xlsx';
import UpdateDBDAScore from "./UpdateDBDAScore";
import ViewDBDAScore from "./ViewDBDAScore";

const tableOptions = {
  height: "auto",
  width: "100%",
  initialState: {
    pagination: {
      paginationModel: {
        pageSize: 10,
      },
    },
  },
  pageSizeOptions: [5, 10, 25],
  checkboxSelection: false,
  disableSelectionOnClick: true,
};

const styles = {
  containerQuestion: {
    padding: "20px 50px 50px 50px",
  },
};

function DBDAScore() {
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  // const [snackOpen, setSnackOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [editFormValues, setEditFormValues] = React.useState([]);
  const dispatch = useDispatch();
  const { dbdaScores, loading, error } = useSelector((state) => {
    console.log("dbdaScore detail:"+JSON.stringify(state))
    return state.dbdaScoreDetail;
    // }
  });
  let { exams} = useSelector((state) => { 
    return state.examDetail;
  });
  const columns = [
    {
      field: "dbda",
      headerName: "DBDA",
      flex: 1
    },
    {
      field: "score",
      headerName: "Score",
      flex: 1
    },
    {
      field: "detail",
      headerName: "Detail",
      flex: 1
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 1,
      renderCell: (params) => {
        if(params.row.name!='CIS') {
        return (
          <Box>
            <Tooltip title="View details">
              <IconButton onClick={(e) => { 
                handleView(params.row)
              }}>
                <Preview />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit details">
              <IconButton onClick={(e) => {
                handleEdit(params.row)
              }}>
                <Edit />
              </IconButton>
            </Tooltip>
          </Box>
        );
            }
            else {
              return (
                <Box>
                  <Tooltip title="View details">
                    <IconButton onClick={(e) => { 
                      handleView(params.row)
                    }}>
                      <Preview />
                    </IconButton>
                  </Tooltip>
                </Box>
              );
            }
      },
    },
  ];

  useEffect(() => {
    dispatch(showDBDAScore())
    console.log(dbdaScores)
  }, [])

  const exportToExcel = async () => {
    const worksheet = utils.json_to_sheet(dbdaScores);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    writeFile(workbook, 'data.xlsx');
  }

  const handleEdit = (value) => {
    setCreateOpen(false);
    setEditOpen(true);
    setEditFormValues(value)
    console.log(value)
  }

  const handleDelete = (value) => {
    setCreateOpen(false);
    setEditOpen(false);
    setDeleteOpen(true);
    setEditFormValues(value)
    console.log(value)
  }

  const handleView = (value) => {
    setCreateOpen(false);
    setEditOpen(false);
    setViewOpen(true);
    setEditFormValues(value)
    console.log(value)
  }

  const handleClose = (value) => {
    setEditOpen(false);
    setCreateOpen(false);
    setViewOpen(false);
    setDeleteOpen(false);
    setSelectedValue(value);
  };


  if (loading) {
    return (
      <Box className="mb-40 mt-40 flex items-center justify-center" sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  if(error) {
    setTimeout(window.location.reload.bind(window.location), 2000);
    return (
    <Alert variant="filled" severity="error">
    Cannot add Duplicate DBDAScore Names
  </Alert>
    );
  }
  return (
    <>
      {dbdaScores &&
        <div style={styles.containerQuestion}>
          <Typography
            className="text-sky-600 text-4xl pb-2 pl-2"
            variant="h4"
            gutterBottom
          >
            DBDAScores
          </Typography>

          <UpdateDBDAScore
            selectedValue={editFormValues}
            open={editOpen}
            examsValues={exams}
            onClose={handleClose}
          />
          <ViewDBDAScore
            selectedValue={editFormValues}
            open={viewOpen}
            examsValues={exams}
            onClose={handleClose}
          />

          <Table
            height={tableOptions.height}
            width={tableOptions.width}
            rows={dbdaScores}
            columns={columns}
            initialState={tableOptions.initialState}
            pageSizeOptions={tableOptions.pageSizeOptions}
            checkboxSelection={tableOptions.checkboxSelection}
            disableSelectionOnClick={tableOptions.disableSelectionOnClick}
          />
          <div className="flex justify-end">
            <Button className="my-2" onClick={exportToExcel} variant="contained">
              Download <DownloadRoundedIcon />
            </Button>
          </div>
        </div>
      }
    </>
  );
}

export default DBDAScore;