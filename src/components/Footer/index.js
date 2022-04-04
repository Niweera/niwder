import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  typography: {
    flexGrow: 1,
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  appBar: {
    height: "64px",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    background: `linear-gradient(90deg, rgba(0,0,0,1) 16%, rgba(59,58,48,1) 60%, rgba(56,55,51,1) 100%) !important`,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position={"static"}
        className={classes.appBar}
        color="default"
        sx={{ boxShadow: 25 }}
      >
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="body2" className={classes.typography}>
              Niwder.io &#169; {new Date().getFullYear()}{" "}
              {process.env.REACT_APP_VERSION}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Footer;
