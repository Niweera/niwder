import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";

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
      {message && (
        <Typography
          sx={{
            display: "inline-block",
            maxWidth: "40vw",
          }}
          component="span"
          variant="body2"
          color="text.primary"
          noWrap
        >
          {message}
        </Typography>
      )}
    </Alert>
  </Snackbar>
);

export default Notification;
