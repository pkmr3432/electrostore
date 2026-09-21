import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, router, Link } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, typography, spacing, radii } from '../../../theme';
import { useAuth } from '../../application/hooks/useAuth';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { login, isLoading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return;
    const success = await login(email, password);
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
              <MaterialIcons name="close" size={24} color={colors.onSurface} />
            </Pressable>
          ),
        }} 
      />

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 80, paddingBottom: insets.bottom + spacing.space3xl }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to access your ElectroStore account, saved items, and order history.</Text>
        </View>

        <View style={styles.form}>
          {error ? (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={20} color={colors.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

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
              placeholder="••••••••"
              placeholderTextColor={colors.outline}
            />
          </View>

          <View style={styles.forgotPasswordRow}>
            <Link href="/auth/forgot-password" asChild>
              <Pressable>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </Pressable>
            </Link>
          </View>

          <Pressable 
            style={({ pressed }) => [
              styles.primaryBtn,
              (!email || !password || isLoading) && styles.primaryBtnDisabled,
              pressed && email && password && !isLoading && styles.pressed
            ]}
            onPress={handleLogin}
            disabled={!email || !password || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.onPrimary} />
            ) : (
              <Text style={styles.primaryBtnText}>Sign In</Text>
            )}
          </Pressable>

          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <Link href="/auth/register" asChild>
              <Pressable>
                <Text style={styles.registerLink}>Create Account</Text>
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
  forgotPasswordRow: {
    alignItems: 'flex-end',
    marginTop: -spacing.spaceSm,
  },
  forgotPasswordText: {
    ...typography.labelMd,
    color: colors.primaryContainer,
  },
  primaryBtn: {
    height: 56,
    backgroundColor: colors.onSurface,
    borderRadius: radii.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.spaceMd,
  },
  primaryBtnDisabled: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  primaryBtnText: {
    ...typography.labelLg,
    color: colors.surface,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.spaceXl,
  },
  registerText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  registerLink: {
    ...typography.labelLg,
    color: colors.primaryContainer,
  },
});
