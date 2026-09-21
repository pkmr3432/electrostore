import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '../../../theme';

interface WishlistButtonProps {
  initialSaved?: boolean;
  onToggle?: (saved: boolean) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function WishlistButton({ initialSaved = false, onToggle }: WishlistButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    const newState = !saved;
    setSaved(newState);
    if (onToggle) onToggle(newState);

    if (newState) {
      scale.value = withSequence(
        withSpring(1.2, { damping: 10, stiffness: 400 }),
        withSpring(1, { damping: 10, stiffness: 400 })
      );
    } else {
      scale.value = withSequence(
        withSpring(0.9, { damping: 10, stiffness: 400 }),
        withSpring(1, { damping: 10, stiffness: 400 })
      );
    }
  };

  return (
    <AnimatedPressable
      style={[styles.container, animatedStyle]}
      onPress={handlePress}
    >
      <MaterialIcons
        name={saved ? 'favorite' : 'favorite-border'}
        size={24}
        color={saved ? colors.tertiaryContainer : colors.onSurface}
      />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
});
