import React from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import CircleIcon from "@mui/icons-material/Circle";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "-20px -24px -20px -24px",
  },
  typography: {
    flexGrow: 1,
    textAlign: "center",
  },
  cardPaper: {
    padding: "18px",
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

const PrivacyPolicy = () => {
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
                Privacy Policy of Niwder.io
              </Typography>

              <Typography gutterBottom variant="h5" component="div">
                Niwder operates the niwder.niweera.gq website, which provides
                the SERVICE.
              </Typography>
              <br />
              <Typography gutterBottom variant="body1" component="div">
                This page is used to inform website visitors regarding the
                policies with the collection, use, and disclosure of Personal
                Information if anyone decided to use the SERVICE. The SERVICE
                does not collect any personal data nor it uses any cookies to
                provide necessary functionalities.
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                If the USER choose to use the SERVICE, then the USER agrees to
                the terms mentioned in this policy. There will be no personal
                information collection in this platform and the source code of
                this platform is open-source and hosted on GitHub as{" "}
                <Link
                  href="https://github.com/Niweera/niwder"
                  underline={"hover"}
                  variant="body1"
                  target="_blank"
                  color="white"
                  rel="noopener noreferrer"
                >
                  Niwder-UI
                </Link>{" "}
                and{" "}
                <Link
                  href="https://github.com/Niweera/niwder-api"
                  underline={"hover"}
                  variant="body1"
                  target="_blank"
                  color="white"
                  rel="noopener noreferrer"
                >
                  Niwder-API
                </Link>
                .
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                The terms used in this Privacy Policy have the same meaning as
                in the Terms of Service, which is accessible at
                niwder.niweera.gq, unless otherwise defined in this Privacy
                Policy.
              </Typography>
              <br />
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CircleIcon fontSize="small" sx={{ mr: "5px" }} /> Information
                Collection and Use
              </Typography>
              <br />
              <Typography gutterBottom variant="subtitle1" component="div">
                The SERVICE will,
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                1. Create, modify permission folders in the USER's Google Drive{" "}
                <br />
                2. Showing, upload, copy, update, and delete files in the USER's
                Google Drive <br />
                3. Manage files and folders in the USER's Google Drive (limited
                to search, organize, and modify permissions and other metadata,
                such as the name of the folder or file)
              </Typography>
              <br />
              <Typography gutterBottom variant="body1" component="div">
                The SERVICE will access the USER's Google Drive account to
                upload the files or folders. First, the SERVICE will create a
                folder named 'Niwder' on the Google Drive and the files and
                folders will be uploaded to that folder. The uploaded files or
                folders will be available to be shared with other users via the
                shared link which will be obtained using changing the
                permissions via Google Drive API.
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                The SERVICE will NOT access nor modify any existing files in the
                USER's Google Drive.
              </Typography>
              <br />
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CircleIcon fontSize="small" sx={{ mr: "5px" }} /> Application
                Access and Uses
              </Typography>
              <br />
              <Typography gutterBottom variant="body1" component="div">
                The SERVICE provides a platform for transferring files on the
                cloud. For an example, if the USER needs to transfer a
                application binary (
                <Link
                  href="https://github.com/chromium/chromium/archive/refs/tags/102.0.4993.1.zip"
                  underline={"hover"}
                  variant="body1"
                  target="_blank"
                  color="white"
                  rel="noopener noreferrer"
                >
                  https://github.com/chromium/chromium/archive/refs/tags/102.0.4993.1.zip
                </Link>
                ) to their Google Drive. The USER has to download this file to
                their device and upload it to the Google Drive. Niwder.io
                platform removes this middle step and directly transfers the
                specified file to the Google Drive of the USER.
              </Typography>
              <br />
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CircleIcon fontSize="small" sx={{ mr: "5px" }} /> Security
              </Typography>
              <br />
              <Typography gutterBottom variant="body1" component="div">
                The SERVICE uses https for transporting security and uses{" "}
                <Link
                  href="https://firebase.google.com/docs/auth"
                  underline={"hover"}
                  variant="body1"
                  target="_blank"
                  color="white"
                  rel="noopener noreferrer"
                >
                  Google Firebase Authentication
                </Link>{" "}
                for securing the access to the protected data stored in
                databases. The SERVICE implements industry best practices in
                storing, retrieving and manipulating sensitive data.
              </Typography>
              <br />
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CircleIcon fontSize="small" sx={{ mr: "5px" }} /> Links to
                Other Sites
              </Typography>
              <br />
              <Typography gutterBottom variant="body1" component="div">
                The Niwder.io platform may contain links to other sites and
                services. If the USER clicks on a third-party link, the USER
                will be redirected to the site or resource. Note that these
                external sites are not operated by the SERVICE. Hence, the
                SERVICE strongly suggest the USER to review their Privacy
                Policies from the respective web-sites. The SERVICE have no
                control over, and assume no responsibility for the content,
                Privacy Policies, or practices of any third- party sites or
                services.
              </Typography>
              <br />
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CircleIcon fontSize="small" sx={{ mr: "5px" }} /> Changes to
                This Privacy Policy
              </Typography>
              <br />
              <Typography gutterBottom variant="body1" component="div">
                The SERVICE may update its Privacy Policy from periodically.
                Hence, the SERVICE advise the USER to review this page
                periodically for any updates. The SERVICE will notify the USER
                of any changes by posting the new Privacy Policy on this page.
                These changes are effective immediately, after they are posted
                on this page.
              </Typography>
              <br />
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CircleIcon fontSize="small" sx={{ mr: "5px" }} /> Contact Us
              </Typography>
              <br />
              <Typography gutterBottom variant="body1" component="div">
                If the USER have any questions or suggestions about our Privacy
                Policy, do not hesitate to contact us via email:
                w[dot]nipuna[at]gmail[dot]com or create an issue on{" "}
                <Link
                  href="https://github.com/Niweera/niwder"
                  underline={"hover"}
                  variant="body1"
                  target="_blank"
                  color="white"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
                .
              </Typography>
              <br />
              <Typography gutterBottom variant="subtitle1" component="div">
                The SERVICE uses functionality of Google services. Please read
                the{" "}
                <Link
                  href="https://policies.google.com/privacy"
                  underline={"hover"}
                  variant="body1"
                  target="_blank"
                  color="white"
                  rel="noopener noreferrer"
                >
                  Privacy Policy of Google
                </Link>
                .
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default PrivacyPolicy;
