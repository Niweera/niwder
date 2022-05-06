import React from "react";
import { queueTransfer } from "../../../store/actions";
import { magnetRe, TORRENTS_TO_DIRECT_QUEUE } from "../../../config/Constants";
import { faMagnet } from "@fortawesome/free-solid-svg-icons/faMagnet";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import TorrentsBase from "../BluePrints/TorrentsBase";

const TorrentsToDirect = () => {
  return (
    <TorrentsBase
      dbPath={TORRENTS_TO_DIRECT_QUEUE}
      regExpString={magnetRe}
      validationErrorMessage={"The link must be a valid magnet link"}
      submitFN={queueTransfer}
      title={<>Add a magnet link to convert to a direct link</>}
      placeholder={"Magnet Link"}
      toText={"Direct Link"}
      toIcon={faLink}
      toLink={"directLink"}
      fromText={"Magnet Link"}
      fromIcon={faMagnet}
      fromLink={"magnetLink"}
    />
  );
};

export default TorrentsToDirect;
