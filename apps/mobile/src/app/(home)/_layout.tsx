import { Slot } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from '../../trpc';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

export default function () {
  const { getToken } = useAuth();
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://192.168.0.51:3000/trpc/',
          async headers() {
            return {
              authorization: (await getToken()) || 'Bearer ',
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config}>
          <SafeAreaProvider>
            <Slot />
          </SafeAreaProvider>
        </GluestackUIProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
