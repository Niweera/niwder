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

/**
 *
 * @param {object} classes
 * @param {function} transferringComponent
 * @param {string} dbPath
 * @returns {JSX.Element}
 * @constructor
 */
const TransferringBase = ({ classes, transferringComponent, dbPath }) => {
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
    get(requesting, `transferring/${uid}/${dbPath}`, null)
  );
  const requestedProp = useSelector(({ firebase: { requested } }) =>
    get(requested, `transferring/${uid}/${dbPath}`, null)
  );
  const orderedData = useSelector(({ firebase: { ordered } }) =>
    get(ordered, `transferring.${uid}.${dbPath}`, [])
  );

  useFirebaseConnect({
    path: `transferring/${uid}/${dbPath}`,
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
      sx={{ minHeight: "20vh" }}
    >
      <Grid item sx={{ textAlign: "center", minWidth: "50vw" }}>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              variant="h5"
              className={classes.typography}
              sx={{ marginBottom: "10px" }}
            >
              Now transferring
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
                  width: "100%",
                  bgcolor: "background.paper",
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              >
                <Divider />
                {transferring.map((obj, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start" className={classes.glass}>
                      <ListItemAvatar>
                        <Avatar>
                          <FontAwesomeIcon icon={faSync} color="white" spin />
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
                        secondary={transferringComponent(obj)}
                      />
                    </ListItem>
                    <Divider />
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

export default TransferringBase;
