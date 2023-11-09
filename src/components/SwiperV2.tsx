import { useRef } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { SwipeableProps } from "react-native-gesture-handler/lib/typescript/components/Swipeable";


interface Props extends SwipeableProps {
  closeOnSwipe?: boolean;
  onRightOpen?: Function;
  onLeftOpen?: Function;
}

const SwiperV2: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  closeOnSwipe,
  onRightOpen,
  onLeftOpen,
  ...props
}) => {
  const swipeRef = useRef<Swipeable>(null);

  const close = () => {
    swipeRef.current?.close();
  };

  return (
    <Swipeable
      {...props}
      onSwipeableOpen={(e) => {
        if (e == "left" && onLeftOpen) {
          onLeftOpen();
        }

        if (e == "right" && onRightOpen) {
          onRightOpen();
        }

        if (closeOnSwipe) close();
      }}
      ref={swipeRef}

    >
      {children}
    </Swipeable>
  );
};

export default SwiperV2;
