import Constants from "expo-constants"

module.exports = {
          getVersion: () => {
                    return Constants.expoConfig?.version
          },
          getBundleId: () => {
                    return Constants.expoConfig?.ios.bundleIdentifier
          }
}