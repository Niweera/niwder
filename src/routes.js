import React from "react";
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
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./auth";
import MegaToGDrive from "./components/Transfers/MegaToGDrive";
import GDriveToMega from "./components/Transfers/GDriveToMega";
import DirectToGDrive from "./components/Transfers/DirectToGDrive";
import DirectToMega from "./components/Transfers/DirectToMega";
import GDriveToDirect from "./components/Transfers/GDriveToDirect";
import MegaToDirect from "./components/Transfers/MegaToDirect";
import TorrentsToGDrive from "./components/Transfers/TorrentsToGDrive";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import {
  DIRECT_TO_GDRIVE_ROUTE,
  DIRECT_TO_MEGA_ROUTE,
  GDRIVE_TO_DIRECT_ROUTE,
  GDRIVE_TO_MEGA_ROUTE,
  MEGA_TO_DIRECT_ROUTE,
  MEGA_TO_GDRIVE_ROUTE,
  TORRENTS_TO_GDRIVE_ROUTE,
} from "./config/Constants";

const AuthIsLoaded = ({ children }) => {
  const profile = useSelector(({ firebase: { profile } }) => profile);

  if (isLoaded(profile) && isEmpty(profile)) return children;

  if (isLoaded(profile) && !isEmpty(profile)) return children;

  return <Spinner />;
};

const RoutesComponent = () => {
  return (
    <Router>
      <AuthIsLoaded>
        <Navbar />
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
                path={DIRECT_TO_MEGA_ROUTE}
                element={<DirectToMega />}
              />
              <Route
                exact
                path={GDRIVE_TO_DIRECT_ROUTE}
                element={<GDriveToDirect />}
              />
              <Route
                exact
                path={MEGA_TO_DIRECT_ROUTE}
                element={<MegaToDirect />}
              />
              <Route
                exact
                path={TORRENTS_TO_GDRIVE_ROUTE}
                element={<TorrentsToGDrive />}
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
