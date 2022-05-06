import React from "react";
import { queueTransfer } from "../../../store/actions";
import { faM } from "@fortawesome/free-solid-svg-icons/faM";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { DIRECT_TO_MEGA_QUEUE, directRe } from "../../../config/Constants";
import CommonBase from "../BluePrints/CommonBase";

const DirectToMega = () => {
  return (
    <CommonBase
      regExpString={directRe}
      dbPath={DIRECT_TO_MEGA_QUEUE}
      validationErrorMessage={"Provide a valid direct download URL"}
      submitFN={queueTransfer}
      title={<>Add a direct link to convert to a Mega.nz link</>}
      placeholder={"Direct Link"}
      toText={"Mega Link"}
      toIcon={faM}
      toLink={"megaLink"}
      fromText={"Direct Link"}
      fromIcon={faLink}
      fromLink={"directLink"}
    />
  );
};

export default DirectToMega;
