import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { typography, colors, spacing } from '../../../theme';
import { Header } from '../../components/layout/Header';
import { CategoryPill } from '../../components/ui/CategoryPill';
import { ProductCard } from '../../components/ui/ProductCard';
import { SearchBar } from '../../components/ui/SearchBar';
import { EditorialStatement } from '../../components/ui/EditorialStatement';
import { HeroShowcase } from '../../components/ui/HeroShowcase';
import { FeaturedEdition } from '../../components/ui/FeaturedEdition';
import { CuratorialNote } from '../../components/ui/CuratorialNote';
import { useNewArrivals } from '../../application/hooks/useProducts';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { data: newArrivals = [], isLoading } = useNewArrivals();

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 56, paddingBottom: 56 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Pressable onPress={() => router.push('/search')}>
            <SearchBar interactive={false} />
          </Pressable>
        </View>

        {/* Editorial Statement */}
        <EditorialStatement />

        {/* Hero Showcase */}
        <HeroShowcase />

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.categoriesHeader}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.categoriesScroll}
          >
            <CategoryPill label="All" isActive onPress={() => {}} style={styles.categoryPill} />
            <CategoryPill label="Audio" onPress={() => {}} style={styles.categoryPill} />
            <CategoryPill label="Computing" onPress={() => {}} style={styles.categoryPill} />
            <CategoryPill label="Smartphones" onPress={() => {}} style={styles.categoryPill} />
            <CategoryPill label="Accessories" onPress={() => {}} style={styles.categoryPill} />
          </ScrollView>
        </View>

        {/* Featured Edition */}
        <FeaturedEdition />

        {/* New Arrivals Header */}
        <View style={styles.newArrivalsSection}>
          <View style={styles.newArrivalsHeaderBox}>
            <View style={styles.newArrivalsTitleContainer}>
              <MaterialIcons name="auto-awesome" size={18} color={colors.onSurface} />
              <Text style={styles.newArrivalsTitle}>New Arrivals</Text>
            </View>
            <Text style={styles.newArrivalsCount}>{newArrivals.length} Items</Text>
          </View>
        </View>

        {/* New Arrivals Grid */}
        {isLoading ? (
          <View style={[styles.productGrid, { justifyContent: 'center', paddingVertical: spacing.space2xl }]}>
             <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          <View style={styles.productGrid}>
            {newArrivals.map(product => (
              <View key={product.id} style={styles.gridItem}>
                <ProductCard 
                  id={product.id}
                  title={product.title}
                  manufacturer={product.manufacturer}
                  price={product.price}
                  imageUrl={product.images[0]}
                  badge={product.badges && product.badges.length > 0 ? product.badges[0] : undefined}
                />
              </View>
            ))}
          </View>
        )}

        {/* Curatorial Note */}
        <CuratorialNote />

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
    flexGrow: 1,
  },
  searchContainer: {
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.spaceXs,
    paddingBottom: spacing.spaceSm,
    backgroundColor: colors.surface,
  },
  categoriesSection: {
    paddingBottom: spacing.spaceLg,
  },
  categoriesHeader: {
    ...typography.labelTechnical,
    color: colors.outline,
    paddingHorizontal: spacing.margin,
    paddingBottom: spacing.spaceXs,
  },
  categoriesScroll: {
    paddingHorizontal: spacing.margin,
    paddingBottom: spacing.space2xs,
  },
  categoryPill: {
    marginRight: spacing.spaceXs,
  },
  newArrivalsSection: {
    paddingHorizontal: spacing.margin,
    paddingBottom: spacing.spaceMd,
  },
  newArrivalsHeaderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.spaceXs,
    paddingHorizontal: spacing.spaceSm,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 8, // lg
  },
  newArrivalsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spaceXs,
  },
  newArrivalsTitle: {
    ...typography.labelTechnical,
    color: colors.onSurface,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  newArrivalsCount: {
    ...typography.labelTechnical,
    color: colors.outline,
    textTransform: 'uppercase',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.margin - (spacing.spaceSm / 2),
    paddingBottom: spacing.space2xl,
  },
  gridItem: {
    width: '50%',
    padding: spacing.spaceSm / 2,
  },
});
