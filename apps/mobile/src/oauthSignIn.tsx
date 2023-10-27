import React, { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Button, View, Text } from 'react-native';
import { useOAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { providerToStrategy } from 'shared/utils';
import type { AvailibleProvider } from 'shared/types';
import { useWarmUpBrowser } from './hooks/useWarmUpBrowser';
import store from './store';
import { trpc } from './trpc';

WebBrowser.maybeCompleteAuthSession();

export default function SignInWithOAuth({
  provider,
}: {
  provider: AvailibleProvider;
}) {
  const strategy = providerToStrategy(provider);

  useWarmUpBrowser();

  const [error, setError] = useState<string | null>();

  const { startOAuthFlow } = useOAuth({ strategy });

  const changeRouteWithError = (errorMessage: string) => {
    return router.replace(`/auth?error=${encodeURIComponent(errorMessage)}`);
  };

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn } = await startOAuthFlow();
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        const { data, isSuccess } = await trpc.user.accountId.useQuery({
          provider,
        });
        if (isSuccess) {
          await store.save(provider, data.id);
        }
      }
      if (signIn?.firstFactorVerification.error) {
        return changeRouteWithError(
          'Unknown authentication error on our side. Please try again later or contact us.'
        );
      }
    } catch (err) {
      setError('Unknown authentication error. Please try again later.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nameSplit = strategy.split('_');

  return (
    <View>
      <Button
        title={`Sign in with ${nameSplit[nameSplit.length - 1]}`}
        onPress={onPress}
      />
      {error && <Text>{error}</Text>}
    </View>
  );
}
