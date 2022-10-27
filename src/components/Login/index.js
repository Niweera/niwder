import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signInWithProviderID } from "../../store/actions";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import Notification from "../../helpers/Notification";
import Button from "@mui/lab/LoadingButton";
import { useFirebase } from "react-redux-firebase";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import ButtonGroup from "@mui/material/ButtonGroup";

const Login = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);

  const error = useSelector(({ userData: { error } }) => error);
  const loading = useSelector(({ userData: { loading } }) => loading);

  const onErrorNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  useEffect(() => {
    if (error) {
      setErrorOpen(true);
    }
  }, [error]);

  const classes = makeStyles((theme) => ({
    root: {
      minWidth: 350,
    },
    title: {
      fontSize: 15,
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
    buttonGrouped: {
      width: "150px",
    },
  }))();

  const handleSignIn = () => {
    if (!username || !password) return;
    signIn(username, password)(firebase, dispatch);
  };

  const handleKeyDown = async (e) => {
    if (e.keyCode === 13) {
      await handleSignIn();
    }
  };

  return (
    <div className="container">
      {error && (
        <Notification
          severity={"error"}
          onClose={onErrorNotificationClose}
          message={error}
          open={errorOpen}
          autoHideDuration={60000}
        />
      )}
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "70vh" }}
      >
        <Grid item xs={10} sx={{ textAlign: "center", marginTop: "50px" }}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                variant="h5"
                className={classes.typography}
                sx={{ marginBottom: "10px" }}
              >
                Sign in to continue!
              </Typography>
              <Box component="form" noValidate autoComplete="off">
                <FormGroup>
                  <OutlinedInput
                    sx={{ mb: 1 }}
                    type="text"
                    autoFocus
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />

                  <OutlinedInput
                    sx={{ mb: 1 }}
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onKeyDown={handleKeyDown}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </FormGroup>
              </Box>
              <ButtonGroup
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="contained"
              >
                <Button
                  type="submit"
                  className={classes.buttonGrouped}
                  variant="contained"
                  size={"large"}
                  disabled={!username || !password}
                  onClick={handleSignIn}
                  loading={loading}
                >
                  Sign In
                </Button>
              </ButtonGroup>
            </CardContent>
            <Divider>
              <Chip color="primary" label="OR" />
            </Divider>
            <CardContent>
              <Typography
                variant="h5"
                className={classes.typography}
                sx={{ marginBottom: "10px" }}
              >
                Sign in using socials!
              </Typography>
              <ButtonGroup
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="contained"
              >
                <Button
                  variant="contained"
                  size={"large"}
                  onClick={() =>
                    signInWithProviderID("google")(firebase, dispatch)
                  }
                  loading={loading}
                  startIcon={<GoogleIcon />}
                  className={classes.buttonGrouped}
                >
                  Google
                </Button>
                <Button
                  className={classes.buttonGrouped}
                  variant="contained"
                  size={"large"}
                  onClick={() =>
                    signInWithProviderID("github")(firebase, dispatch)
                  }
                  loading={loading}
                  startIcon={<GitHubIcon />}
                >
                  GitHub
                </Button>
                <Button
                  className={classes.buttonGrouped}
                  variant="contained"
                  size={"large"}
                  onClick={() =>
                    signInWithProviderID("twitter")(firebase, dispatch)
                  }
                  loading={loading}
                  startIcon={<TwitterIcon />}
                >
                  Twitter
                </Button>
              </ButtonGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
