import React from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  typography: {
    flexGrow: 1,
    textAlign: "center",
  },
  linkText: {
    color: theme.palette.text.primary,
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className="container">
      <Typography variant="h5" color="inherit" className={classes.typography}>
        Are you sure this is the page you requested?
      </Typography>
      <Typography variant="h6" color="inherit" className={classes.typography}>
        We can't find it from our side! 🤷‍♀️
      </Typography>
    </div>
  );
};

export default NotFound;
