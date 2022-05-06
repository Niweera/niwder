import React, { useCallback, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons/faSync";
import ListItemText from "@mui/material/ListItemText";
import CustomizedToolTip from "../../../helpers/CustomizedToolTip";
import Typography from "@mui/material/Typography";
import ConfirmationDialog from "../../../helpers/ConfirmationDialog";
import { removeTorrents } from "../../../store/actions";
import { common, red } from "@mui/material/colors";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Box from "@mui/material/Box";
import { useFirebase } from "react-redux-firebase";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import prettyBytes from "pretty-bytes";
import prettyMilliseconds from "pretty-ms";

const TorrentingItem = ({ data, classes, id, dbPath }) => {
  const {
    name,
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
    btTrackers,
    wtPeers,
    wtSeeders,
    wtTrackers,
  } = data;
  const firebase = useFirebase();
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleRemoveTorrents = useCallback(() => {
    setOpen(true);
  }, []);

  const onRemoveTorrents = useCallback(
    () => removeTorrents(dbPath, id)(firebase),
    [dbPath, id, firebase]
  );

  return (
    <Box sx={{ flexGrow: 1 }} key={id}>
      <ListItem alignItems="flex-start" className={classes.glass}>
        <ListItemAvatar>
          <Avatar>
            <FontAwesomeIcon icon={faSync} color="white" spin />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <CustomizedToolTip arrow placement="top" title={name}>
              <Typography
                sx={{
                  display: "inline-block",
                  maxWidth: "40vw",
                }}
                component="span"
                variant="h6"
                color="text.primary"
                noWrap
              >
                {name}
              </Typography>
            </CustomizedToolTip>
          }
          secondary={
            <Box sx={{ maxWidth: "40vw" }}>
              <Grid container direction="row" rowSpacing={1} columnSpacing={0}>
                <Grid item lg={12}>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
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
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Download Speed: {prettyBytes(downloadSpeed)}/s
                  </Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Upload Speed: {prettyBytes(uploadSpeed)}/s
                  </Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Downloaded: {prettyBytes(downloaded)}
                  </Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Uploaded: {prettyBytes(uploaded)}
                  </Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Peers: {numPeers}
                  </Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Torrent Size: {prettyBytes(length)}
                  </Typography>
                </Grid>
                <Grid item lg={12}>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Time Remaining:{" "}
                    {prettyMilliseconds(timeRemaining, { verbose: true })}
                  </Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Bittorrent Peers: {btPeers}
                  </Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    WebTorrent Peers: {wtPeers}
                  </Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Bittorrent Seeders: {btSeeders}
                  </Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    WebTorrent Seeders: {wtSeeders}
                  </Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Bittorrent Trackers: {btTrackers}
                  </Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    WebTorrent Trackers: {wtTrackers}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          }
        />
        <ListItemAvatar
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ConfirmationDialog
            id="remove-torrent"
            keepMounted
            open={open}
            onClose={handleClose}
            primaryMessage={"Removing Transferring Torrents"}
            secondaryMessage={
              "You are going to remove the current torrent transferring. This will stop the current transfer (but you can re-queue the transfer at any time)."
            }
            action={onRemoveTorrents}
          />
          <CustomizedToolTip arrow placement="top" title="Remove">
            <Avatar
              sx={{
                width: 24,
                height: 24,
                bgcolor: common["black"],
                cursor: "pointer",
              }}
              onClick={handleRemoveTorrents}
            >
              <RemoveCircleIcon
                sx={{ color: red["A700"] }}
                fontSize="inherit"
              />
            </Avatar>
          </CustomizedToolTip>
        </ListItemAvatar>
      </ListItem>
    </Box>
  );
};

export default React.memo(TorrentingItem);
