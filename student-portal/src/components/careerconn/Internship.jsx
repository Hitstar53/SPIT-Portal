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
import MultiFieldModal from '../UI/MultiFieldModal';
import TextField from '@mui/material/TextField';

const Internship = () => {
  const [open, setOpen] = React.useState(false);
  const [index,setIndex] = React.useState(0);
  const [internships, setInternships] = React.useState([])
  function handleClickOpen(index) {
    setIndex(index);
    setOpen(true);
    console.log(index)
  };
  const [newData, setNewData] = React.useState({})
  const handleDataChange = (e) => {
    setNewData({...newData,[e.target.name]:e.target.value})
  }
  const handleDataSubmit = (e) =>{
    const arr = internships
    arr.unshift(newData)
    setInternships(arr)
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = () => {
    const arr = internships
    arr.splice(index,1)
    setInternships(arr)
    setOpen(false)
  }
  const dashboard = styles.dashboard + " flex flex-col p-8"
  const internshipsDummy = [
    {
      inst:"Sardar Patel Institute of Technology",
      tenure:"June - July 2024",
      position:"Software Developer",
      financed:"Paid",
      mode:"Offline",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc",
    }
    ,{
      inst:"Sardar Patel Institute of Technology",
      tenure:"June - July 2023",
      position:"Software Developer",
      financed:"Unpaid",
      mode:"Online",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc",
    }
  ]
  React.useEffect(() => {
    setInternships(internshipsDummy);
  }, [])
  
  return (
    internships.length > 0 && (
      <div className={dashboard}>
        <h1 className="text-4xl font-semibold pb-8 flex justify-between">Internships <AddButton /></h1>
        {
          internships.map((info,index) => {
            return<div key={index} style={index==0?{borderTop:"1px solid var(--text-color)"}:{}} className={styles.internshipCard}>
                    <div className={styles.heading}>
                      <div className={styles.org}>
                        <div>{info.inst}</div>
                      
                          <DeleteIcon sx={{color:"var(--text-color)",cursor:"pointer"}}  onClick={()=>{
                              handleClickOpen(index)
                          }} />
                 
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
        <MultiFieldModal title="TITLE" content="THIS IS THE CONTENT">
          <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
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