import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { get } from "lodash";
import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import TransferredItem from "./TransferredItem";

/**
 * @param {object} classes
 * @param {string} dbPath
 * @param {string} toText
 * @param {IconDefinition} toIcon
 * @param {string} fromText
 * @param {IconDefinition} fromIcon
 * @param {JSX.Element} TransferredItem
 * @param {string} toLink
 * @param {string} fromLink
 * @returns {JSX.Element}
 * @constructor
 */
const TransferredComponent = ({
  classes,
  dbPath,
  toText,
  toIcon,
  fromText,
  fromIcon,
  toLink,
  fromLink,
}) => {
  const [transfers, setTransfers] = useState([]);
  const [transfersLoading, setTransfersLoading] = useState(null);

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
                {transfers.map((obj) => (
                  <TransferredItem
                    classes={classes}
                    data={obj}
                    dbPath={dbPath}
                    key={obj.key}
                    id={obj.key}
                    toText={toText}
                    toIcon={toIcon}
                    fromText={fromText}
                    fromIcon={fromIcon}
                    toLink={toLink}
                    fromLink={fromLink}
                  />
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TransferredComponent;
