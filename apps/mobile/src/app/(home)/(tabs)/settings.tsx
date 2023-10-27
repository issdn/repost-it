import { useAuth, useUser } from '@clerk/clerk-expo';
import { Button, Text } from 'react-native';
import Container from '../../../components/Container';
import sharedConfig from 'shared/shared_config';
import LinkExternalAccountButton from '../../../components/LinkExternalAccountButton';

export default function Settings() {
  const { isLoaded, signOut } = useAuth();
  const { user } = useUser();
  const externalAccountsProviders =
    user?.externalAccounts.map((p) => p.provider) || [];

  if (!isLoaded) {
    return <Text>LOADING.</Text>;
  }

  if (!user) {
    return <Text>Couldn't load user data.</Text>;
  }

  return (
    <Container>
      <Button
        title='Sign Out'
        onPress={() => {
          signOut();
        }}
      />
      <>
        {sharedConfig.availibleProviders.map((provider, i) => (
          <LinkExternalAccountButton
            key={i}
            title={provider.toLocaleUpperCase()}
            linked={externalAccountsProviders.includes(provider)}
            createExternalAccount={user?.createExternalAccount}
            provider={provider}
          />
        ))}
      </>
    </Container>
  );
}
