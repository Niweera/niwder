import React from "react";
import { queueTransfer } from "../../../store/actions";
import SecondaryComponent from "../TransfersBase/SecondaryComponent";
import TransferringComponent from "../TransfersBase/TransferringComponent";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons/faGoogleDrive";
import { magnetRe, TORRENTS_TO_GDRIVE_QUEUE } from "../../../config/Constants";
import { faMagnet } from "@fortawesome/free-solid-svg-icons/faMagnet";
import TorrentsComponent from "../TransfersBase/TorrentsComponent";
import TorrentsBase from "../TransfersBase/TorrentsBase";

const secondary = ({ gDriveLink, magnetLink, size, mimeType, timestamp }) => (
  <SecondaryComponent
    primaryLink={gDriveLink}
    primaryText={"Google Drive Link"}
    secondaryLink={magnetLink}
    secondaryText={"Magnet Link"}
    size={size}
    mimeType={mimeType}
    timestamp={timestamp}
    primaryIcon={faGoogleDrive}
    secondaryIcon={faMagnet}
  />
);

const torrents = (torrentsData) => (
  <TorrentsComponent torrentsData={torrentsData} />
);

const transferring = ({ message, percentage }) => (
  <TransferringComponent primaryText={message} percentage={percentage} />
);

const TorrentsToGDrive = () => {
  return (
    <TorrentsBase
      dbPath={TORRENTS_TO_GDRIVE_QUEUE}
      regExpString={magnetRe}
      validationErrorMessage={"The link must be a valid magnet link"}
      submitFN={queueTransfer}
      title={<>Add a magnet link to convert to a Google Drive link</>}
      placeholder={"Magnet Link"}
      secondaryComponent={secondary}
      transferringComponent={transferring}
      torrentsComponent={torrents}
    />
  );
};

export default TorrentsToGDrive;
