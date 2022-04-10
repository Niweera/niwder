import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages } from "../../../store/actions";
import Message from "../../../helpers/Notification";
import { useFirebaseConnect } from "react-redux-firebase";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import { get } from "lodash";
import useFCMNotifications from "../../../helpers/useFCMNotifications";
import useEnableFCM from "../../../helpers/useEnableFCM";
import CustomizedToolTip from "../../../helpers/CustomizedToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons/faSync";
import InputComponent from "./InputComponent";

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

  const [transfers, setTransfers] = useState([]);
  const [transferring, setTransferring] = useState([]);
  const [notification, setNotification] = useState(null);

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

  const onNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

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

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "20vh", marginBottom: "20px" }}
      >
        <Grid item sx={{ textAlign: "center", minWidth: "50vw" }}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                variant="h5"
                className={classes.typography}
                sx={{ marginBottom: "10px" }}
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
                      <ListItem
                        alignItems="flex-start"
                        className={classes.glass}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <FontAwesomeIcon icon={faSync} color="white" spin />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <CustomizedToolTip
                              arrow
                              placement="top"
                              title={obj.name}
                            >
                              <Typography
                                sx={{
                                  display: "inline-block",
                                  maxWidth: "40vw",
                                }}
                                component="span"
                                variant="h6"
                                color="text.primary"
                                noWrap
                              >
                                {obj.name}
                              </Typography>
                            </CustomizedToolTip>
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
        <Grid item sx={{ textAlign: "center", minWidth: "50vw" }}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                variant="h5"
                className={classes.typography}
                sx={{ marginBottom: "10px" }}
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
                      <ListItem
                        alignItems="flex-start"
                        className={classes.glass}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon color="action" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <CustomizedToolTip
                              arrow
                              placement="top"
                              title={obj.name}
                            >
                              <Typography
                                sx={{
                                  display: "inline-block",
                                  maxWidth: "40vw",
                                }}
                                component="span"
                                variant="h6"
                                color="text.primary"
                                noWrap
                              >
                                {obj.name}
                              </Typography>
                            </CustomizedToolTip>
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
