import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing, radii } from '../../../theme';

interface CategoryPillProps {
  label: string;
  isActive?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export function CategoryPill({ label, isActive, onPress, style }: CategoryPillProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        isActive ? styles.activeContainer : styles.inactiveContainer,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          isActive ? styles.activeText : styles.inactiveText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 32,
    borderRadius: radii.default,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.spaceMd,
    borderWidth: 1,
  },
  activeContainer: {
    backgroundColor: colors.onSurface,
    borderColor: colors.onSurface,
  },
  inactiveContainer: {
    backgroundColor: colors.surfaceContainerLowest,
    borderColor: colors.surfaceContainerHigh,
  },
  text: {
    ...typography.bodySm,
  },
  activeText: {
    color: colors.surfaceContainerLowest,
  },
  inactiveText: {
    color: colors.onSurfaceVariant,
  },
});
