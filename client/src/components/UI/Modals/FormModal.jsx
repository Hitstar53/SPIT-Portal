import * as React from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormModal(props) {
    const [value, setValue] = React.useState('')
    const changeHandler = (event) => {
        setValue(event.target.value)
    }
    const saveHandler = () => {
        props.onSubmit(value)
        props.onClose()
    }
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          <Dialog open={open} onClose={props.onClose}>
            <DialogTitle
              sx={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {props.title}
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label={props.label}
                type="text"
                fullWidth
                variant="standard"
                helperText={props.helperText}
                onChange={changeHandler}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={props.onClose}>Cancel</Button>
              <Button onClick={saveHandler}>Save</Button>
            </DialogActions>
          </Dialog>,
          document.getElementById("overlays")
        )}
      </React.Fragment>
    );
}
