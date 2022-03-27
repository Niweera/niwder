import React from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Logo from "../../helpers/cover.png";
import LogoTwo from "../../helpers/cover_2.png";
import LogoThree from "../../helpers/cover_3.png";

const useStyles = makeStyles((theme) => ({
  typography: {
    flexGrow: 1,
    textAlign: "center",
  },
  cardPaper: {
    backgroundColor: `${theme.palette.background.default} !important`,
  },
  linkText: {
    color: theme.palette.text.primary,
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className="container">
      <Grid container>
        <Grid item>
          <Card elevation={10} className={classes.cardPaper}>
            <CardMedia component="img" image={Logo} alt="Niwder.io" />
            <CardMedia component="img" image={LogoTwo} alt="Niwder.io" />
            <CardMedia component="img" image={LogoThree} alt="Niwder.io" />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                Niwder.io
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Niwder.io is a platform to convert Mega.nz links to Google Drive
                links. We will support other types of conversions in the future.
                Remember; the future belongs to those who believe in the beauty
                of their dreams.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
