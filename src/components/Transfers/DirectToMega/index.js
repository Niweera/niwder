import React from "react";
import { queueTransfer } from "../../../store/actions";
import TransfersBase from "../TransfersBase";
import SecondaryComponent from "../TransfersBase/SecondaryComponent";

const DirectToMega = () => {
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
    />
  );
};

export default DirectToMega;
