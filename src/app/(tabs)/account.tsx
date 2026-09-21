import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Platform } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { typography, colors, spacing, radii } from '../../../theme';

import { useAuth } from '../../application/hooks/useAuth';
import { router } from 'expo-router';

function NavItem({ icon, title, subtitle, badge, extra }: any) {
  return (
    <Pressable style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}>
      <View style={styles.navItemLeft}>
        <View style={styles.navIconContainer}>
          <MaterialIcons name={icon} size={20} color={colors.onSurface} />
        </View>
        <View style={styles.navItemTextContent}>
          <Text style={styles.navItemTitle} numberOfLines={1}>{title}</Text>
          <Text style={styles.navItemSubtitle} numberOfLines={1}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.navItemRight}>
        {extra && <Text style={styles.navItemExtra}>{extra}</Text>}
        {badge !== undefined && (
          <View style={styles.navBadge}>
            <Text style={styles.navBadgeText}>{badge}</Text>
          </View>
        )}
        <MaterialIcons name="chevron-right" size={18} color={colors.onSurfaceVariant} />
      </View>
    </Pressable>
  );
}

export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  const { user, isAuthenticated, logout } = useAuth();

  const handleSignOut = () => {
    Alert.alert('Confirm Sign Out', `Confirm termination of session for ${user?.firstName}?`, [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Sign Out', 
        style: 'destructive', 
        onPress: async () => {
          await logout();
        } 
      }
    ]);
  };

  const renderUnauthenticated = () => (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + spacing.spaceMd, paddingBottom: 56 + insets.bottom + spacing.space3xl }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.subhead}>Overview</Text>
          <Text style={styles.title}>My Account</Text>
        </View>
      </View>

      <View style={styles.unauthContainer}>
        <View style={styles.unauthIconContainer}>
          <MaterialIcons name="person-outline" size={48} color={colors.primaryContainer} />
        </View>
        <Text style={styles.unauthTitle}>Join ElectroStore</Text>
        <Text style={styles.unauthSubtitle}>Sign in to sync your wishlist, track orders, and access personalized experiences.</Text>
        
        <Pressable 
          style={({ pressed }) => [styles.unauthBtn, styles.unauthBtnPrimary, pressed && styles.pressed]}
          onPress={() => router.push('/auth/login')}
        >
          <Text style={styles.unauthBtnTextPrimary}>Sign In</Text>
        </Pressable>

        <Pressable 
          style={({ pressed }) => [styles.unauthBtn, styles.unauthBtnSecondary, pressed && styles.pressed]}
          onPress={() => router.push('/auth/register')}
        >
          <Text style={styles.unauthBtnTextSecondary}>Create Account</Text>
        </Pressable>
      </View>
    </ScrollView>
  );

  if (!isAuthenticated || !user) {
    return renderUnauthenticated();
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + spacing.spaceMd, paddingBottom: 56 + insets.bottom + spacing.space3xl }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.subhead}>Overview</Text>
          <Text style={styles.title}>My Account</Text>
        </View>
        <Pressable style={({ pressed }) => [styles.settingsBtn, pressed && styles.pressed]}>
          <MaterialIcons name="settings" size={20} color={colors.onSurface} />
        </Pressable>
      </View>

      {/* Profile Card */}
      <View style={styles.section}>
        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarFallbackText}>{user.firstName[0]}{user.lastName[0]}</Text>
              </View>
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.name} numberOfLines={1}>{user.firstName} {user.lastName}</Text>
                {user.isVerified && <MaterialIcons name="verified" size={16} color={colors.primaryContainer} />}
              </View>
              <Text style={styles.email} numberOfLines={1}>{user.email}</Text>
              {user.isVerified ? (
                <View style={styles.verifiedBadge}>
                  <View style={styles.verifiedDot} />
                  <Text style={styles.verifiedText}>Verified Member</Text>
                </View>
              ) : (
                <View style={[styles.verifiedBadge, { backgroundColor: colors.surfaceContainer }]}>
                  <View style={[styles.verifiedDot, { backgroundColor: colors.outline }]} />
                  <Text style={[styles.verifiedText, { color: colors.onSurfaceVariant }]}>Unverified Email</Text>
                </View>
              )}
            </View>
          </View>
          
          <View style={styles.profileStats}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Orders</Text>
              <View style={styles.statValueRow}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statValueLabel}>Orders</Text>
              </View>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Saved</Text>
              <View style={styles.statValueRow}>
                <Text style={styles.statValue}>04</Text>
                <Text style={styles.statValueLabel}>Saved</Text>
              </View>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Devices</Text>
              <View style={styles.statValueRow}>
                <Text style={styles.statValue}>03</Text>
                <Text style={styles.statValueLabel}>Devices</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Recent Order */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Order</Text>
          <Text style={styles.sectionAction}>View All Orders</Text>
        </View>
        <View style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <View style={styles.orderIdRow}>
              <MaterialIcons name="local-shipping" size={18} color={colors.primaryContainer} />
              <Text style={styles.orderId}>Order #ES-9042</Text>
            </View>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Delivered</Text>
            </View>
          </View>
          <View style={styles.orderContent}>
            <View>
              <Text style={styles.orderItemName}>Atelier Series 1 Display Unit</Text>
              <Text style={styles.orderDate}>Delivered on Sep 14, 2024</Text>
            </View>
            <Text style={styles.orderPrice}>$499.00</Text>
          </View>
          <View style={styles.orderFooter}>
            <View style={styles.skuRow}>
              <MaterialIcons name="qr-code-2" size={16} color={colors.onSurfaceVariant} />
              <Text style={styles.sku}>SKU: AT-904-SLV</Text>
            </View>
            <Pressable>
              <Text style={styles.trackBtn}>Track Order</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Navigation Modules */}
      <View style={styles.section}>
        <Text style={styles.navSectionTitle}>Account Settings</Text>
        <View style={styles.navCard}>
          <NavItem 
            icon="inventory-2" 
            title="My Orders" 
            subtitle="Purchase history, invoices, and tracking"
            badge="12"
          />
          <View style={styles.divider} />
          <NavItem 
            icon="location-on" 
            title="Shipping Addresses" 
            subtitle="Manage primary and secondary shipping locations"
          />
          <View style={styles.divider} />
          <NavItem 
            icon="credit-card" 
            title="Payment Methods" 
            subtitle="Saved cards and billing information"
            extra="Default: •••• 4091"
          />
          <View style={styles.divider} />
          <NavItem 
            icon="devices" 
            title="Registered Devices & Warranties" 
            subtitle="Serial numbers, warranty status & coverage"
          />
          <View style={styles.divider} />
          <NavItem 
            icon="notifications" 
            title="Notifications & Preferences" 
            subtitle="Order updates, releases and marketing"
          />
        </View>
      </View>

      {/* Priority Care Banner */}
      <View style={styles.section}>
        <View style={styles.careCard}>
          <View style={styles.careContent}>
            <Text style={styles.careSubhead}>Priority Care</Text>
            <Text style={styles.careTitle}>ElectroStore Customer Care</Text>
            <Text style={styles.careBody}>24/7 direct assistance with orders, warranties, and device setup.</Text>
          </View>
          <Pressable style={({ pressed }) => [styles.careBtn, pressed && styles.pressed]}>
            <Text style={styles.careBtnText}>Contact Support</Text>
          </Pressable>
        </View>
      </View>

      {/* Sign Out */}
      <View style={[styles.section, { marginBottom: spacing.spaceXl }]}>
        <Pressable 
          onPress={handleSignOut}
          style={({ pressed }) => [styles.signOutBtn, pressed && styles.navItemPressed]}
        >
          <View style={styles.signOutLeft}>
            <View style={styles.signOutIcon}>
              <MaterialIcons name="logout" size={20} color={colors.error} />
            </View>
            <View>
              <Text style={styles.signOutTitle}>Sign Out</Text>
              <Text style={styles.signOutSubtitle}>Sign out of your account</Text>
            </View>
          </View>
          <MaterialIcons name="arrow-forward" size={18} color={colors.error} />
        </Pressable>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerVersion}>
          <View style={styles.versionDot} />
          <Text style={styles.versionText}>ElectroStore App v2.4.0</Text>
        </View>
        <Text style={styles.footerLinks}>Terms of Service & Privacy Policy</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.margin,
    paddingBottom: spacing.spaceSm,
  },
  subhead: {
    ...typography.labelTechnical,
    color: colors.secondary,
  },
  title: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  settingsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    transform: [{ scale: 0.95 }],
  },
  section: {
    paddingHorizontal: spacing.margin,
    marginBottom: spacing.spaceLg,
  },
  profileCard: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.spaceMd,
    borderRadius: radii.xl,
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
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spaceMd,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surfaceContainerHighest,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spaceXs,
  },
  name: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  email: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceContainerHigh,
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: spacing.space2xs,
  },
  verifiedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primaryContainer,
  },
  verifiedText: {
    ...typography.labelTechnical,
    fontSize: 9,
  },
  profileStats: {
    flexDirection: 'row',
    gap: spacing.spaceXs,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.surfaceContainer,
    paddingTop: spacing.spaceXs,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    padding: spacing.spaceXs,
    borderRadius: radii.default,
  },
  statLabel: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 2,
  },
  statValue: {
    ...typography.priceHero,
    color: colors.onSurface,
  },
  statValueLabel: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.space2xs,
  },
  sectionTitle: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
  },
  sectionAction: {
    ...typography.labelTechnical,
    color: colors.primaryContainer,
  },
  orderCard: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.spaceMd,
    borderRadius: radii.xl,
    gap: spacing.spaceXs,
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spaceXs,
  },
  orderId: {
    ...typography.labelLg,
    color: colors.onSurface,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.default,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primaryContainer,
  },
  statusText: {
    ...typography.labelTechnical,
    fontSize: 9,
    color: colors.onSurface,
  },
  orderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.space2xs,
  },
  orderItemName: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  orderDate: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  orderPrice: {
    ...typography.priceHero,
    color: colors.onSurface,
  },
  orderFooter: {
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: spacing.spaceSm,
    paddingVertical: spacing.spaceXs,
    borderRadius: radii.default,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.space2xs,
  },
  skuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sku: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
  },
  trackBtn: {
    ...typography.labelTechnical,
    color: colors.primaryContainer,
  },
  navSectionTitle: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    paddingHorizontal: spacing.space2xs,
    marginBottom: spacing.spaceXs,
  },
  navCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radii.xl,
    overflow: 'hidden',
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
  navItem: {
    padding: spacing.spaceMd,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navItemPressed: {
    backgroundColor: colors.surfaceContainerLow,
  },
  navItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spaceMd,
    flex: 1,
    flexShrink: 1,
  },
  navIconContainer: {
    width: 36,
    height: 36,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  navItemTextContent: {
    flex: 1,
    flexShrink: 1,
  },
  navItemTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  navItemSubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  navItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.space2xs,
    paddingLeft: spacing.spaceXs,
    flexShrink: 0,
  },
  navItemExtra: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
  },
  navBadge: {
    backgroundColor: colors.primaryContainer,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBadgeText: {
    ...typography.labelTechnical,
    fontSize: 9,
    color: colors.onPrimary,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.surfaceContainer,
    marginHorizontal: spacing.spaceMd,
  },
  careCard: {
    backgroundColor: colors.surfaceContainer,
    padding: spacing.spaceMd,
    borderRadius: radii.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  careContent: {
    flex: 1,
    paddingRight: spacing.spaceSm,
  },
  careSubhead: {
    ...typography.labelTechnical,
    color: colors.primaryContainer,
  },
  careTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
    marginTop: 2,
  },
  careBody: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  careBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.onSurface,
    borderRadius: radii.lg,
  },
  careBtnText: {
    ...typography.labelTechnical,
    color: colors.surfaceContainerLowest,
  },
  signOutBtn: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.spaceMd,
    borderRadius: radii.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  signOutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spaceMd,
  },
  signOutIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.lg,
    backgroundColor: 'rgba(186, 26, 26, 0.1)', // errorContainer / 30% roughly
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutTitle: {
    ...typography.headlineSm,
    color: colors.error,
  },
  signOutSubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing.spaceLg,
    gap: 4,
  },
  footerVersion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.space2xs,
  },
  versionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primaryContainer,
  },
  versionText: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
  },
  footerLinks: {
    ...typography.bodySm,
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  unauthContainer: {
    alignItems: 'center',
    padding: spacing.spaceXl,
    marginTop: spacing.space2xl,
  },
  unauthIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.spaceLg,
  },
  unauthTitle: {
    ...typography.headlineLg,
    color: colors.onSurface,
    marginBottom: spacing.spaceSm,
    textAlign: 'center',
  },
  unauthSubtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: spacing.space2xl,
  },
  unauthBtn: {
    width: '100%',
    height: 56,
    borderRadius: radii.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.spaceMd,
  },
  unauthBtnPrimary: {
    backgroundColor: colors.onSurface,
  },
  unauthBtnTextPrimary: {
    ...typography.labelLg,
    color: colors.surface,
  },
  unauthBtnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  unauthBtnTextSecondary: {
    ...typography.labelLg,
    color: colors.onSurface,
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFallbackText: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
});
