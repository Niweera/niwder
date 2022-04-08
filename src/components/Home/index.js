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
import Link from "@mui/material/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "-20px -24px -20px -24px",
  },
  typography: {
    flexGrow: 1,
    textAlign: "center",
  },
  cardPaper: {
    background: `radial-gradient(115.33% 258.13% at 1.39% -10.78%, #333333 0%, #000000 100%) !important`,
  },
  linkText: {
    color: theme.palette.text.primary,
  },
  glass: {
    background: "rgba(255, 255, 255, 0.05)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(2.1px)",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={`container ${classes.root}`}>
      <Grid container>
        <Grid item>
          <Card elevation={0} className={classes.cardPaper}>
            <CardMedia component="img" image={Logo} alt="Niwder.io" />
            <CardMedia component="img" image={LogoTwo} alt="Niwder.io" />
            <CardMedia component="img" image={LogoThree} alt="Niwder.io" />
            <CardContent sx={{ padding: "24px" }} className={classes.glass}>
              <Typography gutterBottom variant="h4" component="div">
                Niwder.io
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ mb: "10px" }}
              >
                Niwder.io is a platform to transfer Google Drive, Mega.nz links
                to desired destinations. Currently supports, Google Drive links
                to Mega.nz links, and vice-versa and converting direct links to
                Google Drive links and Mega.nz links. <br />
                <br />
                Remember; the future belongs to those who believe in the beauty
                of their dreams.
              </Typography>
              <Typography variant="h6" color="text.primary" sx={{ mt: "5px" }}>
                Niwder.io is open-source. Check it out on{" "}
                <Link
                  href="https://github.com/Niweera/niwder"
                  underline={"hover"}
                  variant="h6"
                  target="_blank"
                  color="white"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
                .
              </Typography>
              <Typography
                variant="button"
                color="text.primary"
                sx={{ mt: "5px" }}
              >
                This project uses{" "}
                <Link
                  href="https://undraw.co/"
                  underline={"hover"}
                  variant="button"
                  target="_blank"
                  color="white"
                  rel="noopener noreferrer"
                >
                  unDraw
                </Link>{" "}
                for illustrations.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
