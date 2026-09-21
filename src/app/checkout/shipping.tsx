import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCheckout } from './_layout';
import { typography, colors, spacing, radii } from '../../../theme';
import { Button } from '../../components/ui/Button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ShippingMethod } from '../../domain/models';

const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'sm_standard',
    label: 'Standard Shipping',
    price: 0,
    estimatedDelivery: '3-5 Business Days'
  },
  {
    id: 'sm_express',
    label: 'Express Priority',
    price: 15,
    estimatedDelivery: '1-2 Business Days'
  }
];

export default function ShippingScreen() {
  const insets = useSafeAreaInsets();
  const { shippingMethod, setShippingMethod } = useCheckout();
  
  const [selected, setSelected] = useState<string | null>(shippingMethod?.id || null);

  const handleNext = () => {
    if (!selected) {
      Alert.alert('Selection Required', 'Please choose a shipping method.');
      return;
    }

    const method = SHIPPING_METHODS.find(m => m.id === selected);
    if (method) {
      setShippingMethod(method);
      router.push('/checkout/payment');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + spacing.space3xl }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerTitle}>Shipping Method</Text>
        <Text style={styles.headerSubtitle}>Choose how quickly you'd like your order to arrive.</Text>

        <View style={styles.optionsContainer}>
          {SHIPPING_METHODS.map(method => (
            <Pressable 
              key={method.id} 
              style={[
                styles.optionCard, 
                selected === method.id && styles.optionCardSelected
              ]}
              onPress={() => setSelected(method.id)}
            >
              <View style={styles.optionHeader}>
                <View style={styles.radioContainer}>
                  <MaterialIcons 
                    name={selected === method.id ? 'radio-button-checked' : 'radio-button-unchecked'} 
                    size={24} 
                    color={selected === method.id ? colors.onSurface : colors.outline} 
                  />
                  <Text style={[styles.optionLabel, selected === method.id && styles.optionLabelSelected]}>
                    {method.label}
                  </Text>
                </View>
                <Text style={styles.optionPrice}>
                  {method.price === 0 ? 'FREE' : `$${method.price.toFixed(2)}`}
                </Text>
              </View>
              <Text style={styles.optionDelivery}>
                Estimated: {method.estimatedDelivery}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.footer}>
          <Button label="Continue to Payment" onPress={handleNext} />
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
  },
  headerSubtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    marginTop: spacing.spaceXs,
    marginBottom: spacing.space2xl,
  },
  optionsContainer: {
    gap: spacing.spaceMd,
  },
  optionCard: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.surfaceContainerHighest,
    borderRadius: radii.md,
    padding: spacing.spaceLg,
    backgroundColor: colors.surface,
  },
  optionCardSelected: {
    borderColor: colors.onSurface,
    backgroundColor: colors.surfaceContainerLowest,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.spaceXs,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spaceSm,
  },
  optionLabel: {
    ...typography.bodyLg,
    color: colors.onSurfaceVariant,
  },
  optionLabelSelected: {
    color: colors.onSurface,
    fontWeight: '600',
  },
  optionPrice: {
    ...typography.bodyLg,
    color: colors.onSurface,
    fontWeight: '600',
  },
  optionDelivery: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginLeft: 32, // align with text, bypassing radio button
  },
  footer: {
    marginTop: spacing.space3xl,
  }
});
