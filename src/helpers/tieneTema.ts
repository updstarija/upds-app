import AsyncStorage from "@react-native-async-storage/async-storage"

export const tieneTema = async () => {
    const valor = await AsyncStorage.getItem('tema')
    console.log(valor)

    if (valor && valor !== '') return true
    return false
}