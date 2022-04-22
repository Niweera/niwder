import React from "react";
import { queueTransfer } from "../../../store/actions";
import TransfersBase from "../TransfersBase";
import SecondaryComponent from "../TransfersBase/SecondaryComponent";
import TransferringComponent from "../TransfersBase/TransferringComponent";
import { faM } from "@fortawesome/free-solid-svg-icons/faM";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { directRe } from "../../../config/Constants";

const secondary = ({ megaLink, directLink, size, mimeType, timestamp }) => (
  <SecondaryComponent
    primaryLink={megaLink}
    primaryText={"Mega Link"}
    secondaryLink={directLink}
    secondaryText={"Direct Link"}
    size={size}
    mimeType={mimeType}
    timestamp={timestamp}
    primaryIcon={faM}
    secondaryIcon={faLink}
  />
);

const transferring = ({ message, percentage }) => (
  <TransferringComponent primaryText={message} percentage={percentage} />
);

const DirectToMega = () => {
  return (
    <TransfersBase
      dbPath={"direct-to-mega"}
      regExpString={directRe}
      validationErrorMessage={"Provide a valid direct download URL"}
      submitFN={queueTransfer}
      title={<>Add a direct link to convert to a Mega.nz link</>}
      placeholder={"Direct Link"}
      secondaryComponent={secondary}
      transferringComponent={transferring}
    />
  );
};

export default DirectToMega;
