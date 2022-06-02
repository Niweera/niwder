import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { NavLink, useSearchParams } from "react-router-dom";
import useEnableFCM from "../../helpers/useEnableFCM";
import {
  authorizeGoogle,
  clearAuthorizingMessages,
  revokeGoogle,
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import ConfirmationDialog from "../../helpers/ConfirmationDialog";
import Message from "../../helpers/Notification";
import { faM } from "@fortawesome/free-solid-svg-icons/faM";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons/faGoogleDrive";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "@mui/material/Box";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import {
  DIRECT_TO_GDRIVE_ROUTE,
  DIRECT_TO_MEGA_ROUTE,
  GDRIVE_TO_DIRECT_ROUTE,
  GDRIVE_TO_MEGA_ROUTE,
  MEGA_TO_DIRECT_ROUTE,
  MEGA_TO_GDRIVE_ROUTE,
  TORRENTS_TO_DIRECT_ROUTE,
  TORRENTS_TO_GDRIVE_ROUTE,
  TORRENTS_TO_MEGA_ROUTE,
} from "../../config/Constants";
import { faMagnet } from "@fortawesome/free-solid-svg-icons/faMagnet";
import changeColor from "../../helpers/changeColor";

const Transfers = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);

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
    linkText: {
      textDecoration: `none`,
      color: theme.palette.text.disabled,
    },
    linkTextActive: {
      textDecoration: `none`,
      color: theme.palette.text.primary,
    },
    linkDisabled: {
      textDecoration: `none`,
      cursor: "not-allowed",
      color: theme.palette.text.primary,
    },
    box: {
      display: "flex",
      alignItems: "center",
    },
  }))();

  useEnableFCM();

  const loading = useSelector(
    ({
      userData: {
        authorizing: { loading },
      },
    }) => loading
  );

  const googleAuthorized = useSelector(
    ({
      firebase: {
        profile: { google },
      },
    }) => google
  );

  useEffect(() => () => clearAuthorizingMessages()(dispatch), [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveAuth = () => {
    setOpen(true);
  };

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setError(error);
      setErrorOpen(true);
    }
  }, [searchParams]);

  const onErrorNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
    setSearchParams();
  };

  const handleNavigation = (e) => {
    if (!googleAuthorized) e.preventDefault();
  };

  return (
    <div className="container">
      {error && (
        <Message
          severity={"error"}
          onClose={onErrorNotificationClose}
          message={"Google Drive API authentication failed"}
          open={errorOpen}
          autoHideDuration={2000}
        />
      )}
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "40vh" }}
      >
        <Grid item sx={{ textAlign: "center", minWidth: "50vw", mb: "20px" }}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                variant="h5"
                className={classes.typography}
                sx={{ marginBottom: "10px" }}
              >
                {googleAuthorized
                  ? "Google Drive Authorized"
                  : "Authorize Google Drive"}
              </Typography>
              <ConfirmationDialog
                id="google-remove-auth"
                keepMounted
                open={open}
                onClose={handleClose}
                primaryMessage={"Revoking Google Drive API Access"}
                secondaryMessage={
                  "You are going to revoke the authorization for Google Drive API. This will suspend all queued transfers for Google Drive."
                }
                action={() => revokeGoogle()(firebase, dispatch)}
              />
              <ButtonGroup
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="contained"
              >
                {googleAuthorized ? (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleRemoveAuth}
                  >
                    {loading
                      ? "Revoking Authorization"
                      : "Revoke Authorization"}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => authorizeGoogle()(firebase, dispatch)}
                  >
                    {loading ? "Authorizing" : "Authorize"}
                  </Button>
                )}
              </ButtonGroup>
            </CardContent>
          </Card>
        </Grid>

        <Grid item sx={{ textAlign: "center", minWidth: "50vw" }}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                variant="h5"
                className={classes.typography}
                sx={{ marginBottom: "10px" }}
              >
                Niwder.io supports the following transfers
              </Typography>
              <ButtonGroup
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="contained"
              >
                <NavLink
                  onClick={handleNavigation}
                  to={MEGA_TO_GDRIVE_ROUTE}
                  className={
                    googleAuthorized
                      ? classes.linkTextActive
                      : classes.linkDisabled
                  }
                >
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={!googleAuthorized}
                    startIcon={
                      <Box className={classes.box} component="span">
                        <FontAwesomeIcon icon={faM} size="xs" color="#d9272e" />
                        <ArrowRightAltIcon />
                        <FontAwesomeIcon
                          icon={faGoogleDrive}
                          size="xs"
                          color={changeColor()}
                        />
                      </Box>
                    }
                  >
                    Transfer from Mega.nz to Google Drive
                  </Button>
                </NavLink>

                <NavLink
                  onClick={handleNavigation}
                  to={GDRIVE_TO_MEGA_ROUTE}
                  className={
                    googleAuthorized
                      ? classes.linkTextActive
                      : classes.linkDisabled
                  }
                >
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={!googleAuthorized}
                    startIcon={
                      <Box className={classes.box} component="span">
                        <FontAwesomeIcon
                          icon={faGoogleDrive}
                          size="xs"
                          color={changeColor()}
                        />
                        <ArrowRightAltIcon />
                        <FontAwesomeIcon icon={faM} size="xs" color="#d9272e" />
                      </Box>
                    }
                  >
                    Transfer from Google Drive to Mega.nz
                  </Button>
                </NavLink>

                <NavLink
                  onClick={handleNavigation}
                  to={DIRECT_TO_GDRIVE_ROUTE}
                  className={
                    googleAuthorized
                      ? classes.linkTextActive
                      : classes.linkDisabled
                  }
                >
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={!googleAuthorized}
                    startIcon={
                      <Box className={classes.box} component="span">
                        <FontAwesomeIcon icon={faLink} size="xs" />{" "}
                        <ArrowRightAltIcon />
                        <FontAwesomeIcon
                          icon={faGoogleDrive}
                          size="xs"
                          color={changeColor()}
                        />
                      </Box>
                    }
                  >
                    Transfer from Direct Link to Google Drive
                  </Button>
                </NavLink>

                <NavLink
                  to={DIRECT_TO_MEGA_ROUTE}
                  className={classes.linkTextActive}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={
                      <Box className={classes.box} component="span">
                        <FontAwesomeIcon icon={faLink} size="xs" />{" "}
                        <ArrowRightAltIcon />
                        <FontAwesomeIcon icon={faM} size="xs" color="#d9272e" />
                      </Box>
                    }
                  >
                    Transfer from Direct Link to Mega.nz
                  </Button>
                </NavLink>

                <NavLink
                  onClick={handleNavigation}
                  to={GDRIVE_TO_DIRECT_ROUTE}
                  className={
                    googleAuthorized
                      ? classes.linkTextActive
                      : classes.linkDisabled
                  }
                >
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={!googleAuthorized}
                    startIcon={
                      <Box className={classes.box} component="span">
                        <FontAwesomeIcon
                          icon={faGoogleDrive}
                          size="xs"
                          color={changeColor()}
                        />{" "}
                        <ArrowRightAltIcon />
                        <FontAwesomeIcon icon={faLink} size="xs" />
                      </Box>
                    }
                  >
                    Transfer from Google Drive to Direct Link
                  </Button>
                </NavLink>

                <NavLink
                  to={MEGA_TO_DIRECT_ROUTE}
                  className={classes.linkTextActive}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={
                      <Box className={classes.box} component="span">
                        <FontAwesomeIcon icon={faM} size="xs" color="#d9272e" />{" "}
                        <ArrowRightAltIcon />
                        <FontAwesomeIcon icon={faLink} size="xs" />
                      </Box>
                    }
                  >
                    Transfer from Mega.nz to Direct Link
                  </Button>
                </NavLink>

                <NavLink
                  onClick={handleNavigation}
                  to={TORRENTS_TO_GDRIVE_ROUTE}
                  className={
                    googleAuthorized
                      ? classes.linkTextActive
                      : classes.linkDisabled
                  }
                >
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={!googleAuthorized}
                    startIcon={
                      <Box className={classes.box} component="span">
                        <FontAwesomeIcon
                          icon={faMagnet}
                          size="xs"
                          color="#ffeeb4"
                        />{" "}
                        <ArrowRightAltIcon />
                        <FontAwesomeIcon
                          icon={faGoogleDrive}
                          size="xs"
                          color={changeColor()}
                        />
                      </Box>
                    }
                  >
                    Transfer from Torrents to Google Drive
                  </Button>
                </NavLink>

                <NavLink
                  to={TORRENTS_TO_MEGA_ROUTE}
                  className={classes.linkTextActive}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={
                      <Box className={classes.box} component="span">
                        <FontAwesomeIcon
                          icon={faMagnet}
                          size="xs"
                          color="#ffeeb4"
                        />{" "}
                        <ArrowRightAltIcon />
                        <FontAwesomeIcon icon={faM} size="xs" color="#d9272e" />
                      </Box>
                    }
                  >
                    Transfer from Torrents to Mega.nz
                  </Button>
                </NavLink>

                <NavLink
                  to={TORRENTS_TO_DIRECT_ROUTE}
                  className={classes.linkTextActive}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={
                      <Box className={classes.box} component="span">
                        <FontAwesomeIcon
                          icon={faMagnet}
                          size="xs"
                          color="#ffeeb4"
                        />{" "}
                        <ArrowRightAltIcon />
                        <FontAwesomeIcon icon={faLink} size="xs" />
                      </Box>
                    }
                  >
                    Transfer from Torrents to Direct Link
                  </Button>
                </NavLink>
              </ButtonGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Transfers;
