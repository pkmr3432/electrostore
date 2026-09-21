import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { typography, colors, spacing, radii } from '../../../theme';
import { SearchBar } from '../../components/ui/SearchBar';
import { CategoryPill } from '../../components/ui/CategoryPill';
import { ProductCard } from '../../components/ui/ProductCard';
import { useSearch, useCategories } from '../../application/hooks/useProducts';
import { ProductSort } from '../../domain/repositories';

// Simple debounce utility to avoid external dependencies
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ q?: string; category?: string; stock?: string; sort?: ProductSort }>();

  // Local state for the input field to allow fast typing before pushing to URL params
  const [localQuery, setLocalQuery] = useState(params.q || '');
  const debouncedQuery = useDebounce(localQuery, 300);

  // Sync debounced query to URL
  useEffect(() => {
    if (debouncedQuery !== (params.q || '')) {
      router.setParams({ q: debouncedQuery || '' });
    }
  }, [debouncedQuery, params.q]);

  // Fetch Categories for filters
  const { data: categories = [] } = useCategories();

  // Fetch Search Results
  const { data: products = [], isLoading, error } = useSearch(
    params.q || '',
    {
      categoryId: params.category || undefined,
      inStockOnly: params.stock === 'in-stock',
    },
    params.sort
  );

  const handleCategoryPress = (categoryId: string) => {
    const newCategory = params.category === categoryId ? '' : categoryId;
    router.setParams({ category: newCategory });
  };

  const handleStockToggle = () => {
    const newStock = params.stock === 'in-stock' ? '' : 'in-stock';
    router.setParams({ stock: newStock });
  };

  const handleSortToggle = () => {
    let nextSort = '';
    if (!params.sort || params.sort === 'DEFAULT') nextSort = 'PRICE_ASC';
    else if (params.sort === 'PRICE_ASC') nextSort = 'PRICE_DESC';
    else nextSort = '';
    
    router.setParams({ sort: nextSort });
  };

  const clearAll = () => {
    setLocalQuery('');
    router.setParams({ q: '', category: '', stock: '', sort: '' });
  };

  // Deriving sort label
  let sortLabel = 'Default';
  if (params.sort === 'PRICE_ASC') sortLabel = 'Low to High';
  if (params.sort === 'PRICE_DESC') sortLabel = 'High to Low';

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Search',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.surface },
          headerTitleStyle: { ...typography.headlineSm, color: colors.onSurface },
          headerTintColor: colors.onSurface
        }} 
      />
      
      {/* Search Header Area */}
      <View style={styles.searchHeaderArea}>
        <SearchBar 
          interactive={true} 
          autoFocus={true} 
          value={localQuery}
          onChangeText={setLocalQuery}
          onFilterPress={Keyboard.dismiss}
        />
      </View>

      {/* Filters Row */}
      <View style={styles.filtersWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          {/* Stock Toggle */}
          <Pressable 
            style={[styles.filterChip, params.stock === 'in-stock' && styles.filterChipActive]}
            onPress={handleStockToggle}
          >
            <MaterialIcons 
              name={params.stock === 'in-stock' ? 'check-box' : 'check-box-outline-blank'} 
              size={16} 
              color={params.stock === 'in-stock' ? colors.surface : colors.onSurfaceVariant} 
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.filterChipText, params.stock === 'in-stock' && styles.filterChipTextActive]}>
              In Stock
            </Text>
          </Pressable>

          {/* Sort Toggle */}
          <Pressable 
            style={[styles.filterChip, params.sort && params.sort !== 'DEFAULT' && styles.filterChipActive]}
            onPress={handleSortToggle}
          >
            <MaterialIcons 
              name="sort" 
              size={16} 
              color={(params.sort && params.sort !== 'DEFAULT') ? colors.surface : colors.onSurfaceVariant} 
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.filterChipText, (params.sort && params.sort !== 'DEFAULT') && styles.filterChipTextActive]}>
              {sortLabel}
            </Text>
          </Pressable>

          <View style={styles.divider} />

          {/* Categories */}
          {categories.map((cat) => (
            <CategoryPill 
              key={cat.id}
              label={cat.name}
              isActive={params.category === cat.id}
              onPress={() => handleCategoryPress(cat.id)}
              style={styles.categoryPill}
            />
          ))}
        </ScrollView>
      </View>

      {/* Results Area */}
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <MaterialIcons name="error-outline" size={48} color={colors.error} />
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorText}>Unable to load search results.</Text>
        </View>
      ) : products.length === 0 ? (
        <View style={styles.centerContainer}>
          <MaterialIcons name="search-off" size={48} color={colors.outline} />
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptyText}>We couldn't find anything matching your current search and filters.</Text>
          <Pressable style={styles.clearBtn} onPress={clearAll}>
            <Text style={styles.clearBtnText}>Clear All Filters</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView 
          contentContainerStyle={[styles.resultsScroll, { paddingBottom: insets.bottom + spacing.space2xl }]}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        >
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>{products.length} {products.length === 1 ? 'Item' : 'Items'}</Text>
          </View>
          <View style={styles.productGrid}>
            {products.map(product => (
              <View key={product.id} style={styles.gridItem}>
                <ProductCard 
                  id={product.id}
                  title={product.title}
                  manufacturer={product.manufacturer}
                  price={product.price}
                  imageUrl={product.images[0]}
                  badge={product.badges?.[0]}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  searchHeaderArea: {
    paddingHorizontal: spacing.margin,
    paddingVertical: spacing.spaceSm,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surfaceContainerHigh,
  },
  filtersWrapper: {
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surfaceContainerHigh,
  },
  filtersScroll: {
    paddingHorizontal: spacing.margin,
    paddingVertical: spacing.spaceSm,
    alignItems: 'center',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 28,
    paddingHorizontal: spacing.spaceSm,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
    backgroundColor: colors.surface,
    marginRight: spacing.spaceXs,
  },
  filterChipActive: {
    borderColor: colors.onSurface,
    backgroundColor: colors.onSurface,
  },
  filterChipText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: colors.surface,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: colors.surfaceContainerHighest,
    marginHorizontal: spacing.spaceXs,
    marginRight: spacing.spaceSm,
  },
  categoryPill: {
    marginRight: spacing.spaceXs,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.space2xl,
  },
  resultsScroll: {
    flexGrow: 1,
  },
  resultsHeader: {
    paddingHorizontal: spacing.margin,
    paddingVertical: spacing.spaceSm,
  },
  resultsCount: {
    ...typography.labelTechnical,
    color: colors.outline,
    textTransform: 'uppercase',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.margin - (spacing.spaceSm / 2),
  },
  gridItem: {
    width: '50%',
    padding: spacing.spaceSm / 2,
    marginBottom: spacing.spaceLg,
  },
  emptyTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
    marginTop: spacing.spaceMd,
    marginBottom: spacing.space2xs,
  },
  emptyText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: spacing.spaceLg,
  },
  errorTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
    marginTop: spacing.spaceMd,
    marginBottom: spacing.space2xs,
  },
  errorText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  clearBtn: {
    paddingHorizontal: spacing.spaceLg,
    paddingVertical: spacing.spaceMd,
    backgroundColor: colors.onSurface,
    borderRadius: radii.lg,
  },
  clearBtnText: {
    ...typography.labelLg,
    color: colors.surface,
  },
});
