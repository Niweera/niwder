import React from "react";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons/faSync";
import ListItemText from "@mui/material/ListItemText";
import CustomizedToolTip from "../../../helpers/CustomizedToolTip";
import { get } from "lodash";

/**
 *
 * @param {object} data
 * @param {object} classes
 * @param {string} id
 * @returns {JSX.Element}
 * @constructor
 */
const TransferringItem = ({ data, classes, id }) => {
  return (
    <React.Fragment key={id}>
      <ListItem alignItems="flex-start" className={classes.glass}>
        <ListItemAvatar>
          <Avatar>
            <FontAwesomeIcon icon={faSync} color="white" spin />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <CustomizedToolTip arrow placement="top" title={data.name}>
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
                {data.name}
              </Typography>
            </CustomizedToolTip>
          }
          secondary={
            <React.Fragment key={id}>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {data.message}
              </Typography>
              <br />
              {Boolean(data.percentage) && (
                <Box sx={{ width: "100%" }} component="span">
                  <LinearProgress
                    variant="buffer"
                    value={data.percentage}
                    valueBuffer={data.percentage}
                    color="inherit"
                    sx={{
                      marginTop: "10px",
                    }}
                  />
                </Box>
              )}
            </React.Fragment>
          }
        />
      </ListItem>
    </React.Fragment>
  );
};

const areEqual = (prevProps, nextProps) =>
  get(prevProps, "data.key", "") === get(nextProps, "data.key", "") &&
  get(prevProps, "data.message", "") === get(nextProps, "data.message", "") &&
  get(prevProps, "data.name", "") === get(nextProps, "data.name", "") &&
  get(prevProps, "data.percentage", "") ===
    get(nextProps, "data.percentage", "");

export default React.memo(TransferringItem, areEqual);
