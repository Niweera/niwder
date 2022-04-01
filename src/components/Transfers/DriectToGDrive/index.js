import React from "react";
import { directToGDrive } from "../../../store/actions";
import TransfersBase from "../TransfersBase";
import SecondaryComponent from "../TransfersBase/SecondaryComponent";

const DirectToGDrive = () => {
  const secondary = ({ gDriveLink, directLink, size, mimeType, timestamp }) => (
    <SecondaryComponent
      primaryLink={gDriveLink}
      primaryText={"Google Drive Link"}
      secondaryLink={directLink}
      secondaryText={"Direct Link"}
      size={size}
      mimeType={mimeType}
      timestamp={timestamp}
    />
  );

  return (
    <TransfersBase
      dbPath={"direct-to-gdrive"}
      regExpString={
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/g
      }
      validationErrorMessage={"Provide a valid direct download URL"}
      submitFN={directToGDrive}
      title={<>Add a direct link to convert to a Google Drive link</>}
      placeholder={"Direct Link"}
      secondaryComponent={secondary}
    />
  );
};

export default DirectToGDrive;
