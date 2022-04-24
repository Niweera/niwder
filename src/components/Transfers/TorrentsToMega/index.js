import React from "react";
import { queueTransfer } from "../../../store/actions";
import TransferBase from "../TransfersBase";
import SecondaryComponent from "../TransfersBase/SecondaryComponent";
import TransferringComponent from "../TransfersBase/TransferringComponent";
import { magnetRe, TORRENTS_TO_MEGA_QUEUE } from "../../../config/Constants";
import { faMagnet } from "@fortawesome/free-solid-svg-icons/faMagnet";
import { faM } from "@fortawesome/free-solid-svg-icons/faM";

const secondary = ({ megaLink, magnetLink, size, mimeType, timestamp }) => (
  <SecondaryComponent
    primaryLink={megaLink}
    primaryText={"Mega.nz Link"}
    secondaryLink={magnetLink}
    secondaryText={"Magnet Link"}
    size={size}
    mimeType={mimeType}
    timestamp={timestamp}
    primaryIcon={faM}
    secondaryIcon={faMagnet}
  />
);

const transferring = ({ message, percentage }) => (
  <TransferringComponent primaryText={message} percentage={percentage} />
);

const TorrentsToMega = () => {
  return (
    <TransferBase
      dbPath={TORRENTS_TO_MEGA_QUEUE}
      regExpString={magnetRe}
      validationErrorMessage={"The link must be a valid magnet link"}
      submitFN={queueTransfer}
      title={<>Add a magnet link to convert to a Mega.nz link</>}
      placeholder={"Magnet Link"}
      secondaryComponent={secondary}
      transferringComponent={transferring}
    />
  );
};

export default TorrentsToMega;
