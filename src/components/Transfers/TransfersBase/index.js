import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, checkAPIAlive } from "../../../store/actions";
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
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import { get } from "lodash";
import InputAdornment from "@mui/material/InputAdornment";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import SyncIcon from "@mui/icons-material/Sync";
import { red } from "@mui/material/colors";
import useFCMNotifications from "../../../helpers/useFCMNotifications";
import useEnableFCM from "../../../helpers/useEnableFCM";

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
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const [link, setLink] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [transfers, setTransfers] = useState([]);
  const [transferring, setTransferring] = useState([]);
  const [notification, setNotification] = useState(null);
  const [apiAlive, setApiAlive] = useState(null);
  const [transfersLoading, setTransfersLoading] = useState(null);
  const [transferringLoading, setTransferringLoading] = useState(null);

  useEnableFCM();
  useFCMNotifications(setNotification, setNotificationOpen);

  useEffect(() => () => clearMessages()(dispatch), [dispatch]);

  const uid = useSelector(
    ({
      firebase: {
        auth: { uid },
      },
    }) => uid
  );

  useFirebaseConnect([
    {
      path: `transferring/${uid}/${dbPath}`,
      type: "value",
      queryParams: ["orderByKey"],
    },
    {
      path: `transfers/${uid}/${dbPath}`,
      type: "value",
      queryParams: ["orderByKey"],
    },
  ]);

  const ordered = useSelector(({ firebase: { ordered } }) => ordered);

  useEffect(() => {
    const orderedData = get(ordered, `transfers.${uid}.${dbPath}`, []);
    setTransfers((orderedData || []).reverse().map((obj) => obj.value));
  }, [dbPath, uid, ordered]);

  useEffect(() => {
    const orderedData = get(ordered, `transferring.${uid}.${dbPath}`, []);
    setTransferring((orderedData || []).reverse().map((obj) => obj.value));
  }, [dbPath, uid, ordered]);

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
    const regExp = new RegExp(regExpString);

    if (!regExp.test(link)) {
      setValidationError(validationErrorMessage);
      return;
    }
    submitFN(link, dbPath)(firebase, dispatch);
    setValidationError("");
    setLink("");
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

  const requesting = useSelector(({ firebase: { requesting } }) => requesting);
  const requested = useSelector(({ firebase: { requested } }) => requested);

  useEffect(() => {
    const requestingProp = get(requesting, `transfers/${uid}/${dbPath}`, null);
    const requestedProp = get(requested, `transfers/${uid}/${dbPath}`, null);

    if (requestingProp === true && requestedProp === false) {
      setTransfersLoading(true);
    } else if (requestingProp === false && requestedProp === true) {
      setTransfersLoading(false);
    } else {
      setTransfersLoading(false);
    }
  }, [requesting, requested, uid, dbPath]);

  useEffect(() => {
    const requestingProp = get(
      requesting,
      `transferring/${uid}/${dbPath}`,
      null
    );
    const requestedProp = get(requested, `transferring/${uid}/${dbPath}`, null);

    if (requestingProp === true && requestedProp === false) {
      setTransferringLoading(true);
    } else if (requestingProp === false && requestedProp === true) {
      setTransferringLoading(false);
    } else {
      setTransferringLoading(false);
    }
  }, [requesting, requested, uid, dbPath]);

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
        style={{ minHeight: "30vh" }}
      >
        <Grid item style={{ textAlign: "center", minWidth: "50vw" }}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                variant="h5"
                className={classes.typography}
                style={{ marginBottom: "10px" }}
              >
                {title}
              </Typography>
              <Box component="form" noValidate autoComplete="off">
                <FormGroup>
                  <TextField
                    disabled={!apiAlive}
                    sx={{ mb: 1 }}
                    autoFocus
                    placeholder={placeholder}
                    value={link}
                    onChange={(event) => {
                      setValidationError("");
                      setLink(event.target.value);
                    }}
                    required
                    error={!!validationError}
                    label={validationError ? "Error" : ""}
                    helperText={!!validationError ? validationError : ""}
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {apiAlive === null ? (
                            <Tooltip title="Checking Niwder-API status">
                              <CircularProgress color="inherit" size="1.2rem" />
                            </Tooltip>
                          ) : apiAlive === true ? (
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
                disabled={!link}
                onClick={onSubmit}
                loading={loading}
              >
                Start Transfer
              </LoadingButton>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "20vh", marginBottom: "20px" }}
      >
        <Grid item style={{ textAlign: "center", minWidth: "50vw" }}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                variant="h5"
                className={classes.typography}
                style={{ marginBottom: "10px" }}
              >
                Now transferring
              </Typography>

              {transferringLoading === true && (
                <Typography variant="h6">
                  <Skeleton animation="wave" sx={{ bgcolor: "grey.900" }} />
                </Typography>
              )}

              {transferringLoading === false && transferring.length === 0 && (
                <>
                  <Divider />
                  <Typography
                    variant="h6"
                    className={classes.typography}
                    color="text.secondary"
                    sx={{ mt: "5px" }}
                  >
                    No current transfers
                  </Typography>
                </>
              )}

              {transferring.length > 0 && (
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                >
                  <Divider />
                  {transferring.map((obj, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar>
                            <CircularProgress color="inherit" />
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
                          secondary={transferringComponent(obj)}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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

              {transfersLoading === true && (
                <Typography variant="h6">
                  <Skeleton animation="wave" sx={{ bgcolor: "grey.900" }} />
                </Typography>
              )}

              {transfersLoading === false && transfers.length === 0 && (
                <>
                  <Divider />
                  <Typography
                    variant="h6"
                    className={classes.typography}
                    color="text.secondary"
                    sx={{ mt: "5px" }}
                  >
                    No completed transfers
                  </Typography>
                </>
              )}

              {transfers.length > 0 && (
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                >
                  <Divider />
                  {transfers.map((obj, index) => (
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
                          secondary={secondaryComponent(obj)}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default TransfersBase;
