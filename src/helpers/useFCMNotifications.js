import { useEffect } from "react";
import { messaging } from "../config";

const useFCMNotifications = (setNotification, setNotificationOpen) => {
  useEffect(() => {
    let unsubscribe;

    if (messaging) {
      unsubscribe = messaging.onMessage(
        (payload) => {
          setNotification(payload?.notification || payload?.data);
          setNotificationOpen(true);
        },
        (error) => console.log(error)
      );
    }

    return () => {
      unsubscribe?.();
    };
  }, [setNotification, setNotificationOpen]);
};

export default useFCMNotifications;
