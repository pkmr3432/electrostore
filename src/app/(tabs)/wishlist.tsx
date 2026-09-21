import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { typography, colors, spacing, radii } from '../../../theme';
import { WishlistCard } from '../../components/ui/WishlistCard';
import { Header } from '../../components/layout/Header';
import { ToastBanner } from '../../components/ui/ToastBanner';

import { useWishlist } from '../../application/hooks/useWishlist';

export default function WishlistScreen() {
  const insets = useSafeAreaInsets();
  
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };
  
  const { items, subtotal, moveToCart, moveAllToCart } = useWishlist();

  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 56, paddingBottom: 56 + insets.bottom + spacing.space3xl }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Saved Items</Text>
            <Text style={styles.count}>{items.length} items saved</Text>
          </View>
          <Text style={styles.subtitle}>Review your saved hardware selections and manage availability.</Text>
        </View>

        {/* Subtotal & Move All */}
        <View style={styles.subtotalContainer}>
          <View style={styles.subtotalCard}>
            <View>
              <Text style={styles.subtotalLabel}>Subtotal Value</Text>
              <Text style={styles.subtotalPrice}>${subtotal.toFixed(2)}</Text>
            </View>
            <Pressable 
              style={({ pressed }) => [styles.moveAllBtn, pressed && styles.pressed]}
              onPress={() => {
                moveAllToCart();
                showToast('Available items transferred to cart');
              }}
            >
              <MaterialIcons name="shopping-bag" size={18} color={colors.onPrimary} />
              <Text style={styles.moveAllText}>Move All to Cart</Text>
            </Pressable>
          </View>

          {/* Filter Bar */}
          <View style={styles.filterRow}>
            <View style={styles.filtersLeft}>
              <Pressable style={styles.filterPillActive}>
                <Text style={styles.filterPillTextActive}>All ({items.length})</Text>
              </Pressable>
              <Pressable style={styles.filterPill}>
                <Text style={styles.filterPillText}>
                  In Stock ({items.filter(i => i.product?.stockStatus !== 'OUT_OF_STOCK').length})
                </Text>
              </Pressable>
            </View>
            <Text style={styles.sortText}>Sort: Saved Order</Text>
          </View>
        </View>

        {/* Grid */}
        <View style={styles.grid}>
          {items.map(item => {
            if (!item.product) return null;
            const inStock = item.product.stockStatus !== 'OUT_OF_STOCK';
            return (
              <View key={item.id} style={styles.gridItem}>
                <WishlistCard 
                  id={item.product.id}
                  title={item.product.title}
                  manufacturer={item.product.manufacturer}
                  price={item.product.price}
                  imageUrl={item.product.images[0]}
                  inStock={inStock}
                  onActionPress={() => {
                    if (inStock) {
                      moveToCart(item.id);
                      showToast(`Moved "${item.product!.title}" to Bag`);
                    } else {
                      showToast('Restock notification confirmed');
                    }
                  }}
                />
              </View>
            );
          })}
        </View>

        {/* Footer */}
        <View style={styles.footerInfo}>
          <View style={styles.footerCard}>
            <MaterialIcons name="verified" size={22} color={colors.primaryContainer} />
            <View style={styles.footerTextContainer}>
              <Text style={styles.footerTitle}>Price Tracking & Stock Alerts</Text>
              <Text style={styles.footerBody}>We will notify you if prices drop or out-of-stock items become available.</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Toast Banner overlay */}
      <ToastBanner 
        message={toastMessage} 
        isVisible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
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
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.spaceLg,
    paddingBottom: spacing.spaceMd,
    gap: spacing.space2xs,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  title: {
    ...typography.headlineXlMobile,
    color: colors.onSurface,
  },
  count: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  subtotalContainer: {
    paddingHorizontal: spacing.margin,
    marginBottom: spacing.spaceMd,
    gap: spacing.spaceSm,
  },
  subtotalCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.xl,
    padding: spacing.spaceSm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtotalLabel: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  subtotalPrice: {
    ...typography.priceHero,
    fontSize: 18,
    color: colors.onSurface,
  },
  moveAllBtn: {
    backgroundColor: colors.primaryContainer,
    height: 40,
    paddingHorizontal: spacing.spaceMd,
    borderRadius: radii.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.space2xs,
  },
  moveAllText: {
    ...typography.labelMd,
    color: colors.onPrimary,
    textTransform: 'uppercase',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.spaceXs,
  },
  filtersLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.space2xs,
  },
  filterPillActive: {
    height: 32,
    paddingHorizontal: spacing.spaceSm,
    borderRadius: 16,
    backgroundColor: colors.onSurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterPillTextActive: {
    ...typography.labelTechnical,
    color: colors.surface,
    textTransform: 'uppercase',
  },
  filterPill: {
    height: 32,
    paddingHorizontal: spacing.spaceSm,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterPillText: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  sortText: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.margin - (spacing.spaceSm / 2),
  },
  gridItem: {
    width: '50%',
    padding: spacing.spaceSm / 2,
    marginBottom: spacing.spaceSm,
  },
  footerInfo: {
    paddingHorizontal: spacing.margin,
    marginTop: spacing.spaceXl,
    marginBottom: spacing.spaceMd,
  },
  footerCard: {
    padding: spacing.spaceMd,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHigh,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.spaceSm,
  },
  footerTextContainer: {
    flex: 1,
    gap: spacing.space2xs,
  },
  footerTitle: {
    ...typography.labelTechnical,
    color: colors.onSurface,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  footerBody: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  }
});
