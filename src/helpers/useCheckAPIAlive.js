import { useEffect } from "react";
import { useFirebaseConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { get } from "lodash";

const useCheckAPIAlive = (setApiAlive) => {
  useFirebaseConnect(`live`);

  const apiLive = useSelector(({ firebase: { data } }) =>
    get(data, `live`, false)
  );

  useEffect(() => {
    setApiAlive(apiLive);
  }, [setApiAlive, apiLive]);
};

export default useCheckAPIAlive;
