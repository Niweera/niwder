import React from "react";
import { queueTransfer } from "../../../store/actions";
import TransfersBase from "../TransfersBase";
import SecondaryComponent from "../TransfersBase/SecondaryComponent";
import TransferringComponent from "../TransfersBase/TransferringComponent";

const secondary = ({ megaLink, directLink, size, mimeType, timestamp }) => (
  <SecondaryComponent
    primaryLink={megaLink}
    primaryText={"Mega Link"}
    secondaryLink={directLink}
    secondaryText={"Direct Link"}
    size={size}
    mimeType={mimeType}
    timestamp={timestamp}
  />
);

const transferring = ({ stdout, message, percentage }) => (
  <TransferringComponent
    primaryText={message}
    secondaryText={stdout}
    percentage={percentage}
  />
);

const DirectToMega = () => {
  return (
    <TransfersBase
      dbPath={"direct-to-mega"}
      regExpString={
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/g
      }
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
