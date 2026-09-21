import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, spacing, typography, radii } from '../../../theme';

export function CuratorialNote() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <MaterialIcons name="verified" size={18} color={colors.onSurface} />
          <Text style={styles.title}>Guaranteed Authenticity & 2-Year Warranty</Text>
        </View>
        <Text style={styles.body}>
          Every curated device is inspected and backed by official manufacturer warranty.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.spaceSm,
    paddingBottom: spacing.space3xl,
  },
  card: {
    padding: spacing.spaceLg,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.xl,
    gap: spacing.spaceXs,
    borderWidth: 1,
    borderColor: 'rgba(195, 198, 213, 0.3)', // outline-variant/30
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.space2xs,
  },
  title: {
    ...typography.labelTechnical,
    color: colors.onSurface,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  body: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    lineHeight: 16 * 1.5,
  }
});
