import React from "react";
import { queueTransfer } from "../../../store/actions";
import TransfersBase from "../TransfersBase";
import SecondaryComponent from "../TransfersBase/SecondaryComponent";
import TransferringComponent from "../TransfersBase/TransferringComponent";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons/faGoogleDrive";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { DIRECT_TO_GDRIVE_QUEUE, directRe } from "../../../config/Constants";

const secondary = ({ gDriveLink, directLink, size, mimeType, timestamp }) => (
  <SecondaryComponent
    primaryLink={gDriveLink}
    primaryText={"Google Drive Link"}
    secondaryLink={directLink}
    secondaryText={"Direct Link"}
    size={size}
    mimeType={mimeType}
    timestamp={timestamp}
    primaryIcon={faGoogleDrive}
    secondaryIcon={faLink}
  />
);

const transferring = ({ message, percentage }) => (
  <TransferringComponent primaryText={message} percentage={percentage} />
);

const DirectToGDrive = () => {
  return (
    <TransfersBase
      dbPath={DIRECT_TO_GDRIVE_QUEUE}
      regExpString={directRe}
      validationErrorMessage={"Provide a valid direct download URL"}
      submitFN={queueTransfer}
      title={<>Add a direct link to convert to a Google Drive link</>}
      placeholder={"Direct Link"}
      secondaryComponent={secondary}
      transferringComponent={transferring}
    />
  );
};

export default DirectToGDrive;
