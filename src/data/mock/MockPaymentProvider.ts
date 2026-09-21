import { PaymentProvider } from '../../domain/repositories';

export class MockPaymentProvider implements PaymentProvider {
  async initializePayment(amount: number, currency: string): Promise<{ paymentIntentId: string; clientSecret: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (currency === 'FAIL') {
          resolve({
            paymentIntentId: 'pi_mock_fail',
            clientSecret: 'secret_mock_fail'
          });
        } else {
          resolve({
            paymentIntentId: 'pi_mock_123',
            clientSecret: 'secret_mock_456'
          });
        }
      }, 500);
    });
  }

  async confirmPayment(paymentIntentId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (paymentIntentId === 'pi_mock_fail') {
          reject(new Error('Card was declined.'));
        } else if (paymentIntentId === 'pi_mock_cancel') {
          reject(new Error('Payment was cancelled by the user.'));
        } else {
          resolve(paymentIntentId === 'pi_mock_123');
        }
      }, 500);
    });
  }
}
