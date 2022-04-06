import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../store/actions";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import Notification from "../../helpers/Notification";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFirebase } from "react-redux-firebase";

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
        style={{ minHeight: "70vh" }}
      >
        <Grid item xs={10} style={{ textAlign: "center", marginTop: "50px" }}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                variant="h5"
                className={classes.typography}
                style={{ marginBottom: "10px" }}
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
              <LoadingButton
                type="submit"
                variant="outlined"
                color="inherit"
                size={"large"}
                className={classes.button}
                disabled={!username || !password}
                onClick={handleSignIn}
                loading={loading}
              >
                Sign In
              </LoadingButton>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
