import { useColorScheme } from 'nativewind';
import { useColorScheme as useColorSystem } from 'react-native'
export const useThemeColor = () => {
    useColorSystem()

    return useColorScheme().colorScheme
}