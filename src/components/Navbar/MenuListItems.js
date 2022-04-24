import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import { NavLink } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useSelector } from "react-redux";
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
} from "../../config/Constants";

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
          to={MEGA_TO_GDRIVE_ROUTE}
          className={({ isActive }) =>
            isActive ? classes.linkTextActive : classes.linkText
          }
        >
          <MenuItem onClick={handleClose}>Mega.nz to Google Drive</MenuItem>
        </NavLink>
      )}
      {googleAuthorized && (
        <NavLink
          to={GDRIVE_TO_MEGA_ROUTE}
          className={({ isActive }) =>
            isActive ? classes.linkTextActive : classes.linkText
          }
        >
          <MenuItem onClick={handleClose}>Google Drive to Mega.nz</MenuItem>
        </NavLink>
      )}
      {googleAuthorized && (
        <NavLink
          to={DIRECT_TO_GDRIVE_ROUTE}
          className={({ isActive }) =>
            isActive ? classes.linkTextActive : classes.linkText
          }
        >
          <MenuItem onClick={handleClose}>Direct to Google Drive</MenuItem>
        </NavLink>
      )}
      <NavLink
        to={DIRECT_TO_MEGA_ROUTE}
        className={({ isActive }) =>
          isActive ? classes.linkTextActive : classes.linkText
        }
      >
        <MenuItem onClick={handleClose}>Direct to Mega.nz</MenuItem>
      </NavLink>
      <NavLink
        to={GDRIVE_TO_DIRECT_ROUTE}
        className={({ isActive }) =>
          isActive ? classes.linkTextActive : classes.linkText
        }
      >
        <MenuItem onClick={handleClose}>Google Drive to Direct</MenuItem>
      </NavLink>
      <NavLink
        to={MEGA_TO_DIRECT_ROUTE}
        className={({ isActive }) =>
          isActive ? classes.linkTextActive : classes.linkText
        }
      >
        <MenuItem onClick={handleClose}>Mega.nz to Direct</MenuItem>
      </NavLink>
      <NavLink
        to={TORRENTS_TO_GDRIVE_ROUTE}
        className={({ isActive }) =>
          isActive ? classes.linkTextActive : classes.linkText
        }
      >
        <MenuItem onClick={handleClose}>Torrents to Google Drive</MenuItem>
      </NavLink>
      <NavLink
        to={TORRENTS_TO_MEGA_ROUTE}
        className={({ isActive }) =>
          isActive ? classes.linkTextActive : classes.linkText
        }
      >
        <MenuItem onClick={handleClose}>Torrents to Mega.nz</MenuItem>
      </NavLink>
      <NavLink
        to={TORRENTS_TO_DIRECT_ROUTE}
        className={({ isActive }) =>
          isActive ? classes.linkTextActive : classes.linkText
        }
      >
        <MenuItem onClick={handleClose}>Torrents to Direct</MenuItem>
      </NavLink>
    </Menu>
  );
};

export default MenuListItems;
