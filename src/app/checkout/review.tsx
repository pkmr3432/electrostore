import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCheckout } from './_layout';
import { useCart } from '../../application/hooks/useCart';
import { useRepositories } from '../../core/di/RepositoryProvider';
import { typography, colors, spacing, radii } from '../../../theme';
import { Button } from '../../components/ui/Button';

export default function ReviewScreen() {
  const insets = useSafeAreaInsets();
  const { address, shippingMethod, paymentIntentId, clearCheckout } = useCheckout();
  const { items, subtotal, clear } = useCart();
  const { paymentProvider } = useRepositories();

  const [isProcessing, setIsProcessing] = useState(false);

  const total = subtotal + (shippingMethod?.price || 0);

  const handlePlaceOrder = async () => {
    if (!paymentIntentId) {
      Alert.alert('Error', 'Payment information is missing.');
      return;
    }

    setIsProcessing(true);
    try {
      await paymentProvider.confirmPayment(paymentIntentId);
      
      // Clear cart ONLY on success
      await clear();
      
      // Move to success screen
      router.replace('/checkout/success');
      
    } catch (error: any) {
      Alert.alert('Payment Failed', error.message || 'There was an issue processing your payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + spacing.space3xl }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerTitle}>Review Order</Text>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            <Text style={styles.editLink} onPress={() => router.navigate('/checkout/address')}>Edit</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.bodyText}>{address?.fullName}</Text>
            <Text style={styles.bodyText}>{address?.addressLine1}</Text>
            {!!address?.addressLine2 && <Text style={styles.bodyText}>{address.addressLine2}</Text>}
            <Text style={styles.bodyText}>{address?.city}, {address?.state} {address?.postalCode}</Text>
            <Text style={styles.bodyText}>{address?.country}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shipping Method</Text>
            <Text style={styles.editLink} onPress={() => router.navigate('/checkout/shipping')}>Edit</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.bodyText}>{shippingMethod?.label}</Text>
            <Text style={styles.bodyTextSub}>Estimated: {shippingMethod?.estimatedDelivery}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment</Text>
            <Text style={styles.editLink} onPress={() => router.navigate('/checkout/payment')}>Edit</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.bodyText}>Mock Credit Card ending in •••• 4242</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items ({items.length})</Text>
          <View style={styles.itemsList}>
            {items.map(item => (
              <View key={item.id} style={styles.itemRow}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={1}>{item.product?.title}</Text>
                  <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                </View>
                <Text style={styles.itemPrice}>${((item.product?.price || 0) * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>
              {shippingMethod?.price === 0 ? 'FREE' : `$${shippingMethod?.price?.toFixed(2)}`}
            </Text>
          </View>
          <View style={styles.dividerThin} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          {isProcessing ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : (
            <Button label="Place Order" onPress={handlePlaceOrder} />
          )}
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
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.spaceLg,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
    marginBottom: spacing.space2xl,
  },
  section: {
    marginBottom: spacing.space2xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.spaceSm,
  },
  sectionTitle: {
    ...typography.labelLg,
    color: colors.onSurface,
    textTransform: 'uppercase',
  },
  editLink: {
    ...typography.labelTechnical,
    color: colors.primary,
  },
  card: {
    padding: spacing.spaceLg,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.surfaceContainerHighest,
    borderRadius: radii.md,
  },
  bodyText: {
    ...typography.bodyMd,
    color: colors.onSurface,
    marginBottom: 2,
  },
  bodyTextSub: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  itemsList: {
    gap: spacing.spaceMd,
    marginTop: spacing.spaceSm,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
    paddingRight: spacing.spaceMd,
  },
  itemName: {
    ...typography.bodyMd,
    color: colors.onSurface,
  },
  itemQty: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  itemPrice: {
    ...typography.bodyMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  summaryContainer: {
    marginTop: spacing.spaceLg,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.xl,
    padding: spacing.spaceLg,
    gap: spacing.spaceSm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  summaryValue: {
    ...typography.bodyMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  dividerThin: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.surfaceContainerHighest,
    marginVertical: spacing.spaceXs,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  totalLabel: {
    ...typography.labelTechnical,
    color: colors.onSurface,
  },
  totalValue: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  footer: {
    marginTop: spacing.space3xl,
  },
  loadingContainer: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
