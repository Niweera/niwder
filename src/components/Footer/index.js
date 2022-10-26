import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { NavLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  typography: {
    flexGrow: 1,
    textAlign: "center",
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  appBar: {
    height: "64px",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    background: `linear-gradient(90deg, rgba(0,0,0,1) 16%, rgba(59,58,48,1) 60%, rgba(56,55,51,1) 100%) !important`,
  },
  linkText: {
    textDecoration: `none`,
    color: theme.palette.text.disabled,
    marginLeft: "10px",
  },
  linkTextActive: {
    textDecoration: `none`,
    color: theme.palette.text.primary,
    marginLeft: "10px",
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
            <Typography
              variant="body2"
              className={classes.typography}
              component="div"
            >
              Niwder.io &#169; {new Date().getFullYear()}{" "}
              {process.env.REACT_APP_VERSION}{" "}
              <NavLink
                to={"/privacy-policy"}
                className={({ isActive }) =>
                  isActive ? classes.linkTextActive : classes.linkText
                }
              >
                Privacy Policy
              </NavLink>{" "}
              <NavLink
                to={"/terms-of-service"}
                className={({ isActive }) =>
                  isActive ? classes.linkTextActive : classes.linkText
                }
              >
                Terms of Service
              </NavLink>
              <Link
                href={"https://github.com/Niweera/niwder"}
                underline={"hover"}
                target="_blank"
                color="white"
                rel="noopener noreferrer"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <GitHubIcon fontSize="small" sx={{ ml: "10px" }} />
              </Link>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Footer;
