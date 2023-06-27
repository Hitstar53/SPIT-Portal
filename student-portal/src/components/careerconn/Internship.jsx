import React from 'react'
import Fab from '@mui/material/Fab';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './Internship.module.css'
import AddButton from '../UI/AddButton';
import MultiFieldModal from '../UI/Modals/MultiFieldModal';
import TextField from '@mui/material/TextField';
import  MenuItem  from '@mui/material/MenuItem';

const internshipsDummy = [
  {
    inst: "Sardar Patel Institute of Technology",
    tenure: "June - July 2024",
    position: "Software Developer",
    financed: "Paid",
    mode: "Offline",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc",
  },
  {
    inst: "Sardar Patel Institute of Technology",
    tenure: "June - July 2023",
    position: "Software Developer",
    financed: "Unpaid",
    mode: "Online",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc",
  },
];

const Internship = () => {
  const [open, setOpen] = React.useState(false);
  const [index,setIndex] = React.useState(0);
  const [internships, setInternships] = React.useState(internshipsDummy);
  function handleClickOpen(index) {
    setIndex(index);
    setOpen(true);
    console.log(index)
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = () => {
    const arr = [...internships];
    arr.splice(index, 1);
    setInternships(arr);
    setOpen(false);
  };
  // Functions for dialog (copy from here )
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [newData, setNewData] = React.useState({})
  const handleDataChange = (e) => {
    setNewData({...newData,[e.target.name]:e.target.value})
  }
  const handleDataSubmit = (e) => {
    e.preventDefault();
    const arr = [...internships]
    arr.unshift(newData)
    setInternships(arr)
  }
  // Functions for dialog (copy till here )
  const dashboard = styles.dashboard + " flex flex-col p-8"
  
  return (
    internships.length > 0 && (
      <div className={dashboard}>
        <h1 className="text-4xl text-center md:text-left font-semibold pb-8 flex flex-col gap-4 md:gap-0 md:flex-row justify-between">
          Internships 
          <AddButton
            onClick={handleClickOpenDialog}
            btntext="Add Internship"
          />
        </h1>
        {
          internships.map((info,index) => {
            return<div key={index} style={index==0?{borderTop:"1px solid var(--text-color)"}:{}} className={styles.internshipCard}>
                    <div className={styles.heading}>
                      <div className={styles.org}>
                        <div>{info.inst}</div>
                          <DeleteIcon sx={{color:"var(--text-color)",cursor:"pointer"}}  onClick={()=>{
                              handleClickOpen(index)
                          }}/>
                      </div>
                      <div>{info.tenure}</div>
                    </div>
                    <div className={styles.details}>
                      <div>
                        <Chip sx={{backgroundColor:"var(--pill-color)",color:"var(--text-color)"}} label={info.position}  />
                        
                      </div>
                      <div className={styles.fdetails}>
                        <Chip sx={{backgroundColor:"var(--pill-color)",color:"var(--text-color)"}} label={info.financed}  />
                        <Chip sx={{backgroundColor:"var(--pill-color)",color:"var(--text-color)"}} label={info.mode}  />
                      </div>
                    </div>
                    <div className={styles.desc}>
                      {info.description}
                    </div>
                  </div>
                  
          })
        }
        <MultiFieldModal handleDataSubmit={handleDataSubmit} openDialog={openDialog} handleClickOpenDialog={handleClickOpenDialog} handleCloseDialog={handleCloseDialog}  title="Add new internship">
          <TextField
              required
              autoFocus
              margin="dense"
              name="inst"
              label="Organization"
              autoComplete="off"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleDataChange}
            />
          <TextField
              required
              margin="dense"
              name="tenure"
              label="Duration"
              autoComplete="off"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleDataChange}
            />
          <TextField
              required
              margin="dense"
              name="position"
              label="Position"
              autoComplete="off"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleDataChange}
            />
          <TextField
              name="financed"
              id="outlined-required"
              select
              fullWidth
              autocomplete="off"
              sx={{margin:'1rem 0 0 0'}}
              label="Paid or Unpaid"
              onChange={handleDataChange}
            >
              <MenuItem key="Paid" value="Paid">
                Paid
              </MenuItem>
              <MenuItem key="UnPaid" value="UnPaid">
                Unpaid
              </MenuItem>
            </TextField>
             <TextField
              name="mode"
              id="outlined-required"
              select
              fullWidth
              sx={{margin: '1rem 0 0 0'}}
              label="Mode"
              onChange={handleDataChange}
            >
              <MenuItem key="Online" value="Online">
                Online
              </MenuItem>
              <MenuItem key="Offline" value="Offline">
                Offline
              </MenuItem>
            </TextField>
              <TextField
                  multiline
                  required
                  margin="dense"
                  name="description"
                  label="Description"
                  autoComplete="off"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleDataChange}
                />
        </MultiFieldModal>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogContent sx={{background:"var(--bg-color)",pb:0}}>
              <DialogContentText sx={{color:"var(--text-color)"}} id="alert-dialog-description">
                Do you want to delete this record?
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{background:"var(--bg-color)",color:"var(--text-color)"}}>
              <Button sx={{color:"var(--text-color)"}} onClick={handleClose}>No</Button>
              <Button sx={{color:"var(--text-color)"}} onClick={handleChange} >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
      </div>

    )
  )
}

export default Internship