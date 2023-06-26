import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box'

export default function MultiFieldModal(props) {
  return (
    <>
      <Dialog component="form" onSubmit={props.handleDataSubmit} open={props.openDialog} onClose={props.handleCloseDialog}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.content}
          </DialogContentText>
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseDialog}>Cancel</Button>
          <Button type="submit" onClick={props.handleCloseDialog}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}