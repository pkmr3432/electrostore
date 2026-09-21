import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, typography, spacing, radii } from '../../../theme';

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
        }} 
      />

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 80, paddingBottom: insets.bottom + spacing.space3xl }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>Enter the email address associated with your account, and we'll send you a link to reset your password.</Text>
        </View>

        {isSubmitted ? (
          <View style={styles.successContainer}>
            <MaterialIcons name="check-circle-outline" size={48} color={colors.primaryContainer} />
            <Text style={styles.successTitle}>Check your email</Text>
            <Text style={styles.successBody}>We've sent a password reset link to {email}. (Note: This is a mock flow, no actual email was sent).</Text>
            <Pressable 
              style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
              onPress={() => router.back()}
            >
              <Text style={styles.primaryBtnText}>Return to Login</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="helena.vance@example.com"
                placeholderTextColor={colors.outline}
              />
            </View>

            <Pressable 
              style={({ pressed }) => [
                styles.primaryBtn,
                !email && styles.primaryBtnDisabled,
                pressed && email && styles.pressed
              ]}
              onPress={handleSubmit}
              disabled={!email}
            >
              <Text style={styles.primaryBtnText}>Send Reset Link</Text>
            </Pressable>
          </View>
        )}
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
    flexGrow: 1,
    paddingHorizontal: spacing.margin,
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.spaceSm,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  header: {
    marginBottom: spacing.space2xl,
  },
  title: {
    ...typography.headlineLg,
    color: colors.onSurface,
    marginBottom: spacing.spaceSm,
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  form: {
    gap: spacing.spaceLg,
  },
  successContainer: {
    alignItems: 'center',
    gap: spacing.spaceMd,
    marginTop: spacing.spaceXl,
  },
  successTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  successBody: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: spacing.spaceLg,
  },
  inputGroup: {
    gap: spacing.spaceXs,
  },
  label: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
  },
  input: {
    ...typography.bodyLg,
    height: 56,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radii.md,
    paddingHorizontal: spacing.spaceMd,
    color: colors.onSurface,
    backgroundColor: colors.surfaceContainerLowest,
  },
  primaryBtn: {
    height: 56,
    width: '100%',
    backgroundColor: colors.onSurface,
    borderRadius: radii.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.spaceSm,
  },
  primaryBtnDisabled: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  primaryBtnText: {
    ...typography.labelLg,
    color: colors.surface,
  },
});
