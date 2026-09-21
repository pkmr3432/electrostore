import React, { createContext, useContext, useState } from 'react';
import { Stack } from 'expo-router';
import { Address, ShippingMethod } from '../../domain/models';
import { colors, typography } from '../../../theme';
import { Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';

interface CheckoutState {
  address: Partial<Address> | null;
  setAddress: (address: Partial<Address>) => void;
  shippingMethod: ShippingMethod | null;
  setShippingMethod: (method: ShippingMethod) => void;
  paymentIntentId: string | null;
  setPaymentIntentId: (id: string) => void;
  clearCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutState | undefined>(undefined);

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}

export default function CheckoutLayout() {
  const [address, setAddress] = useState<Partial<Address> | null>(null);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  const clearCheckout = () => {
    setAddress(null);
    setShippingMethod(null);
    setPaymentIntentId(null);
  };

  return (
    <CheckoutContext.Provider value={{
      address,
      setAddress,
      shippingMethod,
      setShippingMethod,
      paymentIntentId,
      setPaymentIntentId,
      clearCheckout
    }}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.surface },
          headerTitleStyle: { ...typography.headlineSm, color: colors.onSurface },
          headerTintColor: colors.onSurface,
          headerBackTitle: '',
          headerLeft: ({ canGoBack }) => 
            canGoBack ? (
              <Pressable onPress={() => router.back()} style={{ marginRight: 16 }}>
                <MaterialIcons name="arrow-back" size={24} color={colors.onSurface} />
              </Pressable>
            ) : null
        }}
      >
        <Stack.Screen name="address" options={{ title: 'Shipping Address' }} />
        <Stack.Screen name="shipping" options={{ title: 'Shipping Method' }} />
        <Stack.Screen name="payment" options={{ title: 'Payment Details' }} />
        <Stack.Screen name="review" options={{ title: 'Review Order' }} />
        <Stack.Screen 
          name="success" 
          options={{ 
            title: 'Confirmation',
            headerLeft: () => null, // No back button on success
            gestureEnabled: false // Prevent swipe back
          }} 
        />
      </Stack>
    </CheckoutContext.Provider>
  );
}
