import React from "react";
import { queueMegaTransfer } from "../../../store/actions";
import TransfersBase from "../TransfersBase";
import SecondaryComponent from "../TransfersBase/SecondaryComponent";
import TransferringComponent from "../TransfersBase/TransferringComponent";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { MEGA_TO_DIRECT_QUEUE, megaRe } from "../../../config/Constants";
import { faM } from "@fortawesome/free-solid-svg-icons/faM";

const secondary = ({ megaLink, directLink, size, mimeType, timestamp }) => (
  <SecondaryComponent
    primaryLink={directLink}
    primaryText={"Direct Link"}
    secondaryLink={megaLink}
    secondaryText={"Mega.nz Link"}
    size={size}
    mimeType={mimeType}
    timestamp={timestamp}
    primaryIcon={faLink}
    secondaryIcon={faM}
  />
);

const transferring = ({ message, percentage }) => (
  <TransferringComponent primaryText={message} percentage={percentage} />
);

const MegaToDirect = () => {
  return (
    <TransfersBase
      dbPath={MEGA_TO_DIRECT_QUEUE}
      regExpString={megaRe}
      validationErrorMessage={
        "The URL must be a valid Mega.nz file/folder export URL"
      }
      submitFN={queueMegaTransfer}
      title={<>Add a Mega.nz link to convert to a Direct link</>}
      placeholder={"Mega.nz Link"}
      secondaryComponent={secondary}
      transferringComponent={transferring}
    />
  );
};

export default MegaToDirect;
