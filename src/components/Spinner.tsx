import { View, ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import { COLORS } from '~/constants/Colors';
import { useThemeColor } from '@/hooks';
import { Texto } from '@/ui/Texto';

interface Props extends ActivityIndicatorProps {
    classNameContainer?: string
    classNameText?: string
    showText?: boolean
    text?: string
}

const Spinner: React.FC<Props> = ({ classNameContainer = "flex-1 bg-white dark:bg-primario-dark items-center justify-center", classNameText, showText, text, ...props }) => {
    const isDark = useThemeColor() === "dark"
    return (
        <View className={classNameContainer}>
            <ActivityIndicator color={isDark ? "#fff" : COLORS.light.background} {...props} />

            {showText && <Texto className={classNameText} weight='Bold'>{text}</Texto>}
        </View>
    )
}

export default Spinner