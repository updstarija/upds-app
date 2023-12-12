import { useThemeColor } from '@/hooks';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { COLORS } from '~/constants';

const variants = {
    'primary': 'rounded-md bg-primario ',
    'primary-dark': 'rounded-md bg-secondary-dark ',
    'white': 'rounded-md bg-white  ',
    'success': 'rounded-md bg-green-500 ',
    'danger': 'rounded-md bg-red-500',
    'custom': ''
}

const sizes = {
    'small': 'p-3',
    'medium': 'p-4',
    'large': 'p-5',
}
interface Props extends TouchableOpacityProps {
    variant?: keyof typeof variants
    size?: keyof typeof sizes;
    showLoader?: boolean;
}

const CustomButton: React.FC<Props> = ({
    showLoader,
    variant = 'primary',
    size = 'medium',
    children,
    className,
    disabled,
    ...props
}) => {
    const isDark = useThemeColor() === "dark"
    return (
        <TouchableOpacity
            {...props}
            style={[props.style, {
                opacity: disabled ? 0.6 : 1
            }]}
            className={variant === 'custom' ? className : `${variants[variant]} ${sizes[size]} `}
            activeOpacity={isDark ? .5 : .8}
            disabled={disabled}
        >
            {disabled && showLoader ?
                <ActivityIndicator color={"#FFF"} size={20} /> : <>{children}</>}
        </TouchableOpacity>
    );
};


export default CustomButton