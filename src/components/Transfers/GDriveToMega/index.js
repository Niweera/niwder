import React from "react";
import { queueTransfer } from "../../../store/actions";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons/faGoogleDrive";
import { faM } from "@fortawesome/free-solid-svg-icons/faM";
import { GDRIVE_TO_MEGA_QUEUE, gDriveRe } from "../../../config/Constants";
import CommonBase from "../BluePrints/CommonBase";

const GDriveToMega = () => {
  return (
    <CommonBase
      regExpString={gDriveRe}
      dbPath={GDRIVE_TO_MEGA_QUEUE}
      validationErrorMessage={
        "The URL must be a valid Google Drive file/folder export URL"
      }
      submitFN={queueTransfer}
      title={<>Add a Google Drive link to convert to a Mega.nz link</>}
      placeholder={"Google Drive Link"}
      toText={"Mega.nz Link"}
      toIcon={faM}
      toLink={"megaLink"}
      fromText={"Google Drive Link"}
      fromIcon={faGoogleDrive}
      fromLink={"gDriveLink"}
    />
  );
};

export default GDriveToMega;
