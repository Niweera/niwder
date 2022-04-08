import React from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Logo from "../../helpers/undraw_taken_re_yn20.svg";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "-20px -24px -20px -24px",
  },
  linkText: {
    color: theme.palette.text.primary,
  },
  gridPaper: {
    background: `radial-gradient(115.33% 258.13% at 1.39% -10.78%, #333333 0%, #000000 100%) !important`,
  },
  cardPaper: {
    background: `radial-gradient(115.33% 258.13% at 1.39% -10.78%, #333333 0%, #000000 100%) !important`,
  },
  glass: {
    background: "rgba(255, 255, 255, 0.05)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(2.1px)",
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={`container ${classes.root}`}>
      <Grid
        container
        className={classes.gridPaper}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Card
            raised={true}
            variant="elevation"
            className={classes.cardPaper}
            square={true}
          >
            <CardMedia
              component="img"
              image={Logo}
              alt="Niwder.io"
              sx={{ height: "78.7vh" }}
            />
            <CardContent className={classes.cardContent}>
              <Typography
                variant="h6"
                component="div"
                color={"rgb(118,109,198)"}
              >
                This link has been zucced. 🙄
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
