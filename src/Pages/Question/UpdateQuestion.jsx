import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { editQuestion } from "../../redux/questionSlice";
import MenuItem from "@mui/material/MenuItem";
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";


function UpdateQuestion(props) {
  const { onClose, selectedValue, open, examValues} = props;
  const [questions, setQuestions] = useState({});
  const [dbda, setDBDA] = useState(false);
  const [option1, setoption1] = useState();
  const [option2, setoption2] = useState();
  const [option3, setoption3] = useState();
  const [option4, setoption4] = useState();
  const [option5, setoption5] = useState();
  const [exam,setExam] = useState({});
  const [option2present, setoption2present] = useState(false);
  const [option3present, setoption3present] = useState(false);
  const [option4present, setoption4present] = useState(false);
  const [option5present, setoption5present] = useState(false);
  const [typedsection, settypedSections] = useState(false);
  const [questionChanged, setQuestionChanged] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    // if (testsValues) {
    //   setTests(testsValues);
    // }
    // if(dbdasValues) {
    //   setDbadas(dbdasValues);
    // }
    if (selectedValue) {
      let value = Object.assign({},selectedValue);
      for(let i=0;i<examValues?.length;i++) {
        if(examValues[i]._id === selectedValue.examId) {
          setExam(examValues[i]);
          if(examValues[i].dbdaId) {
            setDBDA(true);
          } else {
            setDBDA(false);
          }
        }
      }
      if(value.options?.length>0) {
        setoption1(value.options[0]);
        setoption2present(true);
        if(value.options?.length>1) {
          setoption2(value.options[1]);
          setoption3present(true);
          if(value.options?.length>2) {
            setoption3(value.options[2]);
            setoption4present(true);
            if(value.options?.length>3) {
              setoption4(value.options[3]);
              setoption5present(true);
              if(value.options?.length>4) {
                setoption5(value.options[4]);
              }
            }
          }
        }
      } 
      delete value.options;
      setQuestionChanged(false); 
      setQuestions(value);
      settypedSections(false);
  }
  }, [selectedValue])

 useEffect(() => {
  if(questions.options) {
    dispatch(editQuestion(questions));
    handleClose();
    window.location.reload(); 
  } else {
    if(questions.name && questionChanged) {
      if(option1) { 
        if(questions.examId) {
          if(dbda) {
            if(questions.AnsOrSerial) {
              settypedSections(true);
            } else {
              settypedSections(false);
            }
          } else {
            settypedSections(true);
          }
        } else {
          settypedSections(false);
        }
      } else {
        settypedSections(false);
      }
    } else {
      settypedSections(false);
    } 
  }
 }, [questions]);

 useEffect(() => {
  if(questions.name && questionChanged) { 
    if(option1) {
      if(questions.examId) {
        if(dbda) {
          if(questions.AnsOrSerial) {
            settypedSections(true);
          } else {
            settypedSections(false);
          }
        } else {
          settypedSections(true);
        }
      } else {
        settypedSections(false);
      }
    } else {
      settypedSections(false);
    }
  } else {
    settypedSections(false);
  }
}, [option1]);

useEffect(() => {
  if(questions.name && questionChanged) { 
    if(option1) {
      if(questions.examId) {
        if(dbda) {
          if(questions.AnsOrSerial) {
            settypedSections(true);
          } else {
            settypedSections(false);
          }
        } else {
          settypedSections(true);
        }
      } else {
        settypedSections(false);
      }
    } else {
      settypedSections(false);
    }
  } else {
    settypedSections(false);
  }
}, [option2]);

useEffect(() => {
  if(questions.name && questionChanged) { 
    if(option1) {
      if(questions.examId) {
        if(dbda) {
          if(questions.AnsOrSerial) {
            settypedSections(true);
          } else {
            settypedSections(false);
          }
        } else {
          settypedSections(true);
        }
      } else {
        settypedSections(false);
      }
    } else {
      settypedSections(false);
    }
  } else {
    settypedSections(false);
  }
}, [option3]);

useEffect(() => {
  if(questions.name && questionChanged) { 
    if(option1) {
      if(questions.examId) {
        if(dbda) {
          if(questions.AnsOrSerial) {
            settypedSections(true);
          } else {
            settypedSections(false);
          }
        } else {
          settypedSections(true);
        }
      } else {
        settypedSections(false);
      }
    } else {
      settypedSections(false);
    }
  } else {
    settypedSections(false);
  }
}, [option4]);

useEffect(() => {
  if(questions.name && questionChanged) { 
    if(option1) {
      if(questions.examId) {
        if(dbda) {
          if(questions.AnsOrSerial) {
            settypedSections(true);
          } else {
            settypedSections(false);
          }
        } else {
          settypedSections(true);
        }
      } else {
        settypedSections(false);
      }
    } else {
      settypedSections(false);
    }
  } else {
    settypedSections(false);
  }
}, [option5]);

  const getQuestionData = (e) => {
    setQuestionChanged(true);
    if(e.target.name === "examId") {
      setExam(e.target.value);
      if(e.target.value.dbdaId) {
        if(!dbda) {
          delete questions.AnsOrSerial;
        }
        setDBDA(true);
        setQuestions({ ...questions, [e.target.name]: e.target.value._id })
      } else {
        let serial = e.target.value.questions+1;
        setDBDA(false);
        setQuestions({ ...questions, AnsOrSerial: serial, [e.target.name]: e.target.value._id })
      }
    } else if(e.target.name === "option1" || e.target.name === "option2" || e.target.name === "option3" || e.target.name === "option4" || e.target.name === "option5") {
      if(e.target.name === "option1" && e.target.value) {
        setoption1(e.target.value)
        setoption2present(true);
        if(option2) {
          setoption3present(true);
        }
        if(option3) {
          setoption4present(true);
        }
        if(option4) {
          setoption5present(true);
        }
      }
      if(e.target.name === "option1" && !e.target.value) { 
        setoption1(e.target.value)
        setoption2present(false);
        setoption3present(false);
        setoption4present(false);
        setoption5present(false);
      }
      if(e.target.name === "option2" && e.target.value) {
        setoption2(e.target.value)
        setoption3present(true);
        if(option3) {
          setoption4present(true);
        }
        if(option4) {
          setoption5present(true);
        }
      }
      if(e.target.name === "option2" && !e.target.value) {
        setoption2(e.target.value)
        setoption3present(false);
        setoption4present(false);
        setoption5present(false);
      }
      if(e.target.name === "option3" && e.target.value) {
        setoption3(e.target.value)
        setoption4present(true);
        if(option4) {
          setoption5present(true);
        }
      }
      if(e.target.name === "option3" && !e.target.value) {
        setoption3(e.target.value)
        setoption4present(false);
        setoption5present(false);
      }
      if(e.target.name === "option4" && e.target.value) {
        setoption4(e.target.value)
        setoption5present(true);
      }
      if(e.target.name === "option4" && !e.target.value) {
        setoption4(e.target.value)
        setoption5present(false);
      }
      if(e.target.name === "option5") {
        setoption5(e.target.value)
      }
    } 
    else { 
      setQuestions({ ...questions, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let options = [];
    options.push(option1);
    if(option2) {
      options.push(option2);  
      if(option3) {
        options.push(option3); 
        if(option4) {
          options.push(option4);  
          if(option5) {
            options.push(option5);  
          }
        } 
      }
    }
    setQuestions({ ...questions, options: options })
  }

  const handleClose = () => {
    setDBDA(false);
    setoption1(null);
    setoption2(null);
    setoption3(null);
    setoption4(null);
    setoption5(null);
    setExam({});
    setoption2present(false);
    setoption3present(false);
    setoption4present(false);
    setoption5present(false);
    settypedSections(false);
    setQuestionChanged(false);
    onClose(selectedValue);
  };

  const styles = {
    equalFields: {
      width: "50%",
      paddingRight: "15px",
    },
  };
  const menuItems = examValues?.map(item => (
    <MenuItem value={item}>{item.name}</MenuItem>
    ));

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Edit Question</DialogTitle>
      <DialogContent>
        <form >
        <div className="pt-4">
        <FormControl size="small" sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}>
            <InputLabel id="demo-select-small-label" required>Exams</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="examId"
              value={exam}
              label="Test"
              onChange={getQuestionData}
            >
              {menuItems}
            </Select>
            </FormControl>
            </div>
            <div className="pt-4">
            <TextField
              fullWidth
              label="Question"
              name="name"
              value = {questions.name}
              onChange={getQuestionData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              required
            />
          </div>
          <div className="pt-4">
            <TextField
              style={styles.equalFields}
              label="Option 1"
              name="option1"
              value = {option1} 
              onChange={getQuestionData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              required
            />

          {option2present ? <TextField
              style={{ width: "50%" }}
              label="Option 2"
              name="option2"
              value = {option2} 
              onChange={getQuestionData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
            /> : false}
          </div>
          <div className="pt-4">
          {option3present ? <TextField
              style={styles.equalFields}
              label="Option 3"
              name="option3"
              value = {option3} 
              onChange={getQuestionData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
            /> : false}

            {option4present ? <TextField
              style={{ width: "50%" }}
              label="Option 4"
              name="option4"
              value = {option4} 
              onChange={getQuestionData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
            /> : false}
          </div>
          <div className="pt-4">
          {option5present ? <TextField
              style={styles.equalFields}
              label="Option 5"
              name="option5"
              value = {option5} 
              onChange={getQuestionData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
            /> : false}
            {dbda ? <TextField
              style={{ width: "50%" }}
              label="Answer"
              value={questions.AnsOrSerial}
              name="AnsOrSerial"
              onChange={getQuestionData}
              id="outlined-number"
              type="number"
              size="small"
              required
            />  : false}
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={!typedsection} onClick={handleSubmit}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateQuestion

