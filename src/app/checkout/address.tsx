import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCheckout } from './_layout';
import { useAuth } from '../../application/hooks/useAuth';
import { typography, colors, spacing, radii } from '../../../theme';
import { Button } from '../../components/ui/Button';

export default function AddressScreen() {
  const insets = useSafeAreaInsets();
  const { address, setAddress } = useCheckout();
  const { user } = useAuth();

  const [form, setForm] = useState({
    fullName: address?.fullName || '',
    addressLine1: address?.addressLine1 || '',
    addressLine2: address?.addressLine2 || '',
    city: address?.city || '',
    state: address?.state || '',
    postalCode: address?.postalCode || '',
    country: address?.country || 'United States',
    phone: address?.phone || ''
  });

  // Prefill if authenticated and empty
  useEffect(() => {
    if (user && !form.fullName) {
      setForm(prev => ({
        ...prev,
        fullName: `${user.firstName} ${user.lastName}`.trim()
      }));
    }
  }, [user]);

  const handleNext = () => {
    // Validation
    if (!form.fullName || !form.addressLine1 || !form.city || !form.state || !form.postalCode || !form.country) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    setAddress({
      ...form,
      id: address?.id || `addr_${Date.now()}`
    });

    router.push('/checkout/shipping');
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
        <Text style={styles.headerTitle}>Delivery Details</Text>
        <Text style={styles.headerSubtitle}>Where should we send your order?</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput 
              style={styles.input} 
              value={form.fullName}
              onChangeText={t => setForm({ ...form, fullName: t })}
              placeholder="John Doe"
              placeholderTextColor={colors.outline}
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address Line 1 *</Text>
            <TextInput 
              style={styles.input} 
              value={form.addressLine1}
              onChangeText={t => setForm({ ...form, addressLine1: t })}
              placeholder="123 Innovation Drive"
              placeholderTextColor={colors.outline}
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address Line 2</Text>
            <TextInput 
              style={styles.input} 
              value={form.addressLine2}
              onChangeText={t => setForm({ ...form, addressLine2: t })}
              placeholder="Apt 4B"
              placeholderTextColor={colors.outline}
              autoCorrect={false}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: spacing.spaceMd }]}>
              <Text style={styles.label}>City *</Text>
              <TextInput 
                style={styles.input} 
                value={form.city}
                onChangeText={t => setForm({ ...form, city: t })}
                placeholder="San Francisco"
                placeholderTextColor={colors.outline}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>State / Region *</Text>
              <TextInput 
                style={styles.input} 
                value={form.state}
                onChangeText={t => setForm({ ...form, state: t })}
                placeholder="CA"
                placeholderTextColor={colors.outline}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: spacing.spaceMd }]}>
              <Text style={styles.label}>Postal Code *</Text>
              <TextInput 
                style={styles.input} 
                value={form.postalCode}
                onChangeText={t => setForm({ ...form, postalCode: t })}
                placeholder="94105"
                placeholderTextColor={colors.outline}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Country *</Text>
              <TextInput 
                style={styles.input} 
                value={form.country}
                onChangeText={t => setForm({ ...form, country: t })}
                placeholder="United States"
                placeholderTextColor={colors.outline}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput 
              style={styles.input} 
              value={form.phone}
              onChangeText={t => setForm({ ...form, phone: t })}
              placeholder="+1 (555) 000-0000"
              placeholderTextColor={colors.outline}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Button label="Continue to Shipping" onPress={handleNext} />
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
  footer: {
    marginTop: spacing.space3xl,
  }
});
