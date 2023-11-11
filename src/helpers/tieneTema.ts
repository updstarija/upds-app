import AsyncStorage from "@react-native-async-storage/async-storage"

export const tieneTema = async () => {
    const valor = await AsyncStorage.getItem('tema')

    if (valor && valor !== '') return true
    return false
}