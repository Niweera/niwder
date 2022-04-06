import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import prettyBytes from "pretty-bytes";
import TimeAgo from "react-time-ago";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 *
 * @param {string} primaryLink
 * @param {string} primaryText
 * @param {string} secondaryLink
 * @param {string} secondaryText
 * @param {number} size
 * @param {string} mimeType
 * @param {number} timestamp
 * @param {IconDefinition} primaryIcon
 * @param {IconDefinition} secondaryIcon
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
  primaryIcon,
  secondaryIcon,
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
      <FontAwesomeIcon icon={primaryIcon} /> {primaryText}
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
      <FontAwesomeIcon icon={secondaryIcon} /> {secondaryText}
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
