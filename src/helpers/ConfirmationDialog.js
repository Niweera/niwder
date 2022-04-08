import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import React from "react";
import { makeStyles } from "@mui/styles";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialog-paper": {
      width: "80%",
      maxHeight: 435,
      backgroundColor: "rgba(0,0,0,0.75)",
      border: "1px solid",
      borderColor: theme.palette.warning.main,
      color: theme.palette.warning.main,
    },
  },
}));

const ConfirmationDialog = (props) => {
  const classes = useStyles();
  const { primaryMessage, onClose, open, action, secondaryMessage, ...other } =
    props;

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    action();
    onClose();
  };

  return (
    <Dialog
      className={classes.root}
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      PaperProps={{ elevation: 0 }}
      {...other}
    >
      <DialogTitle
        id="confirmation-dialog-title"
        sx={{ display: "flex", gap: "3px", alignItems: "center" }}
      >
        <WarningAmberIcon fontSize="1.25rem" />
        {primaryMessage}
      </DialogTitle>
      <DialogContent dividers>{secondaryMessage}</DialogContent>
      <DialogActions>
        <Button
          color="inherit"
          variant="outlined"
          autoFocus
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleOk}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
