import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
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
        <div>
        <Dialog open={open} onClose={props.onClose}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
            <TextField
                margin="dense"
                id="name"
                label={props.label}
                type="text"
                fullWidth
                variant="standard"
                onChange={changeHandler}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button onClick={saveHandler}>Save</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
