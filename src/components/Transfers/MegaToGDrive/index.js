import React from "react";
import { queueTransfer } from "../../../store/actions";
import TransferBase from "../TransfersBase";
import SecondaryComponent from "../TransfersBase/SecondaryComponent";
import TransferringComponent from "../TransfersBase/TransferringComponent";

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

const transferring = ({ stdout, message, percentage }) => (
  <TransferringComponent
    primaryText={message}
    secondaryText={stdout}
    percentage={percentage}
  />
);

const MegaToGDrive = () => {
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
      transferringComponent={transferring}
    />
  );
};

export default MegaToGDrive;
