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
import { NavLink } from "react-router-dom";

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
    "&:hover": {
      textDecoration: `underline`,
    },
    textDecoration: `none`,
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
            <CardContent sx={{ padding: "30px" }} className={classes.glass}>
              <Typography gutterBottom variant="h4" component="div">
                Niwder.io
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ mb: "10px" }}
              >
                Niwder.io is a platform which helps users to transfer files
                between storage providers on cloud. The users can transfer a
                file from the internet to their own Google Drive or they can
                transfer a Mega.nz file or folder to their own Google Drive. In
                addition, the users can also convert a Google Drive share link
                to a Mega.nz share link. Also, the user can convert a direct
                download link to a Mega.nz share link.
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: "10px" }}
              >
                How does Niwder.io work:
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mb: "10px" }}
              >
                Niwder.io first download the file specified by the user (the
                user provides the download link), then it downloads the file to
                the Niwder.io ephemeral server and uploads the files to the
                Google Drive using Google Drive API. After the file is uploaded,
                the file is deleted from the ephemeral server. For this feature
                to function, the user has to grant the permission to their
                Google Drive (the permission to see, edit, create, and delete
                all of the Google Drive files). Niwder.io does not view nor
                access any personal files on the user's Google Drive. Please
                read the{" "}
                <NavLink to={"/privacy-policy"} className={classes.linkText}>
                  Privacy Policy
                </NavLink>{" "}
                and{" "}
                <NavLink to={"/terms-of-service"} className={classes.linkText}>
                  Terms of Service
                </NavLink>{" "}
                of Niwder.io before using the service.
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ mb: "10px" }}
              >
                Remember; the future belongs to those who believe in the beauty
                of their dreams.
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mt: "5px" }}
              >
                Niwder.io is open-source. Check it out on{" "}
                <Link
                  href="https://github.com/Niweera/niwder"
                  underline={"hover"}
                  variant="h6"
                  target="_blank"
                  color="text.primary"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
                .
              </Typography>
              <Typography
                variant="button"
                color="text.secondary"
                sx={{ mt: "5px" }}
              >
                This project uses{" "}
                <Link
                  href="https://undraw.co/"
                  underline={"hover"}
                  variant="button"
                  target="_blank"
                  color="text.primary"
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
