import { useEffect } from "react";
import { useFirebaseConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { get } from "lodash";

const useGetNotifications = (setNotification, setNotificationOpen) => {
  const uid = useSelector(
    ({
      firebase: {
        auth: { uid },
      },
    }) => uid
  );

  useFirebaseConnect(`notifications/${uid}`);

  const notification = useSelector(({ firebase: { data } }) =>
    get(data, `notifications.${uid}`, null)
  );

  useEffect(() => {
    if (notification) {
      setNotification(notification);
      setNotificationOpen(true);
    }
  }, [setNotification, notification, setNotificationOpen]);
};

export default useGetNotifications;
