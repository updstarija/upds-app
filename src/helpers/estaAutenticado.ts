import AsyncStorage from "@react-native-async-storage/async-storage";

export const estaAutenticado = async () => {
    const dataUser = await AsyncStorage.getItem('usuario')
    if (dataUser) return true
    return false
}