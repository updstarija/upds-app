import AsyncStorage from "@react-native-async-storage/async-storage"

export const verTutorial = async(key:string) => {
    const value = await AsyncStorage.getItem(key)

    if(value && value == "true") return false
    return true
}