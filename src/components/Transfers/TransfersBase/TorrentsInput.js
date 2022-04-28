import React, { useEffect, useState, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import SyncIcon from "@mui/icons-material/Sync";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import { red } from "@mui/material/colors";
import LoadingButton from "@mui/lab/LoadingButton";
import { checkAPIAlive, clearMessages } from "../../../store/actions";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../helpers/Notification";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { useDropzone } from "react-dropzone";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const DNDComponent = (props) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={props.className}
      sx={{ cursor: props.apiAlive ? "pointer" : "not-allowed" }}
    >
      <Grid item>
        <FileUploadIcon sx={{ mt: "5px", mr: "5px" }} />
      </Grid>
      <Grid item>
        <Typography
          noWrap
          variant="body1"
          className={props.className1}
          sx={{
            maxWidth: "40vw",
          }}
        >
          {props.name ? props.name : "Drag and drop your torrent file here."}
        </Typography>
      </Grid>
    </Grid>
  );
};

/**
 * @param {string} dbPath
 * @param {object} classes
 * @param {RegExp} regExpString
 * @param {string} validationErrorMessage
 * @param {function} submitFN
 * @param {JSX.Element} title
 * @param {string} placeholder
 * @returns {JSX.Element}
 * @constructor
 */
const TorrentsInput = ({
  dbPath,
  classes,
  regExpString,
  validationErrorMessage,
  submitFN,
  title,
  placeholder,
}) => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const [link, setLink] = useState("");
  const [validationError, setValidationError] = useState("");
  const [apiAlive, setApiAlive] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [torrent, setTorrent] = useState(null);
  const [name, setName] = useState("");

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

  const onSubmit = () => {
    if (torrent) {
      submitFN(link, dbPath, torrent)(firebase, dispatch);
      setTorrent(null);
      setName("");
      setValidationError("");
      clearMessages()(dispatch);
      return;
    }

    if (link) {
      const regExp = new RegExp(regExpString);

      if (!regExp.test(link)) {
        setValidationError(validationErrorMessage);
        return;
      }

      submitFN(link, dbPath)(firebase, dispatch);
      setLink("");
      setValidationError("");
      clearMessages()(dispatch);
    }
  };

  const copyFromClipboard = async () => {
    if (!("clipboard" in navigator)) return;
    const permissions = await navigator.permissions.query({
      name: "clipboard-read",
    });
    if (permissions.state !== "granted" && permissions.state !== "prompt")
      return;
    const clipText = await navigator.clipboard.readText();
    const regExp = new RegExp(regExpString);
    if (!regExp.test(clipText)) return;
    setValidationError("");
    setLink(clipText);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSubmit();
    }
  };

  const loading = useSelector(
    ({
      userData: {
        transfer: { loading },
      },
    }) => loading
  );

  const error = useSelector(
    ({
      userData: {
        transfer: { error },
      },
    }) => error
  );

  useEffect(() => {
    if (error === false && loading === false) {
      setSuccessOpen(true);
    }
  }, [error, loading]);

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

  useEffect(() => {
    if (error) {
      setErrorOpen(true);
    }
  }, [error]);

  const onDropAccepted = useCallback((files) => {
    if (files.length > 0) {
      setName(files[0].name);
      setTorrent(files[0]);
    }
  }, []);

  const onDropRejected = useCallback((files) => {
    if (files.length > 0) {
      setTorrent(null);
      setValidationError("Please only select a torrent file");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    accept: [".torrent", "application/x-bittorrent"],
    maxFiles: 1,
    onDropRejected,
  });

  return (
    <>
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
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ my: "20px" }}
      >
        <Grid item sx={{ textAlign: "center", minWidth: "50vw" }}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                variant="h5"
                className={classes.typography}
                sx={{ marginBottom: "10px" }}
              >
                {title}
              </Typography>
              <Box component="form" noValidate autoComplete="off">
                <FormGroup>
                  <TextField
                    disabled={!apiAlive}
                    sx={{ mb: 1 }}
                    placeholder={placeholder}
                    value={link}
                    onChange={(event) => {
                      setValidationError("");
                      setLink(event.target.value);
                    }}
                    onFocus={copyFromClipboard}
                    onKeyDown={handleKeyDown}
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
              <Divider sx={{ my: "10px" }}>
                <Chip color="primary" label="OR" />
              </Divider>
              {apiAlive ? (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <DNDComponent
                    className={classes.fileUpload}
                    apiAlive={apiAlive}
                    className1={classes.typography}
                    name={name}
                  />
                </div>
              ) : (
                <DNDComponent
                  className={classes.fileUpload}
                  apiAlive={apiAlive}
                  className1={classes.typography}
                />
              )}
              <LoadingButton
                type="submit"
                variant="outlined"
                color="inherit"
                size={"large"}
                className={classes.button}
                disabled={!link && !torrent}
                onClick={onSubmit}
                loading={loading}
              >
                Start Transfer
              </LoadingButton>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default TorrentsInput;
