import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { typography, colors, spacing } from '../../../theme';
import { Button } from '../../components/ui/Button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useCheckout } from './_layout';

export default function SuccessScreen() {
  const insets = useSafeAreaInsets();
  const { clearCheckout } = useCheckout();

  // Clear checkout context on unmount so the user starts fresh next time
  useEffect(() => {
    return () => {
      clearCheckout();
    };
  }, [clearCheckout]);

  const handleContinue = () => {
    // Navigate back to home and clear the checkout stack
    router.dismissAll();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + spacing.space3xl, paddingBottom: insets.bottom + spacing.space3xl }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.centerContent}>
          <MaterialIcons name="check-circle-outline" size={80} color={colors.primary} style={styles.icon} />
          
          <Text style={styles.title}>Order Confirmed</Text>
          <Text style={styles.subtitle}>
            Thank you for your purchase. Your mock order has been received and is being processed.
          </Text>

          <View style={styles.orderMeta}>
            <Text style={styles.metaLabel}>Confirmation Code</Text>
            <Text style={styles.metaValue}>ORD-{Math.floor(100000 + Math.random() * 900000)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button label="Continue Shopping" onPress={handleContinue} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.margin,
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.space3xl,
  },
  icon: {
    marginBottom: spacing.spaceLg,
  },
  title: {
    ...typography.headlineLg,
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: spacing.spaceSm,
  },
  subtitle: {
    ...typography.bodyLg,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: spacing.space3xl,
    paddingHorizontal: spacing.spaceLg,
  },
  orderMeta: {
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.spaceLg,
    borderRadius: 8,
    width: '100%',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.surfaceContainerHigh,
  },
  metaLabel: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    marginBottom: 4,
  },
  metaValue: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  footer: {
    width: '100%',
  }
});
