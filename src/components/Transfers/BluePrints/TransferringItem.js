import React, { useCallback, useState } from "react";
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
import ConfirmationDialog from "../../../helpers/ConfirmationDialog";
import { common, red } from "@mui/material/colors";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { interruptTransfer } from "../../../store/actions";
import { useFirebase } from "react-redux-firebase";

/**
 *
 * @param {object} data
 * @param {object} classes
 * @param {string} dbPath
 * @param {string} id
 * @returns {JSX.Element}
 * @constructor
 */
const TransferringItem = ({ data, classes, dbPath, id }) => {
  const [open, setOpen] = useState(false);
  const firebase = useFirebase();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onInterruptTransfer = useCallback(
    () => interruptTransfer(dbPath, id)(firebase),
    [firebase, dbPath, id]
  );

  const handleInterruptions = useCallback(() => {
    setOpen(true);
  }, []);

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
        <ListItemAvatar
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ConfirmationDialog
            id="interrupt-transfer"
            keepMounted
            open={open}
            onClose={handleClose}
            primaryMessage={"Interrupt transfer"}
            secondaryMessage={
              "Now you are going to interrupt the transferring job"
            }
            action={onInterruptTransfer}
          />
          <CustomizedToolTip arrow placement="top" title="Remove">
            <Avatar
              sx={{
                width: 24,
                height: 24,
                bgcolor: common["black"],
                cursor: "pointer",
              }}
              onClick={handleInterruptions}
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
  );
};

const areEqual = (prevProps, nextProps) =>
  get(prevProps, "data.key", "") === get(nextProps, "data.key", "") &&
  get(prevProps, "data.message", "") === get(nextProps, "data.message", "") &&
  get(prevProps, "data.name", "") === get(nextProps, "data.name", "") &&
  get(prevProps, "data.percentage", "") ===
    get(nextProps, "data.percentage", "");

export default React.memo(TransferringItem, areEqual);
