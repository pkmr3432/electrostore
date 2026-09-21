import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCheckout } from './_layout';
import { typography, colors, spacing, radii } from '../../../theme';
import { Button } from '../../components/ui/Button';
import { useRepositories } from '../../core/di/RepositoryProvider';
import { useCart } from '../../application/hooks/useCart';

export default function PaymentScreen() {
  const insets = useSafeAreaInsets();
  const { setPaymentIntentId, shippingMethod } = useCheckout();
  const { paymentProvider } = useRepositories();
  const { subtotal } = useCart();
  
  const [form, setForm] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    nameOnCard: ''
  });
  const [isInitializing, setIsInitializing] = useState(false);

  const total = subtotal + (shippingMethod?.price || 0);

  const handleNext = async () => {
    if (!form.cardNumber || !form.expiry || !form.cvc || !form.nameOnCard) {
      Alert.alert('Missing Fields', 'Please fill in all mock payment fields.');
      return;
    }

    setIsInitializing(true);
    try {
      // Mock initializing the payment intent
      let currency = 'USD';
      const name = form.nameOnCard.toLowerCase();
      if (name === 'fail') currency = 'FAIL';
      if (name === 'cancel') currency = 'CANCEL';

      const { paymentIntentId } = await paymentProvider.initializePayment(total, currency);
      if (currency === 'CANCEL') {
         // Hack for testability without touching MockPaymentProvider initialization specifically for cancel
         setPaymentIntentId('pi_mock_cancel');
      } else {
         setPaymentIntentId(paymentIntentId);
      }
      
      router.push('/checkout/review');
    } catch (e) {
      Alert.alert('Payment Error', 'Failed to initialize payment.');
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + spacing.space3xl }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerTitle}>Payment Details</Text>
        <Text style={styles.headerSubtitle}>Enter your payment information (Mock Only).</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name on Card *</Text>
            <TextInput 
              style={styles.input} 
              value={form.nameOnCard}
              onChangeText={t => setForm({ ...form, nameOnCard: t })}
              placeholder="Jane Doe"
              placeholderTextColor={colors.outline}
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Card Number *</Text>
            <TextInput 
              style={styles.input} 
              value={form.cardNumber}
              onChangeText={t => setForm({ ...form, cardNumber: t })}
              placeholder="4242 4242 4242 4242"
              placeholderTextColor={colors.outline}
              keyboardType="numeric"
              maxLength={19}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: spacing.spaceMd }]}>
              <Text style={styles.label}>Expiry (MM/YY) *</Text>
              <TextInput 
                style={styles.input} 
                value={form.expiry}
                onChangeText={t => setForm({ ...form, expiry: t })}
                placeholder="12/25"
                placeholderTextColor={colors.outline}
                maxLength={5}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>CVC *</Text>
              <TextInput 
                style={styles.input} 
                value={form.cvc}
                onChangeText={t => setForm({ ...form, cvc: t })}
                placeholder="123"
                placeholderTextColor={colors.outline}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
              />
            </View>
          </View>
        </View>

        <View style={styles.secureNotice}>
          <Text style={styles.secureNoticeText}>🔒 Mock Payment Environment</Text>
          <Text style={styles.secureNoticeSub}>Do not enter real credit card numbers.</Text>
        </View>

        <View style={styles.footer}>
          {isInitializing ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : (
            <Button label="Review Order" onPress={handleNext} />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.spaceLg,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  headerSubtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    marginTop: spacing.spaceXs,
    marginBottom: spacing.space2xl,
  },
  form: {
    gap: spacing.spaceLg,
  },
  inputGroup: {
    gap: spacing.spaceXs,
  },
  label: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
  },
  input: {
    ...typography.bodyMd,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.outline,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.spaceMd,
    color: colors.onSurface,
  },
  row: {
    flexDirection: 'row',
  },
  secureNotice: {
    marginTop: spacing.space2xl,
    padding: spacing.spaceMd,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  secureNoticeText: {
    ...typography.labelLg,
    color: colors.onSurface,
  },
  secureNoticeSub: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  footer: {
    marginTop: spacing.spaceLg,
  },
  loadingContainer: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
