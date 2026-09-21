import { ProductRepository } from '../../domain/repositories';
import { Product, Category } from '../../domain/models';

const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', slug: 'audio', name: 'Audio' },
  { id: 'cat-2', slug: 'computing', name: 'Computing' },
  { id: 'cat-3', slug: 'accessories', name: 'Accessories' }
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'atelier-series-1',
    title: 'Atelier Series 1 Wireless Headphone',
    manufacturer: 'BRAUN',
    description: 'Studio-grade wireless headphones with custom acoustic drivers.',
    price: 499.00,
    currency: 'USD',
    images: [require('../../../assets/images/product-atelier.jpg')],
    categoryId: 'cat-1',
    specifications: { 'Driver': '40mm Beryllium Drivers', 'Battery': '48hr Battery', 'Feature': 'ANC' },
    stockStatus: 'IN_STOCK',
    stockQuantity: 42,
    badges: ['Custom Acoustic Drivers']
  },
  {
    id: 'prod-2',
    slug: 'nothing-phone-2a',
    title: 'Phone (2a) Pro',
    manufacturer: 'Nothing',
    description: 'A new era of transparent industrial design packed with flagship power.',
    price: 649.00,
    currency: 'USD',
    images: [require('../../../assets/images/product-nothing.jpg')],
    categoryId: 'cat-2',
    specifications: { Color: 'Transparent White', Storage: '256GB' },
    stockStatus: 'IN_STOCK',
    stockQuantity: 15,
    badges: ['Limited']
  },
  {
    id: 'prod-3',
    slug: 'nomad-magcharge-duo',
    title: 'MagCharge Duo',
    manufacturer: 'Nomad',
    description: 'Premium wireless charging dock for your essential devices.',
    price: 129.00,
    currency: 'USD',
    images: [require('../../../assets/images/product-magcharge-dock.jpg')],
    categoryId: 'cat-3',
    specifications: { Material: 'Leather & Aluminum' },
    stockStatus: 'IN_STOCK',
    stockQuantity: 120,
    badges: []
  },
  {
    id: 'prod-4',
    slug: 'keychron-q1-pro',
    title: 'Titanium 75% Board',
    manufacturer: 'Keychron',
    description: 'A fully customizable mechanical keyboard with premium titanium finish.',
    price: 210.00,
    currency: 'USD',
    images: [require('../../../assets/images/product-keyboard.jpg')],
    categoryId: 'cat-3',
    specifications: { Layout: '75%', Switches: 'Brown' },
    stockStatus: 'IN_STOCK',
    stockQuantity: 50,
    badges: []
  },
  {
    id: 'prod-5',
    slug: 'sonos-spatial-pod',
    title: 'Spatial Sound Pod',
    manufacturer: 'Sonos',
    description: 'Immersive spatial audio in a compact, architectural form factor.',
    price: 399.00,
    currency: 'USD',
    images: [require('../../../assets/images/product-sonos.jpg')],
    categoryId: 'cat-1',
    specifications: { Connectivity: 'Wi-Fi 6', Color: 'Matte Black' },
    stockStatus: 'PRE_ORDER',
    stockQuantity: 0,
    badges: ['Pre-Order']
  },
  {
    id: 'prod-6',
    slug: 'studio-display',
    title: 'Studio Monitor 8K Monolith',
    manufacturer: 'STUDIO DISPLAY',
    description: 'Reference-grade 8K monitor for creative professionals.',
    price: 1599.00,
    currency: 'USD',
    images: [require('../../../assets/images/product-monitor.jpg')],
    categoryId: 'cat-2',
    specifications: { Resolution: '8K', Size: '32 inch' },
    stockStatus: 'IN_STOCK',
    stockQuantity: 8,
    badges: []
  },
  {
    id: 'prod-7',
    slug: 'bauhaus-case',
    title: 'Precision CNC Mini Chassis',
    manufacturer: 'BAUHAUS TECH',
    description: 'Minimalist small-form-factor PC case machined from solid aluminum.',
    price: 180.00,
    currency: 'USD',
    images: [require('../../../assets/images/product-case.jpg')],
    categoryId: 'cat-2',
    specifications: { Volume: '10.5L', Material: 'Aluminum' },
    stockStatus: 'OUT_OF_STOCK',
    stockQuantity: 0,
    badges: []
  },
  {
    id: 'prod-8',
    slug: 'teenage-mic',
    title: 'Linear Field Microphone',
    manufacturer: 'TEENAGE TECH',
    description: 'Ultra-portable studio microphone with pristine linear response.',
    price: 249.00,
    currency: 'USD',
    images: [require('../../../assets/images/product-mic.jpg')],
    categoryId: 'cat-1',
    specifications: { Type: 'Condenser', Pattern: 'Cardioid' },
    stockStatus: 'IN_STOCK',
    stockQuantity: 24,
    badges: []
  }
];

export class MockProductRepository implements ProductRepository {
  async getProducts(): Promise<Product[]> {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_PRODUCTS), 300));
  }

  async getProductById(id: string): Promise<Product | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = MOCK_PRODUCTS.find(p => p.id === id);
        resolve(product || null);
      }, 300);
    });
  }

  async getFeatured(): Promise<Product | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return Braun Atelier
        const product = MOCK_PRODUCTS.find(p => p.id === 'prod-1');
        resolve(product || null);
      }, 300);
    });
  }

  async getNewArrivals(): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return Nothing, Nomad, Keychron, Sonos
        const arrivals = MOCK_PRODUCTS.filter(p => 
          ['prod-2', 'prod-3', 'prod-4', 'prod-5'].includes(p.id)
        );
        resolve(arrivals);
      }, 300);
    });
  }

  async getCategories(): Promise<Category[]> {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_CATEGORIES), 300));
  }

  async searchProducts(
    query: string,
    filters?: import('../../domain/repositories').ProductFilters,
    sort?: import('../../domain/repositories').ProductSort
  ): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...MOCK_PRODUCTS];

        // 1. Search Query
        const normalizedQuery = query.trim().toLowerCase();
        if (normalizedQuery) {
          results = results.filter(p => 
            p.title.toLowerCase().includes(normalizedQuery) ||
            p.manufacturer.toLowerCase().includes(normalizedQuery)
          );
        }

        // 2. Filters
        if (filters) {
          if (filters.categoryId) {
            results = results.filter(p => p.categoryId === filters.categoryId);
          }
          if (filters.inStockOnly) {
            results = results.filter(p => p.stockStatus === 'IN_STOCK');
          }
        }

        // 3. Sorting
        if (sort === 'PRICE_ASC') {
          results.sort((a, b) => a.price - b.price);
        } else if (sort === 'PRICE_DESC') {
          results.sort((a, b) => b.price - a.price);
        }
        // DEFAULT preserves the filtered order from the original mock array

        resolve(results);
      }, 300);
    });
  }
}
