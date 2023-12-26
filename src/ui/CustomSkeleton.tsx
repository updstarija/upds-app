import { useThemeColor } from "@/hooks";
import { Skeleton, } from "moti/skeleton";
import { MotiSkeletonProps } from "moti/build/skeleton/types";

type Props = Omit<MotiSkeletonProps, 'Gradient'>

const CustomSkeleton: React.FC<Props> = ({ ...props }) => {
    const theme = useThemeColor()
    const isDark = theme === "dark"
    const colors = isDark ? ['#071c45', '#040e22'] : undefined

    return (
        <Skeleton
            {...props}
            colorMode={theme}
            colors={props.colors ? props.colors : colors}
        />
    )
}
export default CustomSkeleton