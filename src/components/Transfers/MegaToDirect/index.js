import React, { useEffect, useState } from "react";
import { clearMessages, queueMegaTransfer } from "../../../store/actions";
import { MEGA_TO_DIRECT_QUEUE, megaRe } from "../../../config/Constants";
import Message from "../../../helpers/Notification";
import InputComponent from "./InputComponent";
import TransferringComponent from "./TransferringComponent";
import TransferredComponent from "./TransferredComponent";
import { useDispatch } from "react-redux";
import useEnableFCM from "../../../helpers/useEnableFCM";
import useFCMNotifications from "../../../helpers/useFCMNotifications";
import { makeStyles } from "@mui/styles";
import { faM } from "@fortawesome/free-solid-svg-icons/faM";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";

const MegaToDirect = () => {
  const dispatch = useDispatch();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEnableFCM();
  useFCMNotifications(setNotification, setNotificationOpen);

  useEffect(() => () => clearMessages()(dispatch), [dispatch]);

  const onNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  const classes = makeStyles((theme) => ({
    root: {
      minWidth: 350,
    },
    glass: {
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "1px",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(2.1px)",
      border: "1px solid rgba(255, 255, 255, 0.24)",
      alignItems: "flex-start",
    },
    title: {
      fontSize: 14,
    },
    large: {
      paddingBottom: "6px",
      marginBottom: "2px",
      filter: "drop-shadow(0px 0px 15px #222)",
    },
    typography: {
      flexGrow: 1,
      textAlign: "center",
      color: theme.palette.text.primary,
    },
    button: {
      marginTop: theme.spacing(2),
      fontSize: "18px",
      width: "150px",
      "&:hover": {
        border: `1px solid ${theme.palette.action.success}`,
        color: theme.palette.action.success,
      },
    },
  }))();

  return (
    <div className="container">
      {notification?.title && (
        <Message
          severity={"info"}
          alertTitle={`Transfer completed: ${notification.title}`}
          onClose={onNotificationClose}
          message={notification.body}
          open={notificationOpen}
          autoHideDuration={5000}
        />
      )}

      {notification?.job && (
        <Message
          severity={"error"}
          alertTitle={"Error occurred in transfer"}
          onClose={onNotificationClose}
          message={
            <>
              Error [{notification.error}] <br />
              occurred in transferring <br />
              {notification.job} <br />
            </>
          }
          open={notificationOpen}
          autoHideDuration={20000}
        />
      )}

      <InputComponent
        classes={classes}
        regExpString={megaRe}
        dbPath={MEGA_TO_DIRECT_QUEUE}
        validationErrorMessage={
          "The URL must be a valid Mega.nz file/folder export URL"
        }
        submitFN={queueMegaTransfer}
        title={<>Add a Mega.nz link to convert to a Direct link</>}
        placeholder={"Mega.nz Link"}
      />

      <TransferringComponent classes={classes} dbPath={MEGA_TO_DIRECT_QUEUE} />

      <TransferredComponent
        classes={classes}
        dbPath={MEGA_TO_DIRECT_QUEUE}
        toText={"Direct Link"}
        toIcon={faLink}
        fromText={"Mega.nz Link"}
        fromIcon={faM}
      />
    </div>
  );
};

export default MegaToDirect;
