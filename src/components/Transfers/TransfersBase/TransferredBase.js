import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import ListItemText from "@mui/material/ListItemText";
import CustomizedToolTip from "../../../helpers/CustomizedToolTip";
import { get } from "lodash";
import { useSelector } from "react-redux";
import { useFirebase, useFirebaseConnect } from "react-redux-firebase";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { red, common } from "@mui/material/colors";
import { removeTransferred } from "../../../store/actions";
import ConfirmationDialog from "../../../helpers/ConfirmationDialog";

/**
 *
 * @param {object} classes
 * @param {string} dbPath
 * @param {function} secondaryComponent
 * @returns {JSX.Element}
 * @constructor
 */
const TransferredBase = ({ classes, dbPath, secondaryComponent }) => {
  const [transfers, setTransfers] = useState([]);
  const [transfersLoading, setTransfersLoading] = useState(null);
  const [open, setOpen] = useState(false);

  const firebase = useFirebase();

  const uid = useSelector(
    ({
      firebase: {
        auth: { uid },
      },
    }) => uid
  );
  const orderedData = useSelector(({ firebase: { ordered } }) =>
    get(ordered, `transfers.${uid}.${dbPath}`, [])
  );
  const requestingProp = useSelector(({ firebase: { requesting } }) =>
    get(requesting, `transfers/${uid}/${dbPath}`, null)
  );
  const requestedProp = useSelector(({ firebase: { requested } }) =>
    get(requested, `transfers/${uid}/${dbPath}`, null)
  );

  useFirebaseConnect({
    path: `transfers/${uid}/${dbPath}`,
    type: "value",
    queryParams: ["orderByKey"],
  });

  useEffect(() => {
    setTransfers(
      (orderedData || [])
        .reverse()
        .map((obj) => ({ ...obj.value, key: obj.key }))
    );
  }, [orderedData]);

  useEffect(() => {
    if (requestingProp === true && requestedProp === false) {
      setTransfersLoading(true);
    } else if (requestingProp === false && requestedProp === true) {
      setTransfersLoading(false);
    } else {
      setTransfersLoading(false);
    }
  }, [requestingProp, requestedProp]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveTransferred = () => {
    setOpen(true);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ my: "20px" }}
    >
      <Grid item sx={{ textAlign: "center", minWidth: "50vw" }}>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              variant="h5"
              className={classes.typography}
              sx={{ marginBottom: "10px" }}
            >
              Completed transfers
            </Typography>

            {transfersLoading === true && (
              <Typography variant="h6">
                <Skeleton animation="wave" sx={{ bgcolor: "grey.900" }} />
              </Typography>
            )}

            {transfersLoading === false && transfers.length === 0 && (
              <>
                <Divider />
                <Typography
                  variant="h6"
                  className={classes.typography}
                  color="text.secondary"
                  sx={{ mt: "5px" }}
                >
                  No completed transfers
                </Typography>
              </>
            )}

            {transfers.length > 0 && (
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              >
                {transfers.map((obj, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start" className={classes.glass}>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon color="action" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <CustomizedToolTip
                            arrow
                            placement="top"
                            title={obj.name}
                          >
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
                              {obj.name}
                            </Typography>
                          </CustomizedToolTip>
                        }
                        secondary={secondaryComponent(obj)}
                      />
                      <ListItemAvatar
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <ConfirmationDialog
                          id="remove-completed-torrent"
                          keepMounted
                          open={open}
                          onClose={handleClose}
                          primaryMessage={"Removing Transferred Torrents"}
                          secondaryMessage={
                            "You are going to remove the transferred torrents. (No worries you can re-queue the transfer at any time)."
                          }
                          action={() =>
                            removeTransferred(dbPath, obj.key)(firebase)
                          }
                        />
                        <CustomizedToolTip arrow placement="top" title="Remove">
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              bgcolor: common["black"],
                              cursor: "pointer",
                            }}
                            onClick={handleRemoveTransferred}
                          >
                            <RemoveCircleIcon
                              sx={{ color: red["A700"] }}
                              fontSize="inherit"
                            />
                          </Avatar>
                        </CustomizedToolTip>
                      </ListItemAvatar>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TransferredBase;
