import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessages,
  storeFCMKey,
  checkAPIAlive,
  gDriveToMega,
} from "../../../store/actions";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Message from "../../../helpers/Notification";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFirebase, useFirebaseConnect } from "react-redux-firebase";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import List from "@mui/material/List";
import TimeAgo from "react-timeago";
import prettyBytes from "pretty-bytes";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { FCM_VAPID_KEY, messaging } from "../../../config";
import { get } from "lodash";
import InputAdornment from "@mui/material/InputAdornment";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import SyncIcon from "@mui/icons-material/Sync";
import { red } from "@mui/material/colors";

const GDriveToMega = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const [gDriveLink, setGDriveLink] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [transfers, setTransfers] = useState([]);
  const [notification, setNotification] = useState(null);
  const [apiAlive, setApiAlive] = useState(false);

  const uid = useSelector(
    ({
      firebase: {
        auth: { uid },
      },
    }) => uid
  );

  useFirebaseConnect({
    path: `transfers/${uid}/gdrive-to-mega`,
    type: "value",
    queryParams: ["orderByKey"],
  });

  const ordered = useSelector(({ firebase: { ordered } }) => ordered);

  useEffect(() => {
    const orderedData = get(ordered, `transfers.${uid}.gdrive-to-mega`, []);
    setTransfers((orderedData || []).reverse().map((obj) => obj.value));
  }, [uid, ordered]);

  useEffect(() => {
    if (messaging) {
      if (
        Notification.permission !== "granted" &&
        Notification.permission !== "denied"
      ) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            messaging
              .getToken({
                vapidKey: FCM_VAPID_KEY,
              })
              .then((refreshedToken) => {
                storeFCMKey(refreshedToken, uid)(firebase);
              })
              .catch((e) => console.log(e));
          }
        });
      }
    }
  }, [firebase, uid]);

  useEffect(() => {
    if (messaging) {
      const unsubscribe = messaging.onMessage(
        (payload) => {
          setNotification(payload?.notification);
          setNotificationOpen(true);
        },
        (error) => console.log(error)
      );

      return () => {
        unsubscribe && unsubscribe();
      };
    }
  }, []);

  const error = useSelector(
    ({
      userData: {
        transfer: { error },
      },
    }) => error
  );
  const loading = useSelector(
    ({
      userData: {
        transfer: { loading },
      },
    }) => loading
  );

  const onErrorNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  const onSuccessNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    clearMessages()(dispatch);
    setSuccessOpen(false);
  };

  const onNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  useEffect(() => {
    if (error) {
      setErrorOpen(true);
    }
  }, [error]);

  useEffect(() => {
    if (error === false && loading === false) {
      setSuccessOpen(true);
    }
  }, [error, loading]);

  const classes = makeStyles((theme) => ({
    root: {
      minWidth: 350,
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

  const onSubmit = () => {
    const regExp = new RegExp(
      /^https:\/\/drive\.google\.com\/drive\/folders\/.*\?.*$/g
    );
    if (!regExp.test(gDriveLink)) {
      setValidationError(
        "The URL must be a valid Google Drive file/folder export URL"
      );
      return;
    }
    gDriveToMega(gDriveLink)(firebase, dispatch);
    setValidationError("");
    setGDriveLink("");
    clearMessages()(dispatch);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      checkAPIAlive()(firebase)
        .then(() => setApiAlive(true))
        .catch(() => setApiAlive(false));
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [firebase]);

  return (
    <div className="container">
      {error && (
        <Message
          severity={"error"}
          onClose={onErrorNotificationClose}
          message={error}
          open={errorOpen}
          autoHideDuration={2000}
        />
      )}
      {successOpen && (
        <Message
          severity={"success"}
          onClose={onSuccessNotificationClose}
          message={"Transfer Queued!"}
          open={successOpen}
          autoHideDuration={2000}
        />
      )}
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
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "40vh" }}
      >
        <Grid item style={{ textAlign: "center", minWidth: "50vw" }}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                variant="h5"
                className={classes.typography}
                style={{ marginBottom: "10px" }}
              >
                Add a Google Drive link to convert to a Mega.nz link
              </Typography>
              <Box component="form" noValidate autoComplete="off">
                <FormGroup>
                  <TextField
                    disabled={!apiAlive}
                    sx={{ mb: 1 }}
                    autoFocus
                    placeholder="Google Drive Link"
                    value={gDriveLink}
                    onChange={(event) => {
                      setValidationError("");
                      setGDriveLink(event.target.value);
                    }}
                    required
                    error={!!validationError}
                    label={validationError ? "Error" : ""}
                    helperText={!!validationError ? validationError : ""}
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {apiAlive ? (
                            <Tooltip title="Niwder-API is active">
                              <SyncIcon color="success" />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Niwder-API is unreachable">
                              <SyncProblemIcon sx={{ color: red[500] }} />
                            </Tooltip>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormGroup>
              </Box>
              <LoadingButton
                variant="outlined"
                color="inherit"
                size={"large"}
                className={classes.button}
                disabled={!gDriveLink}
                onClick={onSubmit}
                loading={loading}
              >
                Start Transfer
              </LoadingButton>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {transfers.length > 0 && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item style={{ textAlign: "center", minWidth: "50vw" }}>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  variant="h5"
                  className={classes.typography}
                  style={{ marginBottom: "10px" }}
                >
                  Completed transfers
                </Typography>

                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                >
                  <Divider />
                  {transfers.map((obj, index) => {
                    return (
                      <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar>
                              <FolderIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="h6"
                                color="text.primary"
                              >
                                {obj.name}
                              </Typography>
                            }
                            secondary={
                              <React.Fragment>
                                <Link
                                  href={obj.megaLink}
                                  underline={"hover"}
                                  variant="body1"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  color="white"
                                >
                                  Mega.nz Link
                                </Link>
                                <br />
                                <Link
                                  href={obj.gDriveLink}
                                  underline={"hover"}
                                  variant="body1"
                                  target="_blank"
                                  color="white"
                                  rel="noopener noreferrer"
                                >
                                  Google Drive Link
                                </Link>
                                <br />
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {prettyBytes(obj.size)} [{obj.mimeType}]
                                </Typography>
                                <br />
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  Transferred: <TimeAgo date={obj.timestamp} />
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default GDriveToMega;
