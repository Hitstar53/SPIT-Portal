import * as React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 14,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ScrollModal(props) {
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <BootstrapDialogTitle
            id="scroll-dialog-title"
            onClose={props.onClose}
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "var(--text-color)",
              backgroundColor: "var(--bg-color)",
            }}
          >
            {props.title}
          </BootstrapDialogTitle>
          <DialogContent
            dividers
            sx={{
              color: "var(--text-color)",
              backgroundColor: "var(--bg-color)",
            }}
          >
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
              sx={{
                color: "var(--text-color)",
                whiteSpace: "pre-wrap",
              }}
            >
              {props.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              color: "var(--text-color)",
              backgroundColor: "var(--bg-color)",
            }}
          >
            <Button
              onClick={props.onClose}
              sx={{
                color: "var(--text-color)",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "var(--secondary-color)",
                },
              }}
            >
              {props.action}
            </Button>
          </DialogActions>
        </Dialog>, document.getElementById("overlays")
      )}
    </React.Fragment>
  );
}
