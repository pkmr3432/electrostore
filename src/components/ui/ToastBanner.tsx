import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  withDelay,
  Easing 
} from 'react-native-reanimated';
import { colors, spacing, typography, radii } from '../../../theme';

interface ToastBannerProps {
  message: string;
  isVisible: boolean;
  onView?: () => void;
  onHide?: () => void;
}

export function ToastBanner({ message, isVisible, onView, onHide }: ToastBannerProps) {
  const translateY = useSharedValue(64); // translate-y-16 equivalent
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) });
      opacity.value = withTiming(1, { duration: 300 });
      
      // Auto-hide after 2.4 seconds
      const timeout = setTimeout(() => {
        translateY.value = withTiming(64, { duration: 300, easing: Easing.in(Easing.cubic) });
        opacity.value = withTiming(0, { duration: 300 });
        if (onHide) onHide();
      }, 2400);
      
      return () => clearTimeout(timeout);
    } else {
      translateY.value = withTiming(64, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (!isVisible && opacity.value === 0) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]} pointerEvents={isVisible ? 'auto' : 'none'}>
      <View style={styles.banner}>
        <View style={styles.leftContent}>
          <MaterialIcons name="check-circle" size={20} color={colors.primaryFixed} />
          <Text style={styles.message} numberOfLines={1}>{message}</Text>
        </View>
        <Pressable 
          onPress={onView}
          style={({ pressed }) => [styles.viewAction, pressed && styles.pressed]}
        >
          <Text style={styles.viewText}>View</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80, // bottom-20 (5 * 16px)
    left: spacing.margin,
    right: spacing.margin,
    zIndex: 40,
  },
  banner: {
    backgroundColor: colors.inverseSurface,
    padding: spacing.spaceSm,
    borderRadius: radii.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.spaceSm,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spaceXs,
    flex: 1,
  },
  message: {
    ...typography.bodySm,
    color: colors.inverseOnSurface,
    flex: 1,
  },
  viewAction: {
    padding: spacing.space2xs,
  },
  viewText: {
    ...typography.labelMd,
    color: colors.primaryFixed,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
  },
  pressed: {
    opacity: 0.7,
  }
});
