import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../theme';

export function EditorialStatement() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.seasonText}>Autumn Collection</Text>
        <Text style={styles.yearText}>2024</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.headline}>
          Technology,{'\n'}
          curated for{'\n'}
          <Text style={styles.headlineItalic}>modern living.</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.spaceMd,
    paddingBottom: spacing.spaceLg,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.spaceSm,
  },
  seasonText: {
    ...typography.labelTechnical,
    color: colors.secondary,
  },
  yearText: {
    ...typography.labelTechnical,
    color: colors.outline,
  },
  body: {
    paddingVertical: spacing.spaceXs,
  },
  headline: {
    ...typography.headlineXlMobile,
    color: colors.onSurface,
    lineHeight: 38 * 1.12, 
  },
  headlineItalic: {
    fontStyle: 'italic',
    fontWeight: '400',
  }
});
