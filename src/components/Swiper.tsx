import { useRef } from 'react';
import { Animated, I18nManager, StyleSheet } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/MaterialIcons';
import { Texto } from '@/ui';

interface Props {
  children: JSX.Element | JSX.Element[];
  closeOnSwipe?: boolean;
  enabled?: boolean;
  onRighOpen?: Function;
  onLeftOpen?: Function;
  renderLeftActions?: any;
  renderRightActions?: any;
}

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export const Swiper: React.FC<Props> = ({
  children,
  closeOnSwipe,
  enabled,
  renderLeftActions,
  renderRightActions,
  onRighOpen,
  onLeftOpen,
}) => {
  const swipeRef = useRef<Swipeable>(null);

  const close = () => {
    swipeRef.current?.close();
  };

  return (
    <Swipeable
      onSwipeableOpen={e => {
        if (e == 'left' && onLeftOpen) {
          onLeftOpen();
        }

        if (e == 'right' && onRighOpen) {
          onRighOpen();
        }

        if (closeOnSwipe) close();
      }}
      ref={swipeRef}
      enabled={enabled}
      friction={2}
      leftThreshold={80}
      rightThreshold={41}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#209cb8',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 5,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'flex-end',
  },
  addAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#0dd231',
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export const InfoActions = () => {
  return (
    <RectButton style={styles.leftAction}>
      <AnimatedIcon
        name="info"
        size={30}
        color="#fff"
        style={[styles.actionIcon]}
      />
    </RectButton>
  );
};

export const DeleteActions = () => {
  return (
    <RectButton style={styles.rightAction}>
      <Texto className="mr-2 text-white">Eliminar Materia</Texto>
      <AnimatedIcon
        name="delete-forever"
        size={30}
        color="#fff"
        style={[styles.actionIcon]}
      />
    </RectButton>
  );
};

export const AddActions = () => {
  return (
    <RectButton style={styles.addAction}>
      <Texto className="p-4 text-white" style={{ color: "#FFF" }}>Agregar Materia</Texto>
      <AnimatedIcon
        name="add"
        size={30}
        color="#fff"
        style={[styles.actionIcon]}
      />
    </RectButton>
  );
};
