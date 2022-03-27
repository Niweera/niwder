import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";

const Notification = ({
  open,
  autoHideDuration,
  onClose,
  elevation,
  variant,
  severity,
  message,
  alertTitle,
  ...rest
}) => (
  <Snackbar
    open={open}
    autoHideDuration={autoHideDuration || 6000}
    onClose={onClose}
  >
    <Alert
      elevation={elevation || 6}
      variant={variant || "filled"}
      onClose={onClose}
      severity={severity}
      {...rest}
    >
      {alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
      {message}
    </Alert>
  </Snackbar>
);

export default Notification;
