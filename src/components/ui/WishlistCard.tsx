import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle, Platform } from 'react-native';
import { Image } from 'expo-image';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, typography, spacing, radii } from '../../../theme';

interface WishlistCardProps {
  id: string;
  title: string;
  manufacturer: string;
  price: number;
  imageUrl: any;
  inStock?: boolean;
  style?: ViewStyle;
  onActionPress?: () => void;
}

export function WishlistCard({ id, title, manufacturer, price, imageUrl, inStock = true, style, onActionPress }: WishlistCardProps) {
  return (
    <View style={[styles.container, style, !inStock && styles.containerOutOfStock]}>
      <View style={styles.imageContainer}>
        <Image 
          source={imageUrl} 
          style={[styles.image, !inStock && styles.outOfStockImage]} 
          contentFit="contain" 
        />
        
        <View style={[styles.badge, inStock ? styles.badgeInStock : styles.badgeOutOfStock]}>
          <Text style={[styles.badgeText, inStock ? styles.badgeTextInStock : styles.badgeTextOutOfStock]}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>

        <Pressable style={({ pressed }) => [styles.wishlistBtn, pressed && styles.pressed]}>
          <MaterialIcons name="favorite" size={20} color={colors.tertiary} />
        </Pressable>
      </View>
      
      <View style={styles.content}>
        <View style={styles.infoGroup}>
          <Text style={styles.manufacturer} numberOfLines={1}>{manufacturer}</Text>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <View style={styles.priceRow}>
            <Text style={[styles.price, !inStock && styles.priceOutOfStock]}>${price.toFixed(2)}</Text>
          </View>
          
          {!inStock && (
            <View style={styles.expectedRow}>
              <MaterialIcons name="schedule" size={13} color={colors.onSurfaceVariant} />
              <Text style={styles.expectedText}>Expected next week</Text>
            </View>
          )}
        </View>
        
        <View style={styles.actionContainer}>
          {inStock ? (
            <Pressable 
              style={({ pressed }) => [styles.actionBtn, styles.btnInStock, pressed && styles.btnPressed]}
              onPress={onActionPress}
            >
              <MaterialIcons name="shopping-bag" size={18} color={colors.surface} />
              <Text style={styles.btnTextInStock}>Move to Cart</Text>
            </Pressable>
          ) : (
            <Pressable 
              style={({ pressed }) => [styles.actionBtn, styles.btnOutOfStock, pressed && styles.btnPressed]}
              onPress={onActionPress}
            >
              <MaterialIcons name="notifications" size={18} color={colors.onSurface} />
              <Text style={styles.btnTextOutOfStock}>Notify Me</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.xl,
    overflow: 'hidden',
    flexDirection: 'column',
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
  containerOutOfStock: {
    opacity: 0.9,
  },
  imageContainer: {
    backgroundColor: colors.surfaceContainer,
    aspectRatio: 1,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  outOfStockImage: {
    opacity: 0.5,
  },
  badge: {
    position: 'absolute',
    top: spacing.spaceXs,
    left: spacing.spaceXs,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.default,
  },
  badgeInStock: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  badgeOutOfStock: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  badgeText: {
    ...typography.labelTechnical,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  badgeTextInStock: {
    color: colors.onSurface,
  },
  badgeTextOutOfStock: {
    color: colors.onSurfaceVariant,
  },
  wishlistBtn: {
    position: 'absolute',
    bottom: spacing.spaceXs,
    right: spacing.spaceXs,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerLowest,
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
        elevation: 2,
      },
    }),
  },
  pressed: {
    opacity: 0.7,
  },
  content: {
    flex: 1,
    padding: spacing.spaceSm,
    justifyContent: 'space-between',
    gap: spacing.spaceXs,
  },
  infoGroup: {
    flexDirection: 'column',
  },
  manufacturer: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.headlineSm,
    color: colors.onSurface,
    marginTop: spacing.space2xs,
    lineHeight: 22, // snug
  },
  priceRow: {
    marginTop: spacing.spaceXs,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    ...typography.priceHero,
    color: colors.onSurface,
    fontSize: 20, // slightly smaller to fit grid
  },
  priceOutOfStock: {
    color: colors.onSurfaceVariant,
  },
  expectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.space2xs,
  },
  expectedText: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  actionContainer: {
    paddingTop: spacing.spaceXs,
  },
  actionBtn: {
    height: 40,
    borderRadius: radii.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.space2xs,
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
  btnInStock: {
    backgroundColor: colors.onSurface,
  },
  btnOutOfStock: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  btnTextInStock: {
    ...typography.labelMd,
    color: colors.surface,
  },
  btnTextOutOfStock: {
    ...typography.labelMd,
    color: colors.onSurface,
  },
  btnPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  }
});
