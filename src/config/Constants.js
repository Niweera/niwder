export const gDriveRe =
  /(^https:\/\/drive\.google\.com\/file\/d\/.*?\/.*?\?.*$|^https:\/\/drive\.google\.com\/drive\/folders\/.*\?.*$)/g;
export const directRe =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/g;
export const megaRe =
  /(^https:\/\/mega\.nz\/(file|folder)\/[a-zA-Z0-9]{0,8}#[a-zA-Z0-9_-]+$)|(^https:\/\/mega\.nz\/folder\/[a-zA-Z0-9]{0,8}#[a-zA-Z0-9_-]+\/(file|folder)\/[a-zA-Z0-9]{0,8}$)|(^https:\/\/mega\.nz\/#F![a-zA-Z0-9!_-]+![a-zA-Z0-9!_-]+$)|(^https:\/\/mega\.nz\/#![a-zA-Z0-9!_-]+![a-zA-Z0-9!_-]+$)/g;
export const megaOldRe =
  /(^https:\/\/mega\.nz\/#F![a-zA-Z0-9!_-]+![a-zA-Z0-9!_-]+$)|(^https:\/\/mega\.nz\/#![a-zA-Z0-9!_-]+![a-zA-Z0-9!_-]+$)/g;
export const magnetRe = /magnet:\?xt=urn:[a-zA-Z0-9]+:[a-zA-Z0-9]+&?.*/g;

export const MEGA_TO_GDRIVE_QUEUE = "mega-to-gdrive";
export const GDRIVE_TO_MEGA_QUEUE = "gdrive-to-mega";
export const DIRECT_TO_GDRIVE_QUEUE = "direct-to-gdrive";
export const DIRECT_TO_MEGA_QUEUE = "direct-to-mega";
export const GDRIVE_TO_DIRECT_QUEUE = "gdrive-to-direct";
export const MEGA_TO_DIRECT_QUEUE = "mega-to-direct";
export const TORRENTS_TO_GDRIVE_QUEUE = "torrents-to-gdrive";
export const TORRENTS_TO_MEGA_QUEUE = "torrents-to-mega";
export const TORRENTS_TO_DIRECT_QUEUE = "torrents-to-direct";

export const MEGA_TO_GDRIVE_ROUTE = `/transfers/${MEGA_TO_GDRIVE_QUEUE}`;
export const GDRIVE_TO_MEGA_ROUTE = `/transfers/${GDRIVE_TO_MEGA_QUEUE}`;
export const DIRECT_TO_GDRIVE_ROUTE = `/transfers/${DIRECT_TO_GDRIVE_QUEUE}`;
export const DIRECT_TO_MEGA_ROUTE = `/transfers/${DIRECT_TO_MEGA_QUEUE}`;
export const GDRIVE_TO_DIRECT_ROUTE = `/transfers/${GDRIVE_TO_DIRECT_QUEUE}`;
export const MEGA_TO_DIRECT_ROUTE = `/transfers/${MEGA_TO_DIRECT_QUEUE}`;
export const TORRENTS_TO_GDRIVE_ROUTE = `/transfers/${TORRENTS_TO_GDRIVE_QUEUE}`;
export const TORRENTS_TO_MEGA_ROUTE = `/transfers/${TORRENTS_TO_MEGA_QUEUE}`;
export const TORRENTS_TO_DIRECT_ROUTE = `/transfers/${TORRENTS_TO_DIRECT_QUEUE}`;

export const confirmationMessages = {
  [MEGA_TO_GDRIVE_QUEUE]:
    "You are going to remove the transferred file (but this will not remove the file from your Google Drive storage).",
  [GDRIVE_TO_MEGA_QUEUE]:
    "You are going to remove the transferred file (and the file will be removed from Mega.nz cloud storage).",
  [DIRECT_TO_GDRIVE_QUEUE]:
    "You are going to remove the transferred file (but this will not remove the file from your Google Drive storage).",
  [DIRECT_TO_MEGA_QUEUE]:
    "You are going to remove the transferred file (and the file will be removed from Mega.nz cloud storage).",
  [GDRIVE_TO_DIRECT_QUEUE]:
    "You are going to remove the transferred file (and the direct download link will stop working).",
  [MEGA_TO_DIRECT_QUEUE]:
    "You are going to remove the transferred file (and the direct download link will stop working).",
  [TORRENTS_TO_GDRIVE_QUEUE]:
    "You are going to remove the transferred file (but this will not remove the file from your Google Drive storage).",
  [TORRENTS_TO_MEGA_QUEUE]:
    "You are going to remove the transferred file (and the file will be removed from Mega.nz cloud storage).",
  [TORRENTS_TO_DIRECT_QUEUE]:
    "You are going to remove the transferred file (and the direct download link will stop working).",
};
