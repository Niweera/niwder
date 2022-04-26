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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons/faSync";
import ListItemText from "@mui/material/ListItemText";
import CustomizedToolTip from "../../../helpers/CustomizedToolTip";
import { useFirebaseConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { get } from "lodash";
import Box from "@mui/material/Box";
import { common, red } from "@mui/material/colors";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

/**
 *
 * @param {object} classes
 * @param {function} torrentsComponent
 * @param {string} dbPath
 * @returns {JSX.Element}
 * @constructor
 */
const TorrentsTransferring = ({ classes, torrentsComponent, dbPath }) => {
  const [transferring, setTransferring] = useState([]);
  const [transferringLoading, setTransferringLoading] = useState(null);

  const uid = useSelector(
    ({
      firebase: {
        auth: { uid },
      },
    }) => uid
  );
  const requestingProp = useSelector(({ firebase: { requesting } }) =>
    get(requesting, `torrents/${uid}/${dbPath}`, null)
  );
  const requestedProp = useSelector(({ firebase: { requested } }) =>
    get(requested, `torrents/${uid}/${dbPath}`, null)
  );
  const orderedData = useSelector(({ firebase: { ordered } }) =>
    get(ordered, `torrents.${uid}.${dbPath}`, [])
  );

  useFirebaseConnect({
    path: `torrents/${uid}/${dbPath}`,
    type: "value",
    queryParams: ["orderByKey"],
  });

  useEffect(() => {
    if (requestingProp === true && requestedProp === false) {
      setTransferringLoading(true);
    } else if (requestingProp === false && requestedProp === true) {
      setTransferringLoading(false);
    } else {
      setTransferringLoading(false);
    }
  }, [requestingProp, requestedProp]);

  useEffect(() => {
    setTransferring((orderedData || []).reverse().map((obj) => obj.value));
  }, [orderedData]);

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
              Torrents transferring
            </Typography>

            {transferringLoading === true && (
              <Typography variant="h6">
                <Skeleton animation="wave" sx={{ bgcolor: "grey.900" }} />
              </Typography>
            )}

            {transferringLoading === false && transferring.length === 0 && (
              <>
                <Divider />
                <Typography
                  variant="h6"
                  className={classes.typography}
                  color="text.secondary"
                  sx={{ mt: "5px" }}
                >
                  No current transfers
                </Typography>
              </>
            )}

            {transferring.length > 0 && (
              <List
                sx={{
                  bgcolor: "background.paper",
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              >
                {transferring.map((obj, index) => (
                  <Box sx={{ flexGrow: 1 }} key={index}>
                    <ListItem alignItems="flex-start" className={classes.glass}>
                      <ListItemAvatar>
                        <Avatar>
                          <FontAwesomeIcon icon={faSync} color="white" spin />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        disableTypography
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
                        secondary={torrentsComponent(obj)}
                      />
                      <ListItemAvatar
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <CustomizedToolTip arrow placement="top" title="Remove">
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              bgcolor: common["black"],
                              cursor: "pointer",
                            }}
                            onClick={() => console.log("remove", obj.magnetURI)}
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
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TorrentsTransferring;
