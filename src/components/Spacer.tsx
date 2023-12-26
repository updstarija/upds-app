import { View } from 'react-native'

interface Props {
    height?: number
}
const Spacer: React.FC<Props> = ({ height = 10 }) => {
    return (
        <View style={{ height }} />
    )
}
export default Spacer