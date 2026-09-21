import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, typography, spacing, radii } from '../../../theme';

interface CartItemProps {
  id: string;
  index: number;
  title: string;
  manufacturer: string;
  specs: string;
  price: number;
  imageUrl: any;
  quantity: number;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

export function CartItem({
  id,
  index,
  title,
  manufacturer,
  specs,
  price,
  imageUrl,
  quantity,
  onIncrease,
  onDecrease,
  onRemove
}: CartItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.imageWrapper}>
          <Image source={imageUrl} style={styles.image} contentFit="contain" />
          <View style={styles.indexBadge}>
            <Text style={styles.indexText}>{index < 10 ? `0${index}` : index}</Text>
          </View>
        </View>
        
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.manufacturer}>{manufacturer}</Text>
              <Text style={styles.title} numberOfLines={2}>{title}</Text>
              <Text style={styles.specs}>{specs}</Text>
            </View>
            <Pressable onPress={() => onRemove(id)} style={styles.removeBtn}>
              <MaterialIcons name="delete-outline" size={20} color={colors.outline} />
            </Pressable>
          </View>
          
          <View style={styles.footer}>
            <View style={styles.quantityControl}>
              <Pressable onPress={() => onDecrease(id)} style={styles.qtyBtn}>
                <MaterialIcons name="remove" size={16} color={colors.onSurface} />
              </Pressable>
              <Text style={styles.qtyText}>{quantity}</Text>
              <Pressable onPress={() => onIncrease(id)} style={styles.qtyBtn}>
                <MaterialIcons name="add" size={16} color={colors.onSurface} />
              </Pressable>
            </View>
            
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>PRICE</Text>
              <Text style={styles.priceText}>${(price * quantity).toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.spaceMd,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.spaceMd,
  },
  imageWrapper: {
    width: 76,
    height: 76,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceContainerLow,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
  },
  indexBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: 'rgba(27,28,28,0.9)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  indexText: {
    ...typography.labelTechnical,
    color: colors.surfaceContainerLowest,
    fontSize: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  manufacturer: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
  },
  title: {
    ...typography.headlineSm,
    color: colors.onSurface,
    marginTop: 2,
  },
  specs: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  removeBtn: {
    padding: spacing.space2xs,
    marginRight: -spacing.space2xs,
    marginTop: -spacing.space2xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.spaceSm,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radii.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.surfaceContainerHigh,
    height: 36,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    ...typography.labelMd,
    color: colors.onSurface,
    minWidth: 28,
    textAlign: 'center',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    ...typography.labelTechnical,
    fontSize: 9,
    color: colors.onSurfaceVariant,
  },
  priceText: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.surfaceContainerHigh,
    marginTop: spacing.spaceMd,
  }
});
