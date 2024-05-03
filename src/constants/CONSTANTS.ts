const CONSTANTS = {
  APP_NAME: process.env.EXPO_PUBLIC_APP_NAME ?? "UPDS Tarija",
  API_BASE_URL:
    process.env.EXPO_PUBLIC_API_BASE_URL ??
    "https://tarija.upds.edu.bo/SANDBOX/ApiUpdsApp/api",
  MODE: process.env.EXPO_PUBLIC_MODE ?? "development",
  DEV: JSON.parse(process.env.EXPO_PUBLIC_DEV ?? "true") as boolean,
  PROD: JSON.parse(process.env.EXPO_PUBLIC_PROD ?? "false") as boolean,
  NOTIFICATION_TOPIC: process.env.EXPO_PUBLIC_NOTIFICATION_TOPIC ?? "upds-test",
} as const;

export default CONSTANTS;

export type CONSTANT_TYPE = keyof typeof CONSTANTS;
