import { useQuery } from '@tanstack/react-query';
import { useRepositories } from '../../core/di/RepositoryProvider';

export function useProducts() {
  const { productRepository } = useRepositories();

  return useQuery({
    queryKey: ['products'],
    queryFn: () => productRepository.getProducts(),
  });
}

export function useProduct(id: string) {
  const { productRepository } = useRepositories();

  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productRepository.getProductById(id),
    enabled: !!id,
  });
}

export function useFeaturedProduct() {
  const { productRepository } = useRepositories();

  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productRepository.getFeatured(),
  });
}

export function useNewArrivals() {
  const { productRepository } = useRepositories();

  return useQuery({
    queryKey: ['products', 'newArrivals'],
    queryFn: () => productRepository.getNewArrivals(),
  });
}

export function useCategories() {
  const { productRepository } = useRepositories();

  return useQuery({
    queryKey: ['categories'],
    queryFn: () => productRepository.getCategories(),
  });
}

export function useSearch(
  query: string,
  filters?: import('../../domain/repositories').ProductFilters,
  sort?: import('../../domain/repositories').ProductSort
) {
  const { productRepository } = useRepositories();

  return useQuery({
    queryKey: ['products', 'search', query, filters, sort],
    queryFn: () => productRepository.searchProducts(query, filters, sort),
  });
}
