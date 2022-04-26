import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { clearMessages } from "../../../store/actions";
import Message from "../../../helpers/Notification";
import useFCMNotifications from "../../../helpers/useFCMNotifications";
import useEnableFCM from "../../../helpers/useEnableFCM";
import TransferringBase from "./TransferringBase";
import TransferredBase from "./TransferredBase";
import TorrentsInput from "./TorrentsInput";
import TorrentsTransferring from "./TorrentsTransferring";

/**
 *
 * @param {string} dbPath
 * @param {RegExp} regExpString
 * @param {string} validationErrorMessage
 * @param {function} submitFN
 * @param {JSX.Element} title
 * @param {string} placeholder
 * @param {function} secondaryComponent
 * @param {function} transferringComponent
 * @param {function} torrentsComponent
 * @returns {JSX.Element}
 * @constructor
 */
const TorrentsBase = ({
  dbPath,
  regExpString,
  validationErrorMessage,
  submitFN,
  title,
  placeholder,
  secondaryComponent,
  transferringComponent,
  torrentsComponent,
}) => {
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
    fileUpload: {
      backgroundColor: theme.palette.background.paper,
      minHeight: "50px",
      marginBottom: "10px",
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
              Retry again after a few minutes.
            </>
          }
          open={notificationOpen}
          autoHideDuration={20000}
        />
      )}

      <TorrentsInput
        dbPath={dbPath}
        classes={classes}
        regExpString={regExpString}
        validationErrorMessage={validationErrorMessage}
        submitFN={submitFN}
        title={title}
        placeholder={placeholder}
      />

      <TorrentsTransferring
        classes={classes}
        torrentsComponent={torrentsComponent}
        dbPath={dbPath}
      />

      <TransferringBase
        classes={classes}
        transferringComponent={transferringComponent}
        dbPath={dbPath}
      />

      <TransferredBase
        classes={classes}
        secondaryComponent={secondaryComponent}
        dbPath={dbPath}
      />
    </div>
  );
};

export default TorrentsBase;
