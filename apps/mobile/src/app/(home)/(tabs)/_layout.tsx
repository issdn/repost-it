import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import { Redirect, Tabs } from 'expo-router';
import { styled } from 'nativewind';
import { SafeAreaView, View, Text } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';

const StyledSafeAreaView = styled(SafeAreaView);

export default () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={'/auth'} />;
  }

  return (
    <SignedIn>
      <StyledSafeAreaView tw='h-full'>
        <Tabs>
          <Tabs.Screen
            name='settings'
            options={{
              title: 'Settings',
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons name='settings' size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name='videos'
            options={{
              title: 'Videos',
              tabBarIcon: ({ focused, color, size }) => (
                <Entypo name='folder-video' size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name='index'
            options={{
              href: null,
            }}
          />
        </Tabs>
      </StyledSafeAreaView>
    </SignedIn>
  );
};
