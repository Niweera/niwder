import React from "react";
import Typography from "@mui/material/Typography";

/**
 *
 * @param {string} primaryText
 * @returns {JSX.Element}
 * @constructor
 */
const TransferringComponent = ({ primaryText }) => (
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
  </React.Fragment>
);

export default TransferringComponent;
