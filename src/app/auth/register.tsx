import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, router, Link } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, typography, spacing, radii } from '../../../theme';
import { useAuth } from '../../application/hooks/useAuth';

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const { register, isLoading, error } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = firstName && lastName && email && password && password.length >= 6;

  const handleRegister = async () => {
    if (!isFormValid) return;
    const success = await register(
      { firstName, lastName, email },
      password
    );
    if (success) {
      router.replace('/(tabs)/account');
    }
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join ElectroStore to unlock personalized recommendations, seamless checkout, and priority support.</Text>
        </View>

        <View style={styles.form}>
          {error ? (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={20} color={colors.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.nameRow}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                editable={!isLoading}
                placeholder="Helena"
                placeholderTextColor={colors.outline}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                editable={!isLoading}
                placeholder="Vance"
                placeholderTextColor={colors.outline}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
              placeholder="helena.vance@example.com"
              placeholderTextColor={colors.outline}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              editable={!isLoading}
              placeholder="Min. 6 characters"
              placeholderTextColor={colors.outline}
            />
          </View>

          <Pressable 
            style={({ pressed }) => [
              styles.primaryBtn,
              (!isFormValid || isLoading) && styles.primaryBtnDisabled,
              pressed && isFormValid && !isLoading && styles.pressed
            ]}
            onPress={handleRegister}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.onPrimary} />
            ) : (
              <Text style={styles.primaryBtnText}>Create Account</Text>
            )}
          </Pressable>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Link href="/auth/login" asChild>
              <Pressable>
                <Text style={styles.loginLink}>Sign In</Text>
              </Pressable>
            </Link>
          </View>
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
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spaceSm,
    backgroundColor: 'rgba(186, 26, 26, 0.1)',
    padding: spacing.spaceMd,
    borderRadius: radii.md,
  },
  errorText: {
    ...typography.bodySm,
    color: colors.error,
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    gap: spacing.spaceMd,
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
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.spaceXl,
  },
  loginText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  loginLink: {
    ...typography.labelLg,
    color: colors.primaryContainer,
  },
});
