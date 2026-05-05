import React, { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

type Props = {
  children: React.ReactNode;
  index: number;
  baseDelay?: number;
  style?: StyleProp<ViewStyle>;
};

export function AnimatedListItem({ children, index, baseDelay = 0, style }: Props) {
  const opacity = useSharedValue(0);
  const ty = useSharedValue(10);

  useEffect(() => {
    const delay = baseDelay + index * 55;
    const cfg = { duration: 340, easing: Easing.out(Easing.cubic) };
    opacity.value = withDelay(delay, withTiming(1, cfg));
    ty.value = withDelay(delay, withTiming(0, cfg));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: ty.value }],
  }));

  return <Animated.View style={[animStyle, style]}>{children}</Animated.View>;
}
