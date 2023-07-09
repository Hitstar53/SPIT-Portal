import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

export default function Notif() {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          severity="info"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
                <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ 
            mb: 2,
            backgroundColor: "#1f2937",
            borderRadius: "0.7rem",
          }}
        >
            You have a new notification — <strong> Check it out!</strong>
        </Alert>
      </Collapse>
    </Box>
  );
}
