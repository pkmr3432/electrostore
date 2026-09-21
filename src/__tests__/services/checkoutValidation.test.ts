import { validateCartForCheckout } from '../../application/services/checkoutValidation';

describe('checkoutValidation', () => {
  it('should invalidate an empty cart', () => {
    const result = validateCartForCheckout([]);
    expect(result.isValid).toBe(false);
    expect(result.errorTitle).toBe('Cart is empty');
  });

  it('should invalidate missing product data', () => {
    const result = validateCartForCheckout([
      { id: '1', productId: 'p1', quantity: 1, priceAtAdded: 100, currency: 'USD' }
    ]);
    expect(result.isValid).toBe(false);
    expect(result.errorTitle).toBe('Invalid item');
  });

  it('should invalidate out of stock items', () => {
    const result = validateCartForCheckout([
      { 
        id: '1', 
        productId: 'p1', 
        quantity: 1, 
        priceAtAdded: 100, 
        currency: 'USD',
        product: {
          title: 'Test Product',
          stockStatus: 'OUT_OF_STOCK',
          stockQuantity: 0
        }
      }
    ]);
    expect(result.isValid).toBe(false);
    expect(result.errorTitle).toBe('Out of Stock');
  });

  it('should invalidate insufficient stock', () => {
    const result = validateCartForCheckout([
      { 
        id: '1', 
        productId: 'p1', 
        quantity: 5, 
        priceAtAdded: 100, 
        currency: 'USD',
        product: {
          title: 'Test Product',
          stockStatus: 'IN_STOCK',
          stockQuantity: 3
        }
      }
    ]);
    expect(result.isValid).toBe(false);
    expect(result.errorTitle).toBe('Insufficient Stock');
    expect(result.errorMessage).toContain('Only 3 remaining');
  });

  it('should validate valid cart', () => {
    const result = validateCartForCheckout([
      { 
        id: '1', 
        productId: 'p1', 
        quantity: 2, 
        priceAtAdded: 100, 
        currency: 'USD',
        product: {
          title: 'Test Product',
          stockStatus: 'IN_STOCK',
          stockQuantity: 5
        }
      }
    ]);
    expect(result.isValid).toBe(true);
  });
});
