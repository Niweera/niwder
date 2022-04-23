import React from "react";
import { queueTransfer } from "../../../store/actions";
import TransfersBase from "../TransfersBase";
import SecondaryComponent from "../TransfersBase/SecondaryComponent";
import TransferringComponent from "../TransfersBase/TransferringComponent";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons/faGoogleDrive";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { GDRIVE_TO_DIRECT_QUEUE, gDriveRe } from "../../../config/Constants";

const secondary = ({ gDriveLink, directLink, size, mimeType, timestamp }) => (
  <SecondaryComponent
    primaryLink={directLink}
    primaryText={"Direct Link"}
    secondaryLink={gDriveLink}
    secondaryText={"Google Drive Link"}
    size={size}
    mimeType={mimeType}
    timestamp={timestamp}
    primaryIcon={faLink}
    secondaryIcon={faGoogleDrive}
  />
);

const transferring = ({ message, percentage }) => (
  <TransferringComponent primaryText={message} percentage={percentage} />
);

const GDriveToDirect = () => {
  return (
    <TransfersBase
      dbPath={GDRIVE_TO_DIRECT_QUEUE}
      regExpString={gDriveRe}
      validationErrorMessage={
        "The URL must be a valid Google Drive file/folder export URL"
      }
      submitFN={queueTransfer}
      title={<>Add a Google Drive link to convert to a Direct link</>}
      placeholder={"Google Drive Link"}
      secondaryComponent={secondary}
      transferringComponent={transferring}
    />
  );
};

export default GDriveToDirect;
