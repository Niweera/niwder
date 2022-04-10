import React from "react";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

/**
 *
 * @param {string} primaryText
 * @param {number} percentage
 * @returns {JSX.Element}
 * @constructor
 */
const TransferringComponent = ({ primaryText, percentage }) => (
  <React.Fragment>
    <Typography
      sx={{ display: "inline" }}
      component="span"
      variant="body2"
      color="text.primary"
    >
      {primaryText}
    </Typography>
    <br />
    {Boolean(percentage) && (
      <Box sx={{ width: "100%" }} component="span">
        <LinearProgress
          variant="buffer"
          value={percentage}
          valueBuffer={percentage}
          color="inherit"
          sx={{
            marginTop: "10px",
          }}
        />
      </Box>
    )}
  </React.Fragment>
);

export default TransferringComponent;
