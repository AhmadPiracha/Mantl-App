export default {
  expo: {
    name: "Mantl",
    slug: "mantl-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/logo.png",
    userInterfaceStyle: "dark",
    scheme: "mantl",
    splash: {
      image: "./assets/logo.png",
      resizeMode: "contain",
      backgroundColor: "#000000",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: false,
      bundleIdentifier: "com.mantl.app",
      buildNumber: "1.0.0",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/logo.png",
        backgroundColor: "#000000",
      },
      package: "com.mantl.app",
      versionCode: 1,
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro",
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
  },
}
