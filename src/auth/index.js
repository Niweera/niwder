import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";

export const UserIsNotAuthenticated = () => {
  const auth = useSelector(({ firebase: { auth } }) => auth);
  const isAuthenticated = isLoaded(auth) && !isEmpty(auth);

  return isAuthenticated === false ? <Outlet /> : <Navigate to="/transfers" />;
};

export const UserIsAuthenticated = () => {
  const auth = useSelector(({ firebase: { auth } }) => auth);
  const isAuthenticated = isLoaded(auth) && !isEmpty(auth);

  return isAuthenticated === true ? <Outlet /> : <Navigate to="/login" />;
};
