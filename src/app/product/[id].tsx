import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, Platform } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, typography, spacing, radii } from '../../../theme';
import { useProduct } from '../../application/hooks/useProducts';
import { useCart } from '../../application/hooks/useCart';
import { useWishlist } from '../../application/hooks/useWishlist';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { data: product, isLoading, error } = useProduct(id as string);
  
  const { addItem } = useCart();
  const { toggleItem, items: wishlistItems } = useWishlist();
  
  const isWishlisted = wishlistItems.some(item => item.productId === id);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Stack.Screen options={{ title: 'Loading...', headerTransparent: true, headerTitle: '' }} />
        <ActivityIndicator color={colors.primaryContainer} size="large" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Stack.Screen options={{ title: 'Not Found', headerTransparent: true, headerTitle: '' }} />
        <MaterialIcons name="error-outline" size={48} color={colors.outline} />
        <Text style={styles.errorText}>Product not found.</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const isOutOfStock = product.stockStatus === 'OUT_OF_STOCK';
  const isPreOrder = product.stockStatus === 'PRE_ORDER';

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <Pressable 
              style={({ pressed }) => [styles.headerBtn, pressed && styles.pressed]} 
              onPress={() => router.back()}
            >
              <MaterialIcons name="arrow-back" size={24} color={colors.onSurface} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable 
              style={({ pressed }) => [styles.headerBtn, pressed && styles.pressed]} 
              onPress={() => toggleItem(id as string)}
            >
              <MaterialIcons 
                name={isWishlisted ? "favorite" : "favorite-outline"} 
                size={24} 
                color={isWishlisted ? colors.error : colors.onSurface} 
              />
            </Pressable>
          )
        }} 
      />

      <ScrollView 
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.imageHero}>
          <Image 
            source={product.images[0]} 
            style={styles.image} 
            contentFit="cover"
          />
          {product.badges && product.badges.length > 0 && (
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>{product.badges[0]}</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          <Text style={styles.manufacturer}>{product.manufacturer}</Text>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          
          <Text style={styles.description}>{product.description}</Text>
        </View>

        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <View style={styles.specsSection}>
            <Text style={styles.specsHeader}>Technical Specifications</Text>
            <View style={styles.specsContainer}>
              {Object.entries(product.specifications).map(([key, value], index) => (
                <View 
                  key={key} 
                  style={[
                    styles.specRow,
                    index === Object.keys(product.specifications).length - 1 && styles.specRowLast
                  ]}
                >
                  <Text style={styles.specKey}>{key}</Text>
                  <Text style={styles.specValue}>{value}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Fixed Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || spacing.spaceMd }]}>
        <Pressable 
          style={({ pressed }) => [
            styles.primaryCta,
            isOutOfStock && styles.primaryCtaDisabled,
            pressed && !isOutOfStock && styles.pressed
          ]}
          disabled={isOutOfStock}
          onPress={() => product && addItem(product.id, product.price, product.currency)}
        >
          <Text style={[styles.primaryCtaText, isOutOfStock && styles.primaryCtaTextDisabled]}>
            {isOutOfStock ? 'Out of Stock' : isPreOrder ? 'Pre-Order Now' : 'Add to Cart'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.margin,
  },
  errorText: {
    ...typography.headlineSm,
    color: colors.onSurface,
    marginTop: spacing.spaceMd,
    marginBottom: spacing.spaceLg,
  },
  backButton: {
    paddingHorizontal: spacing.spaceXl,
    height: 48,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    ...typography.labelLg,
    color: colors.onSurface,
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.spaceSm,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  imageHero: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.surfaceContainerHighest,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heroBadge: {
    position: 'absolute',
    bottom: spacing.spaceLg,
    left: spacing.margin,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: spacing.spaceSm,
    paddingVertical: spacing.space2xs,
    borderRadius: radii.default,
  },
  heroBadgeText: {
    ...typography.labelTechnical,
    color: colors.onSurface,
    fontWeight: '600',
  },
  infoSection: {
    padding: spacing.margin,
  },
  manufacturer: {
    ...typography.labelTechnical,
    color: colors.outline,
    textTransform: 'uppercase',
    marginBottom: spacing.space2xs,
  },
  title: {
    ...typography.headlineXlMobile,
    color: colors.onSurface,
    marginBottom: spacing.spaceXs,
  },
  price: {
    ...typography.priceHero,
    color: colors.onSurface,
    marginBottom: spacing.spaceLg,
  },
  description: {
    ...typography.bodyLg,
    color: colors.onSurfaceVariant,
    lineHeight: 24,
  },
  specsSection: {
    paddingHorizontal: spacing.margin,
    marginTop: spacing.spaceLg,
  },
  specsHeader: {
    ...typography.labelTechnical,
    color: colors.outline,
    marginBottom: spacing.spaceSm,
  },
  specsContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.spaceMd,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  specRowLast: {
    borderBottomWidth: 0,
  },
  specKey: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    flex: 1,
  },
  specValue: {
    ...typography.bodyMd,
    color: colors.onSurface,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.spaceSm,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
  },
  primaryCta: {
    backgroundColor: colors.primaryContainer,
    height: 48,
    borderRadius: radii.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryCtaDisabled: {
    backgroundColor: colors.surfaceContainerHighest,
  },
  primaryCtaText: {
    ...typography.labelLg,
    color: colors.onPrimary,
  },
  primaryCtaTextDisabled: {
    color: colors.outline,
  }
});
