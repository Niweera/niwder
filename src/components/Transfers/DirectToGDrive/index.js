import React from "react";
import { queueTransfer } from "../../../store/actions";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons/faGoogleDrive";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { DIRECT_TO_GDRIVE_QUEUE, directRe } from "../../../config/Constants";
import CommonBase from "../BluePrints/CommonBase";

const DirectToGDrive = () => {
  return (
    <CommonBase
      regExpString={directRe}
      dbPath={DIRECT_TO_GDRIVE_QUEUE}
      validationErrorMessage={"Provide a valid direct download URL"}
      submitFN={queueTransfer}
      title={<>Add a direct link to convert to a Google Drive link</>}
      placeholder={"Direct Link"}
      toText={"Google Drive Link"}
      toIcon={faGoogleDrive}
      toLink={"gDriveLink"}
      fromText={"Direct Link"}
      fromIcon={faLink}
      fromLink={"directLink"}
    />
  );
};

export default DirectToGDrive;
