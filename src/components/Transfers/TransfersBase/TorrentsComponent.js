import React from "react";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import prettyBytes from "pretty-bytes";
import prettyMilliseconds from "pretty-ms";

/**
 *
 * @param {object} torrentsData
 * @returns {JSX.Element}
 * @constructor
 */
const TorrentsComponent = ({
  torrentsData: {
    message,
    percentage,
    timeRemaining,
    numPeers,
    downloadSpeed,
    uploadSpeed,
    length,
    downloaded,
    uploaded,
    btPeers,
    btSeeders,
    wtPeers,
    wtSeeders,
  },
}) => (
  <Box sx={{ maxWidth: "40vw" }}>
    <Grid container direction="row" rowSpacing={1} columnSpacing={0}>
      <Grid item lg={12}>
        <Typography component="span" variant="body2" color="text.primary">
          {message}
        </Typography>
      </Grid>
      <Grid item lg={12}>
        {Boolean(percentage) && (
          <Box component="span">
            <LinearProgress
              variant="buffer"
              value={percentage}
              valueBuffer={percentage}
              color="inherit"
              sx={{
                my: "10px",
              }}
            />
          </Box>
        )}
      </Grid>
      <Grid item lg={6}>
        <Typography component="span" variant="body2" color="text.primary">
          Download Speed: {prettyBytes(downloadSpeed)}/s
        </Typography>
      </Grid>
      <Grid item lg={6}>
        <Typography component="span" variant="body2" color="text.primary">
          Upload Speed: {prettyBytes(uploadSpeed)}/s
        </Typography>
      </Grid>
      <Grid item lg={6}>
        <Typography component="span" variant="body2" color="text.primary">
          Downloaded: {prettyBytes(downloaded)}
        </Typography>
      </Grid>
      <Grid item lg={6}>
        <Typography component="span" variant="body2" color="text.primary">
          Uploaded: {prettyBytes(uploaded)}
        </Typography>
      </Grid>
      <Grid item lg={6}>
        <Typography component="span" variant="body2" color="text.primary">
          Peers: {numPeers}
        </Typography>
      </Grid>
      <Grid item lg={6}>
        <Typography component="span" variant="body2" color="text.primary">
          Torrent Size: {prettyBytes(length)}
        </Typography>
      </Grid>
      <Grid item lg={12}>
        <Typography component="span" variant="body2" color="text.primary">
          Time Remaining: {prettyMilliseconds(timeRemaining, { verbose: true })}
        </Typography>
      </Grid>
      <Grid item lg={6}>
        <Typography component="span" variant="body2" color="text.primary">
          Bittorrent Peers: {btPeers}
        </Typography>
      </Grid>
      <Grid item lg={6}>
        <Typography component="span" variant="body2" color="text.primary">
          Bittorrent Seeders: {btSeeders}
        </Typography>
      </Grid>
      <Grid item lg={6}>
        <Typography component="span" variant="body2" color="text.primary">
          WebTorrent Peers: {wtPeers}
        </Typography>
      </Grid>
      <Grid item lg={6}>
        <Typography component="span" variant="body2" color="text.primary">
          WebTorrent Seeders: {wtSeeders}
        </Typography>
      </Grid>
    </Grid>
  </Box>
);

export default TorrentsComponent;
