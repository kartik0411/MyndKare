import React, { useEffect } from "react";
import { Table } from '../../components/Table'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"; 
import { useDispatch, useSelector } from "react-redux";
import { createMBTI, showMBTI } from "../../redux/mbtiSlice";
import { Box, IconButton, Tooltip} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Delete, Edit, Preview } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert"; 
import { deleteMBTI } from "../../redux/mbtiSlice";
import CircularProgress from '@mui/material/CircularProgress';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { read, utils, writeFile } from 'xlsx';
import UpdateMBTI from "./UpdateMBTI";
import ViewMBTI from "./ViewMBTI";
import CreateMBTI from "./CreateMBTI";
import DeleteMBTI from "./DeleteMBTI";
import { showMBTIExam } from "../../redux/examSlice";
import { showDBDA } from "../../redux/dbdaSlice";

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

function MBTI() {
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  // const [snackOpen, setSnackOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [editFormValues, setEditFormValues] = React.useState([]);
  const dispatch = useDispatch();
  const { mbtis, loading, error } = useSelector((state) => {
    console.log("mbti detail:"+JSON.stringify(state))
    return state.mbtiDetail;
    // }
  });
  let { exams} = useSelector((state) => { 
    console.log("ehjdhdsjhdsjdsj"+JSON.stringify(state.examDetail))
    // let testobject = state.testDetail
    // if(state.testDetail && state.testDetail.tests && state.testDetail.tests.length>0 && state.testDetail.tests[state.testDetail.tests.length-1]._id == null) {
    //   let newtestobject = JSON.parse(JSON.stringify(testobject));
    //   newtestobject.tests.pop();s
    //   return newtestobject;
    // }
    // else {
    return state.examDetail;
    // }
  });
  const columns = [
    {
      field: "examName",
      headerName: "Exam Name",
      flex: 1
    },
    {
      field: "name",
      headerName: "Response",
      flex: 1
    },
    {
      field: "output",
      headerName: "Output",
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
            <Tooltip title="Delete details">
            <IconButton onClick={(e) => {
                handleDelete(params.row)
              }}>
                <Delete />
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
    dispatch(showMBTI())
    dispatch(showMBTIExam())
    dispatch(showDBDA())
    console.log(mbtis)
  }, [])
  console.log(mbtis)
  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const exportToExcel = async () => {
    const worksheet = utils.json_to_sheet(mbtis);
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
  // const handleSnackbarOpen = () => {
  //   console.log("dekhte hain")
  //   setCreateOpen(false);
  //   setEditOpen(false);
    // setSnackOpen(true);
  // }

  const handleClose = (value) => {
    setEditOpen(false);
    setCreateOpen(false);
    setViewOpen(false);
    setDeleteOpen(false);
    // if(snackOpen) {
    //   console.log("ye kaise aa skta")
    //   window.location.reload();
    // }
    // setSnackOpen(false);
    setSelectedValue(value);
  };

  // const snackaction = (
  //   <React.Fragment>
  //     <Button color="secondary" size="small" onClick={handleClose}>
  //       OK
  //     </Button>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={handleClose}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </React.Fragment>
  // );

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
    // <Snackbar
    //   open={setSnackOpen(true)}
    //   autoHideDuration={6000}
    //   onClose={handleClose}
    //   message="Cannot add Duplicate Names"
    //   action={snackaction}
    // />
    <Alert variant="filled" severity="error">
    Cannot add Duplicate MBTI Names
  </Alert>
    );
  }
  return (
    <>
      {mbtis &&
        <div style={styles.containerQuestion}>
          <Typography
            className="text-sky-600 text-4xl pb-2 pl-2"
            variant="h4"
            gutterBottom
          >
            MBTIs
          </Typography>

          <div className="pb-4">
            <Button className="mx-2" onClick={handleCreateOpen} variant="contained">
              Create MBTI
            </Button>
          </div>

          <CreateMBTI
            selectedValue={selectedValue}
            open={createOpen}
            examsValues={exams}
            onClose={handleClose}
          />

          <UpdateMBTI
            selectedValue={editFormValues}
            open={editOpen}
            examsValues={exams}
            onClose={handleClose}
          />
          <ViewMBTI
            selectedValue={editFormValues}
            open={viewOpen}
            examsValues={exams}
            onClose={handleClose}
          />
          <DeleteMBTI
            selectedValue={editFormValues}
            open={deleteOpen}
            onClose={handleClose}
          />

          <Table
            height={tableOptions.height}
            width={tableOptions.width}
            rows={mbtis}
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

export default MBTI;
