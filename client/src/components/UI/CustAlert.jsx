import React from "react";
import ReactDOM from "react-dom";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
 
const CustAlert = (props) => {
  return (
    <React.Fragment>
    {ReactDOM.createPortal(
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={props.open}
        onClose={props.onClose}
        TransitionComponent={SlideTransition}
        autoHideDuration={2000}
      >
        <Alert
          onClose={props.onClose}
          severity={props.severity}
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>, document.getElementById('overlays')
    )}
    </React.Fragment>
  );
};

export default CustAlert;
