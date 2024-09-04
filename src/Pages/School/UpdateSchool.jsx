import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Padding } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { editSchool } from "../../redux/schoolSlice";
import axios from "../../axiosConfig";

function UpdateSchool(props) {
  const { onClose, selectedValue, open } = props;
  const [updateSchool, setUpdateSchool] = useState({});
  const [typedschool, settypedSchools] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedValue) {
        setUpdateSchool(selectedValue);
    }
  }, [selectedValue])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put("/schools",updateSchool);
    handleClose();
    window.location.reload();
  }

  const handleClose = () => {
    settypedSchools({typedschool: ""});
    onClose(selectedValue);
  };

  const updatedQuestion = (e) => {
    settypedSchools({typedschool: e.target.value});
    setUpdateSchool({ ...updateSchool, [e.target.name]: e.target.value })
  }

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Edit School</DialogTitle>
      <DialogContent>
        <form >
          <div className="pt-4">
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={updateSchool && updateSchool.name}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              onChange={updatedQuestion}
              required
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!typedschool.typedschool}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateSchool

