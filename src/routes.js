import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Container from "@mui/material/Container";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Transfers from "./components/Transfers";
import { useSelector } from "react-redux";
import Spinner from "./helpers/Spinner";
import { isLoaded, isEmpty } from "react-redux-firebase";
import {
  UserIsAuthenticated,
  UserIsGoogleAuthorized,
  UserIsNotAuthenticated,
} from "./auth";
import MegaToGDrive from "./components/Transfers/MegaToGDrive";
import GDriveToMega from "./components/Transfers/GDriveToMega";
import DirectToGDrive from "./components/Transfers/DirectToGDrive";
import DirectToMega from "./components/Transfers/DirectToMega";
import GDriveToDirect from "./components/Transfers/GDriveToDirect";
import MegaToDirect from "./components/Transfers/MegaToDirect";
import TorrentsToGDrive from "./components/Transfers/TorrentsToGDrive";
import TorrentsToMega from "./components/Transfers/TorrentsToMega";
import TorrentsToDirect from "./components/Transfers/TorrentsToDirect";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import {
  DIRECT_TO_GDRIVE_ROUTE,
  DIRECT_TO_MEGA_ROUTE,
  GDRIVE_TO_DIRECT_ROUTE,
  GDRIVE_TO_MEGA_ROUTE,
  MEGA_TO_DIRECT_ROUTE,
  MEGA_TO_GDRIVE_ROUTE,
  TORRENTS_TO_DIRECT_ROUTE,
  TORRENTS_TO_GDRIVE_ROUTE,
  TORRENTS_TO_MEGA_ROUTE,
} from "./config/Constants";
import { io } from "socket.io-client";
import { get } from "lodash";
import { API_BASE } from "./config";
import Message from "./helpers/Notification";

const AuthIsLoaded = ({ children }) => {
  const profile = useSelector(({ firebase: { profile } }) => profile);

  if (isLoaded(profile) && isEmpty(profile)) return children;

  if (isLoaded(profile) && !isEmpty(profile)) return children;

  return <Spinner />;
};

const RoutesComponent = () => {
  const [time, setTime] = useState(0);
  const [connected, setConnected] = useState(null);
  const [disconnected, setDisconnected] = useState(null);

  const accessToken = useSelector(({ firebase: { auth } }) =>
    get(auth, "stsTokenManager.accessToken", "")
  );

  useEffect(() => {
    if (accessToken) {
      const socket = io(API_BASE, {
        transports: ["websocket", "polling"],
      });

      socket.on("api-alive", () => {
        setConnected(true);
        setDisconnected(false);
      });

      socket.on("connect_error", () => {
        setConnected(false);
        setDisconnected(true);
        setTime(1);
      });
    }
  }, [accessToken]);

  const onNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setConnected(null);
    setDisconnected(null);
  };

  return (
    <Router>
      <AuthIsLoaded>
        <Navbar />
        {Boolean(time) && Boolean(connected) && (
          <Message
            severity={"success"}
            alertTitle={`Connected to Niwder-API`}
            onClose={onNotificationClose}
            message={"Connection is restored to Niwder-API."}
            open={connected}
            autoHideDuration={5000}
          />
        )}
        {Boolean(disconnected) && (
          <Message
            severity={"error"}
            alertTitle={`Niwder-API is unreachable`}
            message={"Either you are offline or Niwder-API is down."}
            open={disconnected}
            autoHideDuration={5000}
          />
        )}
        <Container maxWidth={false}>
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/privacy-policy"} element={<PrivacyPolicy />} />
            <Route
              exact
              path={"/terms-of-service"}
              element={<TermsOfService />}
            />
            <Route exact path="/login" element={<UserIsNotAuthenticated />}>
              <Route exact path="/login" element={<Login />} />
            </Route>
            <Route exact path="/transfers" element={<UserIsAuthenticated />}>
              <Route exact path={"/transfers"} element={<Transfers />} />

              <Route
                exact
                path="/transfers"
                element={<UserIsGoogleAuthorized />}
              >
                <Route
                  exact
                  path={MEGA_TO_GDRIVE_ROUTE}
                  element={<MegaToGDrive />}
                />
                <Route
                  exact
                  path={GDRIVE_TO_MEGA_ROUTE}
                  element={<GDriveToMega />}
                />
                <Route
                  exact
                  path={DIRECT_TO_GDRIVE_ROUTE}
                  element={<DirectToGDrive />}
                />
                <Route
                  exact
                  path={GDRIVE_TO_DIRECT_ROUTE}
                  element={<GDriveToDirect />}
                />
                <Route
                  exact
                  path={TORRENTS_TO_GDRIVE_ROUTE}
                  element={<TorrentsToGDrive />}
                />
              </Route>

              <Route
                exact
                path={DIRECT_TO_MEGA_ROUTE}
                element={<DirectToMega />}
              />
              <Route
                exact
                path={MEGA_TO_DIRECT_ROUTE}
                element={<MegaToDirect />}
              />
              <Route
                exact
                path={TORRENTS_TO_MEGA_ROUTE}
                element={<TorrentsToMega />}
              />
              <Route
                exact
                path={TORRENTS_TO_DIRECT_ROUTE}
                element={<TorrentsToDirect />}
              />
            </Route>
            <Route exact path={"*"} element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </AuthIsLoaded>
    </Router>
  );
};

export default RoutesComponent;
