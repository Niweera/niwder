import React from "react";
import Typography from "@mui/material/Typography";
import prettyBytes from "pretty-bytes";

/**
 *
 * @param {string} primaryText
 * @param {number} size
 * @param {string} mimeType
 * @returns {JSX.Element}
 * @constructor
 */
const TransferringComponent = ({ primaryText, size, mimeType }) => (
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
    <Typography
      sx={{ display: "inline" }}
      component="span"
      variant="body2"
      color="text.primary"
    >
      {prettyBytes(size)} [{mimeType}]
    </Typography>
  </React.Fragment>
);

export default TransferringComponent;
