export const gDriveRe =
  /(^https:\/\/drive\.google\.com\/file\/d\/.*?\/.*?\?.*$|^https:\/\/drive\.google\.com\/drive\/folders\/.*\?.*$)/g;
export const directRe =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/g;
export const megaRe =
  /(^https:\/\/mega\.nz\/(file|folder)\/[a-zA-Z0-9]{0,8}#[a-zA-Z0-9_-]+$)|(^https:\/\/mega\.nz\/folder\/[a-zA-Z0-9]{0,8}#[a-zA-Z0-9_-]+\/(file|folder)\/[a-zA-Z0-9]{0,8}$)/g;
