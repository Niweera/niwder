import { useEffect } from "react";
import { FCM_VAPID_KEY, messaging } from "../config";
import { storeFCMKey } from "../store/actions";
import { useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";

const useEnableFCM = () => {
  const firebase = useFirebase();
  const uid = useSelector(
    ({
      firebase: {
        auth: { uid },
      },
    }) => uid
  );

  useEffect(() => {
    if (messaging) {
      if (
        Notification.permission !== "granted" &&
        Notification.permission !== "denied"
      ) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            messaging
              .getToken({
                vapidKey: FCM_VAPID_KEY,
              })
              .then((refreshedToken) => {
                storeFCMKey(refreshedToken, uid)(firebase);
              })
              .catch((e) => console.log(e));
          }
        });
      }
    }
  }, [firebase, uid]);
};

export default useEnableFCM;
