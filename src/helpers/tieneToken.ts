import AsyncStorage from "@react-native-async-storage/async-storage";

export const tieneToken = async () => {
    const dataUser = await AsyncStorage.getItem('usuario')
    if (dataUser) return true
    return false
}