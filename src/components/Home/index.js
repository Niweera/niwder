import React, { useEffect, useState } from "react";
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
import { logoGenerator } from "../../config/Constants";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons/faGoogleDrive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faM } from "@fortawesome/free-solid-svg-icons/faM";
import { faMagnet } from "@fortawesome/free-solid-svg-icons/faMagnet";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import changeColor from "../../helpers/changeColor";

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
    background: "rgba(200, 200, 200, 0.05)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(2.1px)",
  },
  glassTwo: {
    background: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(24px)",
  },
  glassThree: {
    background: "rgba(0, 0, 0, 1)",
    backdropFilter: "blur(24px)",
  },
  typo: {
    flexGrow: 1,
    textAlign: "center",
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [startIndex, setStartIndex] = useState(
    Math.floor((Math.random() * 1000000) % 1000)
  );
  const [image, setImage] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageThree, setImageThree] = useState("");
  const [imageLoad, setImageLoad] = useState(false);
  const [imageLoadTwo, setImageLoadTwo] = useState(false);
  const [imageLoadThree, setImageLoadThree] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setStartIndex(Math.floor((Math.random() * 1000000) % 1000));
    }, 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setImage(logoGenerator(startIndex));
    setImageTwo(logoGenerator((startIndex + 1) % 1000));
    setImageThree(logoGenerator((startIndex + 2) % 1000));
  }, [startIndex]);

  return (
    <div className={`container ${classes.root}`}>
      <Grid container>
        <Grid item>
          <Card elevation={0} className={classes.cardPaper}>
            {!imageLoad && (
              <CardMedia component="img" image={Logo} alt="Niwder.io" />
            )}
            <CardMedia
              component="img"
              image={Boolean(image) ? image : Logo}
              alt="Niwder.io"
              onLoad={() => setImageLoad(true)}
            />
            {!imageLoadTwo && (
              <CardMedia component="img" image={LogoTwo} alt="Niwder.io" />
            )}
            <CardMedia
              component="img"
              image={Boolean(imageTwo) ? imageTwo : LogoTwo}
              alt="Niwder.io"
              onLoad={() => setImageLoadTwo(true)}
            />
            {!imageLoadThree && (
              <CardMedia component="img" image={LogoThree} alt="Niwder.io" />
            )}
            <CardMedia
              component="img"
              image={Boolean(imageThree) ? imageThree : LogoThree}
              alt="Niwder.io"
              onLoad={() => setImageLoadThree(true)}
            />
            <CardContent sx={{ padding: "30px" }} className={classes.glassTwo}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                mb={14}
                mt={6}
              >
                <Grid item lg={12} sx={{ mt: "30px", mb: "30px" }}>
                  <Typography variant="h4" component="div">
                    Transfers on the Cloud
                  </Typography>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={4}
                >
                  <Grid item lg={1} />
                  <Grid item lg={2}>
                    <Card elevation={10} className={classes.glassThree}>
                      <CardContent className={classes.glassThree}>
                        <Typography
                          variant="h5"
                          component="div"
                          className={classes.typo}
                        >
                          <FontAwesomeIcon
                            icon={faGoogleDrive}
                            size="6x"
                            color={changeColor()}
                          />
                        </Typography>
                      </CardContent>
                      <CardContent
                        className={classes.glassThree}
                        sx={{ height: "80px", display: "flex" }}
                      >
                        <Typography
                          variant="h5"
                          component="div"
                          className={classes.typo}
                          sx={{
                            alignItems: "flex-end",
                          }}
                        >
                          Google Drive
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item lg={2}>
                    <Card elevation={10} className={classes.glassThree}>
                      <CardContent className={classes.glassThree}>
                        <Typography
                          variant="h5"
                          component="div"
                          className={classes.typo}
                        >
                          <FontAwesomeIcon icon={faLink} size="6x" />
                        </Typography>
                      </CardContent>
                      <CardContent
                        className={classes.glassThree}
                        sx={{ height: "80px", display: "flex" }}
                      >
                        <Typography
                          variant="h5"
                          component="div"
                          className={classes.typo}
                          sx={{
                            alignItems: "flex-end",
                          }}
                        >
                          Direct Links
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item lg={2}>
                    <Card elevation={10} className={classes.glassThree}>
                      <CardContent className={classes.glassThree}>
                        <Typography
                          variant="h5"
                          component="div"
                          className={classes.typo}
                          sx={{ color: "#0747a6" }}
                        >
                          <FontAwesomeIcon
                            icon={faM}
                            size="6x"
                            color="#d9272e"
                          />
                        </Typography>
                      </CardContent>
                      <CardContent
                        className={classes.glassThree}
                        sx={{ height: "80px", display: "flex" }}
                      >
                        <Typography
                          variant="h5"
                          component="div"
                          className={classes.typo}
                          sx={{
                            alignItems: "flex-end",
                          }}
                        >
                          Mega.nz
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item lg={2}>
                    <Card elevation={10} className={classes.glassThree}>
                      <CardContent className={classes.glassThree}>
                        <Typography
                          variant="h5"
                          component="div"
                          className={classes.typo}
                          sx={{ color: "#0747a6" }}
                        >
                          <FontAwesomeIcon
                            icon={faMagnet}
                            size="6x"
                            color="#ffeeb4"
                          />
                        </Typography>
                      </CardContent>
                      <CardContent
                        className={classes.glassThree}
                        sx={{ height: "80px", display: "flex" }}
                      >
                        <Typography
                          variant="h5"
                          component="div"
                          className={classes.typo}
                          sx={{
                            alignItems: "flex-end",
                          }}
                        >
                          Torrents
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item lg={1} />
                </Grid>
              </Grid>
            </CardContent>

            <CardContent
              sx={{
                padding: "30px",
                background: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(24px)",
                textAlign: "center",
                py: 10,
                px: 15,
              }}
            >
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
            </CardContent>

            <CardContent
              sx={{
                padding: "30px",
                background: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(24px)",
                textAlign: "center",
                py: 10,
                px: 20,
              }}
            >
              <Typography
                variant="h4"
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
                Niwder.io first downloads the file(s) specified by the user (the
                user provides the download link) to the Niwder.io ephemeral
                server and uploads the file(s) to the Google Drive using Google
                Drive API. After the file is uploaded, the file is deleted from
                the ephemeral server. For this feature to function, the user has
                to grant the permission to access Google Drive (the permission
                to see, edit, create, and delete all of the Google Drive files).
                Niwder.io does not view nor access any personal files on the
                user's Google Drive. Please read the{" "}
                <NavLink to={"/privacy-policy"} className={classes.linkText}>
                  Privacy Policy
                </NavLink>{" "}
                and{" "}
                <NavLink to={"/terms-of-service"} className={classes.linkText}>
                  Terms of Service
                </NavLink>{" "}
                of Niwder.io before using the service.
              </Typography>
            </CardContent>

            <CardContent
              sx={{
                padding: "30px",
                background: "rgba(0, 0, 0, 1)",
                backdropFilter: "blur(24px)",
                textAlign: "center",
                px: 15,
              }}
            >
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
                for illustrations
              </Typography>
              <Typography
                variant="button"
                color="text.secondary"
                sx={{ mt: "5px" }}
              >
                {" "}
                and{" "}
                <Link
                  href="https://github.com/webtorrent/webtorrent"
                  underline={"hover"}
                  variant="button"
                  target="_blank"
                  color="text.primary"
                  rel="noopener noreferrer"
                >
                  WebTorrent
                </Link>{" "}
                for torrents transferring.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
