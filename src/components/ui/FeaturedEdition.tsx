import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, spacing, typography, radii } from '../../../theme';
import { useFeaturedProduct } from '../../application/hooks/useProducts';

export function FeaturedEdition() {
  const { data: product, isLoading } = useFeaturedProduct();

  if (isLoading || !product) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center', height: 400 }]}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  const specEntries = Object.entries(product.specifications);

  return (
    <View style={styles.container}>
      <Link href={`/product/${product.id}`} asChild>
        <Pressable style={styles.card}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.dot} />
              <Text style={styles.title}>Featured Edition</Text>
            </View>
            <Text style={styles.manufacturer}>{product.manufacturer}</Text>
          </View>
          
          <View style={styles.imageContainer}>
            <Image 
              source={product.images[0]}
              style={styles.image}
              contentFit="cover"
            />
            <Pressable style={({ pressed }) => [styles.wishlistBtn, pressed && styles.pressed]}>
              <MaterialIcons name="favorite-outline" size={20} color={colors.onSurface} />
            </Pressable>
            {product.badges && product.badges.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{product.badges[0]}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.content}>
            <Text style={styles.productName}>{product.title}</Text>
            
            <View style={styles.specsRow}>
              {specEntries.map(([key, value], index) => (
                <React.Fragment key={key}>
                  <Text style={styles.specText}>{value}</Text>
                  {index < specEntries.length - 1 && <View style={styles.specDot} />}
                </React.Fragment>
              ))}
            </View>
            
            <View style={styles.footer}>
              <View>
                <Text style={styles.priceLabel}>Price</Text>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              </View>
              <Pressable style={({ pressed }) => [styles.viewBtn, pressed && styles.pressed]}>
                <Text style={styles.viewBtnText}>View Details</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.margin,
    paddingBottom: spacing.space2xl,
  },
  card: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.xl,
    padding: spacing.spaceMd,
    gap: spacing.spaceMd,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.space2xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primaryContainer,
  },
  title: {
    ...typography.labelTechnical,
    color: colors.onSurface,
    fontWeight: '600',
  },
  manufacturer: {
    ...typography.labelTechnical,
    color: colors.outline,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: radii.xl,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wishlistBtn: {
    position: 'absolute',
    top: spacing.spaceSm,
    right: spacing.spaceSm,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // surfaceContainerLowest/90
    alignItems: 'center',
    justifyContent: 'center',
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
  badge: {
    position: 'absolute',
    bottom: spacing.spaceSm,
    left: spacing.spaceSm,
    paddingHorizontal: spacing.spaceXs,
    paddingVertical: spacing.space2xs,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: radii.default,
  },
  badgeText: {
    ...typography.labelTechnical,
    color: colors.onSurface,
    fontWeight: '500',
  },
  content: {
    gap: spacing.spaceXs,
    paddingTop: spacing.space2xs,
  },
  productName: {
    ...typography.headlineMd,
    color: colors.onSurface,
    lineHeight: 28,
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.space2xs,
    paddingTop: spacing.space2xs,
    flexWrap: 'wrap',
  },
  specText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  specDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.outlineVariant,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.spaceMd,
  },
  priceLabel: {
    ...typography.labelTechnical,
    color: colors.outline,
  },
  price: {
    ...typography.priceHero,
    color: colors.onSurface,
  },
  viewBtn: {
    paddingHorizontal: spacing.spaceLg,
    height: 44,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: radii.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtnText: {
    ...typography.labelMd,
    color: colors.onSurface,
  },
  pressed: {
    opacity: 0.7,
  }
});
