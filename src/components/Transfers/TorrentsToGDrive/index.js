import React from "react";
import { queueTransfer } from "../../../store/actions";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons/faGoogleDrive";
import { magnetRe, TORRENTS_TO_GDRIVE_QUEUE } from "../../../config/Constants";
import { faMagnet } from "@fortawesome/free-solid-svg-icons/faMagnet";
import TorrentsBase from "../BluePrints/TorrentsBase";

const TorrentsToGDrive = () => {
  return (
    <TorrentsBase
      dbPath={TORRENTS_TO_GDRIVE_QUEUE}
      regExpString={magnetRe}
      validationErrorMessage={"The link must be a valid magnet link"}
      submitFN={queueTransfer}
      title={<>Add a magnet link to convert to a Google Drive link</>}
      placeholder={"Magnet Link"}
      toText={"Google Drive Link"}
      toIcon={faGoogleDrive}
      toLink={"gDriveLink"}
      fromText={"Magnet Link"}
      fromIcon={faMagnet}
      fromLink={"magnetLink"}
    />
  );
};

export default TorrentsToGDrive;
