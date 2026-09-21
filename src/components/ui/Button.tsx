import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing, radii } from '../../../theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: ViewStyle;
}

export function Button({ label, onPress, variant = 'primary', style }: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const getContainerStyle = (): ViewStyle => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: colors.onSurface,
          borderColor: colors.onSurface,
        };
      case 'ghost':
        return {
          backgroundColor: isPressed ? colors.surfaceContainerLow : colors.surfaceContainerLowest,
          borderColor: colors.surfaceContainerHigh,
          borderWidth: StyleSheet.hairlineWidth,
        };
      case 'primary':
      default:
        return {
          backgroundColor: isPressed ? '#003380' : colors.primaryContainer,
          borderColor: isPressed ? '#003380' : colors.primaryContainer,
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case 'ghost':
        return { color: colors.onSurface };
      case 'secondary':
        return { color: colors.surfaceContainerLowest };
      case 'primary':
      default:
        return { color: colors.onPrimary };
    }
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        styles.base,
        getContainerStyle(),
        isPressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.text, getTextStyle()]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.spaceLg,
    borderWidth: 1,
  },
  pressed: {
    transform: [{ scale: 0.985 }],
  },
  text: {
    ...typography.labelLg,
    textTransform: 'uppercase',
  },
});
