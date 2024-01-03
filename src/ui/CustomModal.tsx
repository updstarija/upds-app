import Modal, { ModalProps } from "react-native-modal";
import { useWindowDimensions, Platform } from "react-native";
import CONSTANTS from "expo-constants";

type Props = Partial<ModalProps>;

const CustomModal: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  ...props
}) => {
  const isAndroid = Platform.OS === "android";
  const { height } = useWindowDimensions();
  const deviceHeight = isAndroid ? height + CONSTANTS.statusBarHeight : height;

  return (
    <Modal {...props} deviceHeight={deviceHeight}>
      {children}
    </Modal>
  );
};
export default CustomModal;
