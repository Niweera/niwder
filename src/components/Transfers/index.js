import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { NavLink } from "react-router-dom";
import useEnableFCM from "../../helpers/useEnableFCM";

const Transfers = () => {
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
  }))();

  useEnableFCM();

  return (
    <div className="container">
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
                Niwder.io supports the following transfers
              </Typography>
              <ButtonGroup
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="contained"
              >
                <Button variant="contained" size="large">
                  <NavLink
                    to={"/transfers/mega-to-gdrive"}
                    className={({ isActive }) =>
                      isActive ? classes.linkTextActive : classes.linkText
                    }
                  >
                    Transfer from Mega.nz to Google Drive
                  </NavLink>
                </Button>
                <Button variant="contained" size="large">
                  <NavLink
                    to={"/transfers/gdrive-to-mega"}
                    className={({ isActive }) =>
                      isActive ? classes.linkTextActive : classes.linkText
                    }
                  >
                    Transfer from Google Drive to Mega.nz
                  </NavLink>
                </Button>
                <Button variant="contained" size="large">
                  <NavLink
                    to={"/transfers/direct-to-gdrive"}
                    className={({ isActive }) =>
                      isActive ? classes.linkTextActive : classes.linkText
                    }
                  >
                    Transfer from Direct Link to Google Drive
                  </NavLink>
                </Button>
              </ButtonGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Transfers;
