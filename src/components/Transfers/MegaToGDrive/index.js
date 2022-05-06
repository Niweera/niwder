import React from "react";
import { queueMegaTransfer } from "../../../store/actions";
import { MEGA_TO_GDRIVE_QUEUE, megaRe } from "../../../config/Constants";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons/faGoogleDrive";
import { faM } from "@fortawesome/free-solid-svg-icons/faM";
import CommonBase from "../BluePrints/CommonBase";

const MegaToGDrive = () => {
  return (
    <CommonBase
      regExpString={megaRe}
      dbPath={MEGA_TO_GDRIVE_QUEUE}
      validationErrorMessage={
        "The URL must be a valid Mega.nz file/folder export URL"
      }
      submitFN={queueMegaTransfer}
      title={<>Add a Mega.nz link to convert to a Google Drive link</>}
      placeholder={"Mega.nz Link"}
      toText={"Google Drive Link"}
      toIcon={faGoogleDrive}
      toLink={"gDriveLink"}
      fromText={"Mega.nz Link"}
      fromIcon={faM}
      fromLink={"megaLink"}
    />
  );
};

export default MegaToGDrive;
