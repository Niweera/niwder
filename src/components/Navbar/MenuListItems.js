import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import { NavLink } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useSelector } from "react-redux";

const MenuListItems = ({ anchorEl, handleClose, classes }) => {
  const googleAuthorized = useSelector(
    ({
      firebase: {
        profile: { google },
      },
    }) => google
  );

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      {googleAuthorized && (
        <NavLink
          to={"/transfers/mega-to-gdrive"}
          className={({ isActive }) =>
            isActive ? classes.linkTextActive : classes.linkText
          }
        >
          <MenuItem onClick={handleClose}>Mega.nz to Google Drive</MenuItem>
        </NavLink>
      )}
      {googleAuthorized && (
        <NavLink
          to={"/transfers/gdrive-to-mega"}
          className={({ isActive }) =>
            isActive ? classes.linkTextActive : classes.linkText
          }
        >
          <MenuItem onClick={handleClose}>Google Drive to Mega.nz</MenuItem>
        </NavLink>
      )}
      {googleAuthorized && (
        <NavLink
          to={"/transfers/direct-to-gdrive"}
          className={({ isActive }) =>
            isActive ? classes.linkTextActive : classes.linkText
          }
        >
          <MenuItem onClick={handleClose}>Direct to Google Drive</MenuItem>
        </NavLink>
      )}
      <NavLink
        to={"/transfers/direct-to-mega"}
        className={({ isActive }) =>
          isActive ? classes.linkTextActive : classes.linkText
        }
      >
        <MenuItem onClick={handleClose}>Direct to Mega.nz</MenuItem>
      </NavLink>
    </Menu>
  );
};

export default MenuListItems;
