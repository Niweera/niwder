import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import prettyBytes from "pretty-bytes";
import TimeAgo from "react-timeago";

/**
 *
 * @param {string} primaryLink
 * @param {string} primaryText
 * @param {string} secondaryLink
 * @param {string} secondaryText
 * @param {number} size
 * @param {string} mimeType
 * @param {number} timestamp
 * @returns {JSX.Element}
 * @constructor
 */
const SecondaryComponent = ({
  primaryLink,
  primaryText,
  secondaryLink,
  secondaryText,
  size,
  mimeType,
  timestamp,
}) => (
  <React.Fragment>
    <Link
      href={primaryLink}
      underline={"hover"}
      variant="body1"
      target="_blank"
      rel="noopener noreferrer"
      color="white"
    >
      {primaryText}
    </Link>
    <br />
    <Link
      href={secondaryLink}
      underline={"hover"}
      variant="body1"
      target="_blank"
      color="white"
      rel="noopener noreferrer"
    >
      {secondaryText}
    </Link>
    <br />
    <Typography
      sx={{ display: "inline" }}
      component="span"
      variant="body2"
      color="text.primary"
    >
      {prettyBytes(size)} [{mimeType}]
    </Typography>
    <br />
    <Typography
      sx={{ display: "inline" }}
      component="span"
      variant="body2"
      color="text.primary"
    >
      Transferred: <TimeAgo date={timestamp} />
    </Typography>
  </React.Fragment>
);

export default SecondaryComponent;
