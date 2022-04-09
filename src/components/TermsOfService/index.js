import React from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "-20px -24px -20px -24px",
  },
  typography: {
    flexGrow: 1,
    textAlign: "center",
  },
  cardPaper: {
    padding: "20px",
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

const TermsOfService = () => {
  const classes = useStyles();

  return (
    <div className={`container`}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Card elevation={10} className={classes.cardPaper}>
            <CardContent sx={{ padding: "24px" }} className={classes.glass}>
              <Typography gutterBottom variant="h4" component="div">
                Terms of Service of Niwder.io
              </Typography>

              <Typography gutterBottom variant="h5" component="div">
                Niwder operates the niwder.niweera.gq website, which provides
                the SERVICE.
              </Typography>
              <br />
              <Typography gutterBottom variant="body1" component="div">
                The Niwder SERVICE Agreement describes the Terms of Service
                under which Niwder offers services to the USER. By using the
                SERVICE, the USER agrees to honor the following Terms of
                Service:
              </Typography>
              <br />
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                sx={{
                  paddingLeft: "10px",
                }}
              >
                1. The SERVICE reserves the right to suspend the SERVICE at any
                time.
              </Typography>
              <br />
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                sx={{
                  paddingLeft: "10px",
                }}
              >
                2. The USER must agree to comply with all applicable rules,
                including copyright and trademark laws. Images, videos and files
                that infringe copyrights or trademarks are not allowed. If a
                party has a violation claim against the USER, the USER will be
                prompted to delete the copyrighted file until the issue is
                resolved. If there is a dispute between the participants on this
                site, the SERVICE is not obliged to be involved.
              </Typography>
              <br />
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                sx={{
                  paddingLeft: "10px",
                }}
              >
                3. The SERVICE is not liable for the USER's images, videos or
                files or any lost valuables due to the unavailability or loss of
                the SERVICE. The SERVICE makes no claims of 100% SERVICE
                availability.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default TermsOfService;
