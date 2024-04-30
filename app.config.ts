import { ExpoConfig, ConfigContext } from "@expo/config";
import prevConfig from "./app.json";

const config = ({ config }: ConfigContext): ExpoConfig => {
  const versionCode = 20;

  return {
    //...(prevConfig.expo as ExpoConfig),
    ...config,
    name: process.env.EXPO_PUBLIC_APP_NAME ?? "UPDS Tarija UNKNOW",
    slug: "upds-tarija",
    version: "1.1.7",
    orientation: "default",
    notification: {
      icon: "./assets/images/app/icon.png",
    },
    icon: "./assets/images/app/icon.png",
    scheme: "updstarija",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/app/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      buildNumber: versionCode.toString(),
      supportsTablet: true,
      googleServicesFile: "./GoogleService-Info.plist",
      bundleIdentifier: "com.upds.tarija.com",
      appStoreUrl: "https://apps.apple.com/us/app/upds-tarija/id6461775999",
    },
    android: {
      versionCode,
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/images/app/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: ["android.permission.POST_NOTIFICATIONS"],
      package: "com.upds.tarija.com",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.upds.tarija.com",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/app/favicon.png",
    },
    plugins: [
      "expo-router",
      "@react-native-firebase/app",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Permitir a ${PRODUCT_NAME} acceder a tu ubicacion.",
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them in chat.",
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "3e6cb61c-8205-44f4-b905-35180b7bcaa9",
      },
    },
    jsEngine: "hermes",
  };
};

export default config;
