import { useState } from 'react';
import { router } from 'expo-router';
// eslint-disable-next-line node/no-extraneous-import
import type { UserResource } from '@clerk/types/dist/user';
import type { AvailibleProvider } from 'shared/types';
import { providerToStrategy } from 'shared/utils';
import { createURL } from 'expo-linking';
import { Button } from 'react-native';

type ExternalAccountButtonProps = {
  title: string;
  linked: boolean;
  createExternalAccount: UserResource['createExternalAccount'];
  provider: AvailibleProvider;
};

export default function LinkExternalAccountButton({
  title,
  linked = false,
  createExternalAccount,
  provider,
}: ExternalAccountButtonProps) {
  const [loading, setLoading] = useState(false);

  const linkedTitle = linked ? `${title} - linked` : title;

  const onPress = async () => {
    setLoading(true);
    try {
      const { verification } = await createExternalAccount({
        strategy: providerToStrategy(provider),
        redirectUrl: createURL('settings'),
      });
      if (verification?.externalVerificationRedirectURL) {
        router.replace(verification.externalVerificationRedirectURL.href);
      }
      setLoading(false);
    } catch (e) {
      console.error('aaa');
    }
  };

  return (
    <Button
      disabled={linked || loading}
      onPress={onPress}
      title={linkedTitle}
    />
  );
}
