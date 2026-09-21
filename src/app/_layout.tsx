import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  useFonts,
  BodoniModa_500Medium,
  BodoniModa_600SemiBold,
} from '@expo-google-fonts/bodoni-moda';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../core/queryClient';
import { RepositoryProvider } from '../core/di/RepositoryProvider';

import { useCart } from '../application/hooks/useCart';
import { useWishlist } from '../application/hooks/useWishlist';
import { useAuth } from '../application/hooks/useAuth';

function AppInitializer({ children }: { children: React.ReactNode }) {
  const { hydrate: hydrateCart } = useCart();
  const { hydrate: hydrateWishlist } = useWishlist();
  const { restoreSession } = useAuth();

  useEffect(() => {
    restoreSession();
    hydrateCart();
    hydrateWishlist();
  }, [hydrateCart, hydrateWishlist, restoreSession]);

  return <>{children}</>;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    BodoniModa_500Medium,
    BodoniModa_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RepositoryProvider>
      <QueryClientProvider client={queryClient}>
        <AppInitializer>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </AppInitializer>
      </QueryClientProvider>
    </RepositoryProvider>
  );
}
