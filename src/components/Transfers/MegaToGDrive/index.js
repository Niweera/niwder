import React from "react";
import { queueTransfer } from "../../../store/actions";
import TransferBase from "../TransfersBase";
import SecondaryComponent from "../TransfersBase/SecondaryComponent";

const MegaToGDrive = () => {
  const secondary = ({ gDriveLink, megaLink, size, mimeType, timestamp }) => (
    <SecondaryComponent
      primaryLink={gDriveLink}
      primaryText={"Google Drive Link"}
      secondaryLink={megaLink}
      secondaryText={"Mega.nz Link"}
      size={size}
      mimeType={mimeType}
      timestamp={timestamp}
    />
  );

  return (
    <TransferBase
      dbPath={"mega-to-gdrive"}
      regExpString={
        /(^https:\/\/mega\.nz\/(file|folder)\/[a-zA-Z0-9]{0,8}#[a-zA-Z0-9_-]+$)|(^https:\/\/mega\.nz\/folder\/[a-zA-Z0-9]{0,8}#[a-zA-Z0-9_-]+\/(file|folder)\/[a-zA-Z0-9]{0,8}$)/g
      }
      validationErrorMessage={
        "The URL must be a valid Mega.nz file/folder export URL"
      }
      submitFN={queueTransfer}
      title={<>Add a Mega.nz link to convert to a Google Drive link</>}
      placeholder={"Mega.nz Link"}
      secondaryComponent={secondary}
    />
  );
};

export default MegaToGDrive;
