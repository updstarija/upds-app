/* import { useRef } from "react";
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
 */

import { Ref, forwardRef, useImperativeHandle, useRef } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { SwipeableProps } from 'react-native-gesture-handler/lib/typescript/components/Swipeable';

export interface SwiperV2Ref {
  close: () => void;
  openRight: () => void;
  openLeft: () => void;
}

export interface SwiperV2Props extends SwipeableProps {
  closeOnSwipe?: boolean;
  onRightOpen?: Function;
  onLeftOpen?: Function;
  ref?: Ref<SwiperV2Ref>;
}

const SwiperV2: React.FC<SwiperV2Props> = forwardRef(({
  children,
  closeOnSwipe,
  onRightOpen,
  onLeftOpen,
  ...props
}, ref) => {
  const swipeRef = useRef<Swipeable>(null);

  const close = () => {
    swipeRef.current?.close();
  };
  const openRight = () => {
    swipeRef.current?.openRight()
  };

  const openLeft = () => {
    swipeRef.current?.openLeft();
  };

  useImperativeHandle(ref, () => ({
    close,
    openRight,
    openLeft
  }));

  return (
    <Swipeable
      {...props}
      onSwipeableOpen={(e) => {
        if (e === 'left' && onLeftOpen) {
          onLeftOpen();
        }

        if (e === 'right' && onRightOpen) {
          onRightOpen();
        }

        if (closeOnSwipe) close();
      }}
      ref={swipeRef}
    >
      {children}
    </Swipeable>
  );
});

export default SwiperV2;
