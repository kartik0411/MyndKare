import React, { useEffect } from "react";
import { Table } from '../../components/Table'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { createSection, showSection } from "../../redux/sectionSlice";
import { Box, IconButton, Tooltip} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Delete, Edit, Preview } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { deleteSection } from "../../redux/sectionSlice";
import CircularProgress from '@mui/material/CircularProgress';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { read, utils, writeFile } from 'xlsx';
import UpdateSection from "./UpdateSection";
import ViewSection from "./ViewSection";
import CreateSection from "./CreateSection";
import DeleteSection from "./DeleteSection";

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

function Section() {
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  // const [snackOpen, setSnackOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [editFormValues, setEditFormValues] = React.useState([]);
  const dispatch = useDispatch();
  const { sections, loading, error } = useSelector((state) => {
    let sectionobject = state.sectionDetail
    if(state.sectionDetail && state.sectionDetail.sections && state.sectionDetail.sections.length>0 && state.sectionDetail.sections[state.sectionDetail.sections.length-1]._id == null) {
      let newsectionobject = JSON.parse(JSON.stringify(sectionobject));
      newsectionobject.sections.pop();
      return newsectionobject;
    }
    else {
    return sectionobject;
    }
  });
    console.log(sections)
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 1,
      renderCell: (params) => {
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
      },
    },
  ];

  useEffect(() => {
    console.log("sdjjhjdsdsh")
    dispatch(showSection())
    console.log(sections)
  }, [])
  console.log(sections)
  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const exportToExcel = async () => {
    const worksheet = utils.json_to_sheet(sections);
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
    Cannot add Duplicate Section Names
  </Alert>
    );
  }

  return (
    <>
      {sections &&
        <div style={styles.containerQuestion}>
          <Typography
            className="text-sky-600 text-4xl pb-2 pl-2"
            variant="h4"
            gutterBottom
          >
            Sections
          </Typography>

          <div className="pb-4">
            <Button className="mx-2" onClick={handleCreateOpen} variant="contained">
              Create Section
            </Button>
          </div>

          <CreateSection
            selectedValue={selectedValue}
            open={createOpen}
            onClose={handleClose}
          />

          <UpdateSection
            selectedValue={editFormValues}
            open={editOpen}
            onClose={handleClose}
          />
          <ViewSection
            selectedValue={editFormValues}
            open={viewOpen}
            onClose={handleClose}
          />
          <DeleteSection
            selectedValue={editFormValues}
            open={deleteOpen}
            onClose={handleClose}
          />

          <Table
            height={tableOptions.height}
            width={tableOptions.width}
            rows={sections}
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

export default Section;