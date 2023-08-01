import AsyncStorage from "@react-native-async-storage/async-storage"

export const yaPasoLaBienvenida = async () => {
    const valor = await AsyncStorage.getItem('bienvenida')
    if (valor == 'true') return true
    return false
}