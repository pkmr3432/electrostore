import React from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, spacing, typography, radii } from '../../../theme';

export interface SearchBarProps {
  interactive?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  onFilterPress?: () => void;
  autoFocus?: boolean;
}

export function SearchBar({ 
  interactive = true, 
  value, 
  onChangeText, 
  onFilterPress,
  autoFocus
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons 
        name="search" 
        size={20} 
        color={colors.outline} 
        style={styles.searchIcon} 
      />
      <TextInput
        style={styles.input}
        placeholder="Search audio, computing & accessories..."
        placeholderTextColor={colors.outline}
        selectionColor={colors.primaryContainer}
        pointerEvents={interactive ? 'auto' : 'none'}
        editable={interactive}
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
      />
      <Pressable 
        style={({ pressed }) => [
          styles.filterButton,
          pressed && styles.filterButtonPressed
        ]}
        accessibilityLabel="Filter options"
        onPress={onFilterPress}
      >
        <MaterialIcons 
          name="tune" 
          size={20} 
          color={colors.onSurfaceVariant} 
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.xl,
    height: 48,
    width: '100%',
  },
  searchIcon: {
    marginLeft: spacing.spaceMd,
  },
  input: {
    flex: 1,
    height: '100%',
    ...typography.bodyMd,
    color: colors.onSurface,
    paddingLeft: spacing.spaceXs,
    paddingRight: spacing.spaceMd,
  },
  filterButton: {
    marginRight: spacing.spaceXs,
    padding: spacing.space2xs,
    borderRadius: radii.default,
  },
  filterButtonPressed: {
    opacity: 0.7,
  }
});
