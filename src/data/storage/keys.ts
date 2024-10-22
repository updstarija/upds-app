const keysDB = {
  READ_NOTIFICATIONS: "READ_NOTIFICATIONS",
  DELETED_NOTIFICATIONS: "DELETE_NOTIFICATIONS",

  LIKED_ANNOUNCEMENTS: "LIKED_ANNOUNCEMENTS"
};

const keysAuth = {
  EMAIL_AUTH_REMEMBER: "EMAIL_AUTH_REMEMBER",
  PASSWORD_AUTH_REMEMBER: "PASSWORD_AUTH_REMEMBER",
  CREDENTIALS_AUTH_REMEMBER: "CREDENTIALS_AUTH_REMEMBER",
};

const keysChat = {
  DEVICE_TOKEN: "DEVICE_TOKEN",
  GUEST_USER_NAME: "GUEST_USER_NAME",
};

const keysAPP = {
  THEME: "THEME"
};

export const keysStorage = {
  SAW_WELCOME_SCREEN: "SAW_WELCOME_SCREEN",
  JWT_TOKEN: "JWT_TOKEN",
  ...keysAuth,
  ...keysDB,
  ...keysChat,
  ...keysAPP
};
