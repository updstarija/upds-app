import { useThemeColor } from '@/hooks';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';

const variants = {
    'primary': 'rounded-md bg-primario border-primario',
    'primary-dark': 'rounded-md bg-secondary-dark border-primario',
    'white': 'rounded-md bg-white border border-primario',
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
            className={variant === 'custom' ? className : `${variants[variant]} ${sizes[size]} w-fit`}
            activeOpacity={isDark ? .5 : .8}
            {...props}
        >
            {disabled && showLoader ?
                <ActivityIndicator color={"red"} size={20} /> : <>{children}</>}
        </TouchableOpacity>
    );
};


export default CustomButton