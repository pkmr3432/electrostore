import { CartItem } from '../../domain/models';

export type CheckoutValidationResult = {
  isValid: boolean;
  errorTitle?: string;
  errorMessage?: string;
};

export function validateCartForCheckout(items: (CartItem & { product?: any })[]): CheckoutValidationResult {
  if (items.length === 0) {
    return {
      isValid: false,
      errorTitle: 'Cart is empty',
      errorMessage: 'Please add items to your cart before proceeding to checkout.'
    };
  }

  for (const item of items) {
    if (!item.product) {
      return {
        isValid: false,
        errorTitle: 'Invalid item',
        errorMessage: 'An item in your cart is no longer available.'
      };
    }
    if (item.product.stockStatus === 'OUT_OF_STOCK') {
      return {
        isValid: false,
        errorTitle: 'Out of Stock',
        errorMessage: `${item.product.title} is currently out of stock.`
      };
    }
    if (item.quantity > item.product.stockQuantity) {
      return {
        isValid: false,
        errorTitle: 'Insufficient Stock',
        errorMessage: `Only ${item.product.stockQuantity} remaining for ${item.product.title}.`
      };
    }
  }

  return { isValid: true };
}
