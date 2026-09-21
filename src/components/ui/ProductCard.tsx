import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle, Platform } from 'react-native';
import { Image } from 'expo-image';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, typography, spacing, radii } from '../../../theme';

interface ProductCardProps {
  id: string;
  title: string;
  manufacturer: string;
  price: number;
  imageUrl: any; // local require or string url
  badge?: string;
  style?: ViewStyle;
}

import { Link } from 'expo-router';
import { useWishlist } from '../../application/hooks/useWishlist';

export function ProductCard({ id, title, manufacturer, price, imageUrl, badge, style }: ProductCardProps) {
  const { toggleItem, items: wishlistItems } = useWishlist();
  const isWishlisted = wishlistItems.some(item => item.productId === id);

  return (
    <Link href={`/product/${id}`} asChild>
      <Pressable style={({ pressed }) => [styles.container, style, pressed && styles.pressed]}>
        <View style={styles.imageContainer}>
          <Image source={imageUrl} style={styles.image} contentFit="cover" />
          
          {badge && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
          
          <Pressable 
            style={({ pressed }) => [styles.wishlistBtn, pressed && styles.pressed]}
            onPress={() => toggleItem(id)}
          >
            <MaterialIcons 
              name={isWishlisted ? "favorite" : "favorite-outline"} 
              size={16} 
              color={isWishlisted ? colors.error : colors.onSurface} 
            />
          </Pressable>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.manufacturer}>{manufacturer}</Text>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.xl,
    padding: spacing.spaceXs,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  pressed: {
    opacity: 0.7,
  },
  imageContainer: {
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: radii.lg,
    aspectRatio: 1,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: radii.default,
  },
  badgeText: {
    fontFamily: typography.labelTechnical.fontFamily,
    fontSize: 9,
    letterSpacing: 0.12 * 9,
    fontWeight: '500',
    color: colors.onSurface,
    textTransform: 'uppercase',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.space2xs,
    paddingTop: spacing.spaceXs,
  },
  manufacturer: {
    ...typography.labelTechnical,
    color: colors.outline,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.headlineSm,
    fontSize: 14,
    lineHeight: 14 * 1.4, // snugh
    fontWeight: '500',
    color: colors.onSurface,
    marginTop: spacing.space2xs,
  },
  price: {
    ...typography.priceHero,
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
    marginTop: spacing.spaceXs,
  },
});
