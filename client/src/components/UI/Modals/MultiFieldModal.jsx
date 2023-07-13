import * as React from 'react';
import ReactDOM from "react-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function MultiFieldModal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Dialog component="form" onSubmit={props.handleDataSubmit} open={props.openDialog} onClose={props.handleCloseDialog}>
          <DialogTitle
            sx={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}
          >
            {props.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {props.content}
            </DialogContentText>
            {props.children}
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleCloseDialog}>Cancel</Button>
            <Button type="submit" onClick={props.handleCloseDialog}>Save</Button>
          </DialogActions>
        </Dialog>, document.getElementById('overlays')
      )}
    </React.Fragment>
  );
}