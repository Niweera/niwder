import React from "react";
import { queueTransfer } from "../../../store/actions";
import { magnetRe, TORRENTS_TO_MEGA_QUEUE } from "../../../config/Constants";
import { faMagnet } from "@fortawesome/free-solid-svg-icons/faMagnet";
import { faM } from "@fortawesome/free-solid-svg-icons/faM";
import TorrentsBase from "../BluePrints/TorrentsBase";

const TorrentsToMega = () => {
  return (
    <TorrentsBase
      dbPath={TORRENTS_TO_MEGA_QUEUE}
      regExpString={magnetRe}
      validationErrorMessage={"The link must be a valid magnet link"}
      submitFN={queueTransfer}
      title={<>Add a magnet link to convert to a Mega.nz link</>}
      placeholder={"Magnet Link"}
      toText={"Mega.nz Link"}
      toIcon={faM}
      toLink={"megaLink"}
      fromText={"Magnet Link"}
      fromIcon={faMagnet}
      fromLink={"magnetLink"}
    />
  );
};

export default TorrentsToMega;
