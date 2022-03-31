import { useEffect } from "react";
import { messaging } from "../config";

const useFCMNotifications = (setNotification, setNotificationOpen) => {
  useEffect(() => {
    if (messaging) {
      const unsubscribe = messaging.onMessage(
        (payload) => {
          setNotification(payload?.notification);
          setNotificationOpen(true);
        },
        (error) => console.log(error)
      );

      return () => {
        unsubscribe && unsubscribe();
      };
    }
  }, [setNotification, setNotificationOpen]);
};

export default useFCMNotifications;
