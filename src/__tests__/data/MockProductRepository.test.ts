import { MockProductRepository } from '../../data/mock/MockProductRepository';

describe('MockProductRepository', () => {
  let repository: MockProductRepository;

  beforeEach(() => {
    repository = new MockProductRepository();
  });

  it('should return all products', async () => {
    const products = await repository.getProducts();
    expect(products.length).toBe(8);
  });

  it('should return product by id', async () => {
    const product = await repository.getProductById('prod-1');
    expect(product).not.toBeNull();
    expect(product?.title).toBe('Atelier Series 1 Wireless Headphone');
  });

  it('should return null for invalid product id', async () => {
    const product = await repository.getProductById('invalid-id');
    expect(product).toBeNull();
  });

  it('should return featured product', async () => {
    const product = await repository.getFeatured();
    expect(product).not.toBeNull();
    expect(product?.id).toBe('prod-1');
  });

  it('should return 4 new arrivals', async () => {
    const arrivals = await repository.getNewArrivals();
    expect(arrivals.length).toBe(4);
    expect(arrivals.some(p => p.id === 'prod-2')).toBe(true);
  });

  it('should return categories', async () => {
    const categories = await repository.getCategories();
    expect(categories.length).toBe(3);
  });

  describe('searchProducts', () => {
    it('should return all products for empty query', async () => {
      const results = await repository.searchProducts('   ');
      expect(results.length).toBe(8);
    });

    it('should match case-insensitive exact and partial titles', async () => {
      let results = await repository.searchProducts('atelier');
      expect(results.length).toBe(1);
      expect(results[0].title).toContain('Atelier');

      results = await repository.searchProducts('PHONE');
      expect(results.length).toBe(3); // 'Phone (2a)', 'Headphone', and 'Microphone'
    });

    it('should match manufacturer', async () => {
      const results = await repository.searchProducts('braun');
      expect(results.length).toBe(1);
      expect(results[0].manufacturer).toBe('BRAUN');
    });

    it('should filter by category', async () => {
      const results = await repository.searchProducts('', { categoryId: 'cat-1' }); // Audio
      expect(results.length).toBe(3); // Atelier, Sonos, Teenage Mic
    });

    it('should filter by inStockOnly', async () => {
      const results = await repository.searchProducts('', { inStockOnly: true });
      expect(results.length).toBe(6); // 8 total - 1 OUT_OF_STOCK (Bauhaus) - 1 PRE_ORDER (Sonos)
    });

    it('should combine search and filters', async () => {
      const results = await repository.searchProducts('audio', { inStockOnly: true }); 
      // 'audio' matches 'Spatial Sound Pod' description? No, description has 'audio' but we only search title & manufacturer.
      // Wait, 'audio' doesn't match any title or manufacturer except maybe nothing? Let's check mock data.
      // Mock data titles: 'Atelier Series 1 Wireless Headphone', 'Phone (2a) Pro', 'MagCharge Duo', 'Titanium 75% Board', 'Spatial Sound Pod', 'Studio Monitor 8K Monolith', 'Precision CNC Mini Chassis', 'Linear Field Microphone'.
      // Wait, 'audio' isn't in title/manufacturer. Let's search 'pod'.
      const podResults = await repository.searchProducts('pod', { inStockOnly: true });
      // 'Spatial Sound Pod' is PRE_ORDER, so it shouldn't match inStockOnly=true.
      expect(podResults.length).toBe(0);
    });

    it('should sort by PRICE_ASC', async () => {
      const results = await repository.searchProducts('', undefined, 'PRICE_ASC');
      expect(results[0].price).toBe(129); // MagCharge Duo
      expect(results[results.length - 1].price).toBe(1599); // Studio Monitor
    });

    it('should sort by PRICE_DESC', async () => {
      const results = await repository.searchProducts('', undefined, 'PRICE_DESC');
      expect(results[0].price).toBe(1599);
      expect(results[results.length - 1].price).toBe(129);
    });

    it('should combine search, filters, and sorting', async () => {
      const results = await repository.searchProducts('', { categoryId: 'cat-1', inStockOnly: true }, 'PRICE_DESC');
      // Audio (cat-1) in stock: Atelier ($499), Teenage Mic ($249)
      expect(results.length).toBe(2);
      expect(results[0].price).toBe(499);
      expect(results[1].price).toBe(249);
    });
  });
});
