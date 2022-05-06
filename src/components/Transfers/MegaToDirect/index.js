import React from "react";
import { queueMegaTransfer } from "../../../store/actions";
import { MEGA_TO_DIRECT_QUEUE, megaRe } from "../../../config/Constants";
import { faM } from "@fortawesome/free-solid-svg-icons/faM";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import CommonBase from "../BluePrints/CommonBase";

const MegaToDirect = () => {
  return (
    <CommonBase
      regExpString={megaRe}
      dbPath={MEGA_TO_DIRECT_QUEUE}
      validationErrorMessage={
        "The URL must be a valid Mega.nz file/folder export URL"
      }
      submitFN={queueMegaTransfer}
      title={<>Add a Mega.nz link to convert to a Direct link</>}
      placeholder={"Mega.nz Link"}
      toText={"Direct Link"}
      toIcon={faLink}
      toLink={"directLink"}
      fromText={"Mega.nz Link"}
      fromIcon={faM}
      fromLink={"megaLink"}
    />
  );
};

export default MegaToDirect;
