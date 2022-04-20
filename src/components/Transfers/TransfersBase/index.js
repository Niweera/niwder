import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { clearMessages } from "../../../store/actions";
import Message from "../../../helpers/Notification";
import useFCMNotifications from "../../../helpers/useFCMNotifications";
import useEnableFCM from "../../../helpers/useEnableFCM";
import InputComponent from "./InputComponent";
import TransferringBase from "./TransferringBase";
import TransferredBase from "./TransferredBase";

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
 * @returns {JSX.Element}
 * @constructor
 */
const TransfersBase = ({
  dbPath,
  regExpString,
  validationErrorMessage,
  submitFN,
  title,
  placeholder,
  secondaryComponent,
  transferringComponent,
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
  }))();

  return (
    <div className="container">
      {notification && (
        <Message
          severity={"info"}
          alertTitle={`Transfer completed: ${notification.title}`}
          onClose={onNotificationClose}
          message={notification.body}
          open={notificationOpen}
          autoHideDuration={5000}
        />
      )}

      <InputComponent
        dbPath={dbPath}
        classes={classes}
        regExpString={regExpString}
        validationErrorMessage={validationErrorMessage}
        submitFN={submitFN}
        title={title}
        placeholder={placeholder}
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

export default TransfersBase;
