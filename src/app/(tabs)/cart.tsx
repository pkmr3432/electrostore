import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { typography, colors, spacing, radii } from '../../../theme';
import { CartItem } from '../../components/ui/CartItem';
import { Button } from '../../components/ui/Button';
import { Header } from '../../components/layout/Header';

import { useCart } from '../../application/hooks/useCart';
import { validateCartForCheckout } from '../../application/services/checkoutValidation';

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart();

  const handleIncrease = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecrease = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      updateQuantity(id, Math.max(1, item.quantity - 1));
    }
  };

  const handleRemove = (id: string) => {
    removeItem(id);
  };

  const total = subtotal;

  const handleCheckoutPress = () => {
    const validation = validateCartForCheckout(items);
    if (!validation.isValid) {
      Alert.alert(validation.errorTitle || 'Error', validation.errorMessage || 'Invalid cart.');
      return;
    }

    router.push('/checkout/address');
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 56, paddingBottom: 56 + insets.bottom + spacing.space3xl }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Shopping Bag</Text>
          <Text style={styles.count}>{totalItems} items selected</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.itemsList}>
          {items.map((item, index) => {
            if (!item.product) return null;
            return (
              <CartItem 
                key={item.id}
                id={item.id}
                index={index + 1}
                title={item.product.title}
                manufacturer={item.product.manufacturer}
                specs={Object.values(item.product.specifications || {})[0] || ''}
                price={item.product.price}
                imageUrl={item.product.images[0]}
                quantity={item.quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            );
          })}
        </View>

        {/* Logistics */}
        <View style={styles.logisticsContainer}>
          <View style={styles.logisticsIcon}>
            <MaterialIcons name="verified-user" size={18} color={colors.primaryContainer} />
          </View>
          <View style={styles.logisticsText}>
            <Text style={styles.logisticsTitle}>Standard Express Shipping</Text>
            <Text style={styles.logisticsSubtitle}>Complimentary carbon-neutral delivery</Text>
          </View>
          <View style={styles.freeBadge}>
            <Text style={styles.freeBadgeText}>FREE</Text>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryHeaderTitle}>ORDER SUMMARY</Text>
            <Text style={styles.summaryHeaderCurrency}>USD CURRENCY</Text>
          </View>
          
          <View style={styles.dividerThin} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <View style={styles.shippingValue}>
              <Text style={styles.shippingStrikethrough}>$45.00</Text>
              <Text style={styles.shippingFree}>FREE</Text>
            </View>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Protective Packaging</Text>
            <Text style={[styles.summaryValue, { fontWeight: '500' }]}>Complimentary</Text>
          </View>
          
          <View style={styles.dividerThin} />
          
          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>ESTIMATED TOTAL</Text>
              <Text style={styles.totalSubtitle}>Includes VAT & Local Levies</Text>
            </View>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={styles.secureTextContainer}>
          <MaterialIcons name="lock" size={16} color={colors.onSurfaceVariant} />
          <Text style={styles.secureText}>Secure 256-bit checkout • 30-day return policy</Text>
        </View>

        <View style={styles.checkoutContainer}>
          <Button label={`Proceed to Checkout • $${total.toFixed(2)}`} onPress={handleCheckoutPress} />
          <View style={styles.checkoutMeta}>
            <Text style={styles.checkoutMetaText}>SHIPS VIA DHL EXPRESS IN 24H</Text>
            <Text style={styles.checkoutMetaText}>FREE 30-DAY RETURNS</Text>
          </View>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.spaceMd,
    paddingBottom: spacing.spaceSm,
  },
  title: {
    ...typography.headlineLg,
    color: colors.onSurface,
  },
  count: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.surfaceContainerHighest,
    marginHorizontal: spacing.margin,
    marginBottom: spacing.spaceMd,
  },
  itemsList: {
    paddingHorizontal: spacing.margin,
  },
  logisticsContainer: {
    marginHorizontal: spacing.margin,
    marginVertical: spacing.spaceXs,
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.spaceSm,
    borderRadius: radii.xl,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.surfaceContainerHigh,
  },
  logisticsIcon: {
    width: 32,
    height: 32,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.spaceXs,
  },
  logisticsText: {
    flex: 1,
  },
  logisticsTitle: {
    ...typography.labelLg,
    color: colors.onSurface,
  },
  logisticsSubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  freeBadge: {
    backgroundColor: colors.primaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.default,
  },
  freeBadgeText: {
    ...typography.labelTechnical,
    color: colors.primary,
  },
  summaryContainer: {
    marginHorizontal: spacing.margin,
    marginTop: spacing.spaceMd,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.xl,
    padding: spacing.spaceMd,
    gap: spacing.spaceXs,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.space2xs,
  },
  summaryHeaderTitle: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
  },
  summaryHeaderCurrency: {
    ...typography.labelTechnical,
    color: colors.secondary,
  },
  dividerThin: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.surfaceContainerHighest,
    marginVertical: spacing.space2xs,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  shippingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shippingStrikethrough: {
    ...typography.bodySm,
    color: colors.outline,
    textDecorationLine: 'line-through',
  },
  shippingFree: {
    ...typography.bodyMd,
    color: colors.primary,
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: spacing.space2xs,
  },
  totalLabel: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    fontWeight: '600',
  },
  totalSubtitle: {
    ...typography.bodySm,
    color: colors.secondary,
  },
  totalValue: {
    ...typography.priceHero,
    color: colors.onSurface,
  },
  secureTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: spacing.space2xs,
    paddingHorizontal: spacing.spaceXs,
  },
  secureText: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
  },
  checkoutContainer: {
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.space2xs,
    paddingBottom: spacing.spaceLg,
  },
  checkoutMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.spaceXs,
    paddingHorizontal: 4,
  },
  checkoutMetaText: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    fontSize: 10,
  }
});
