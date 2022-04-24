import React from "react";
import { queueTransfer } from "../../../store/actions";
import TransferBase from "../TransfersBase";
import SecondaryComponent from "../TransfersBase/SecondaryComponent";
import TransferringComponent from "../TransfersBase/TransferringComponent";
import { magnetRe, TORRENTS_TO_DIRECT_QUEUE } from "../../../config/Constants";
import { faMagnet } from "@fortawesome/free-solid-svg-icons/faMagnet";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";

const secondary = ({ directLink, magnetLink, size, mimeType, timestamp }) => (
  <SecondaryComponent
    primaryLink={directLink}
    primaryText={"Direct Link"}
    secondaryLink={magnetLink}
    secondaryText={"Magnet Link"}
    size={size}
    mimeType={mimeType}
    timestamp={timestamp}
    primaryIcon={faLink}
    secondaryIcon={faMagnet}
  />
);

const transferring = ({ message, percentage }) => (
  <TransferringComponent primaryText={message} percentage={percentage} />
);

const TorrentsToDirect = () => {
  return (
    <TransferBase
      dbPath={TORRENTS_TO_DIRECT_QUEUE}
      regExpString={magnetRe}
      validationErrorMessage={"The link must be a valid magnet link"}
      submitFN={queueTransfer}
      title={<>Add a magnet link to convert to a direct link</>}
      placeholder={"Magnet Link"}
      secondaryComponent={secondary}
      transferringComponent={transferring}
    />
  );
};

export default TorrentsToDirect;
