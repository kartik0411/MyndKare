import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Padding } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deleteStudent } from "../../redux/studentSlice";

function DeleteStudent(props) {
  const { onClose, selectedValue, open } = props;
  const [updateStudent, setUpdateStudent] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedValue) {
        setUpdateStudent(selectedValue);
    }
  }, [selectedValue])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteStudent(updateStudent._id))
    handleClose();
    window.location.reload();
  }

  const handleClose = () => {
    onClose(selectedValue);
  };

  const updatedQuestion = (e) => {
    setUpdateStudent({ ...updateStudent, [e.target.name]: e.target.value })
  }

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Are you sure you want to delete the below Student?</DialogTitle>
      <DialogContent>
        <form >
          <div className="pt-4">
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={updateStudent && updateStudent.name}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              // onChange={updatedQuestion}
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleSubmit}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteStudent
