import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import YoutubeIframe from "react-native-youtube-iframe";
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  title: string;
  visible: boolean;
  onClose: () => void;
}

export const VideoPlayer: React.FC<Props> = ({ title, visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      transparent={true}>

      <View style={styles.modalContainer}>
        <View className="w-full">
          <View className="flex h-8 items-end justify-center bg-primario p-2">
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={15} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            {/* <Text style={styles.title}>{title}</Text> */}
            <View style={{ borderBottomEndRadius: 5, overflow: 'hidden' }}>

              <YoutubeIframe
                height={228}
                play={true}
                videoId={title}
                webViewProps={{
                  mediaPlaybackRequiresUserAction: false,
                  allowsInlineMediaPlayback: false,
                  source: {
                    baseUrl: "",
                    html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${title}?autoplay=1&controls=2" frameborder="0" allowfullscreen></iframe>`,
                  },
                }}
              />

            </View>
          </View>
        </View>
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 5,
  },
  contentContainer: {
    backgroundColor: 'black',
  },
});
