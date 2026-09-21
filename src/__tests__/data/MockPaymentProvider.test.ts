import { MockPaymentProvider } from '../../data/mock/MockPaymentProvider';

describe('MockPaymentProvider', () => {
  it('should initialize payment with a mock intent', async () => {
    const provider = new MockPaymentProvider();
    const result = await provider.initializePayment(100, 'USD');
    expect(result.paymentIntentId).toBeDefined();
    expect(result.clientSecret).toBeDefined();
  });

  it('should confirm payment if ID matches', async () => {
    const provider = new MockPaymentProvider();
    const result = await provider.initializePayment(100, 'USD');
    const success = await provider.confirmPayment(result.paymentIntentId);
    expect(success).toBe(true);
  });

  it('should initialize failure if currency is FAIL', async () => {
    const provider = new MockPaymentProvider();
    const result = await provider.initializePayment(100, 'FAIL');
    expect(result.paymentIntentId).toBe('pi_mock_fail');
  });

  it('should throw error for fail payment intent', async () => {
    const provider = new MockPaymentProvider();
    await expect(provider.confirmPayment('pi_mock_fail')).rejects.toThrow('Card was declined.');
  });

  it('should throw error for cancel payment intent', async () => {
    const provider = new MockPaymentProvider();
    await expect(provider.confirmPayment('pi_mock_cancel')).rejects.toThrow('Payment was cancelled by the user.');
  });
});
