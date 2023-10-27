import { View, Text } from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignInWithOAuth from "../oauthSignIn";
import Container from "../components/Container";
import { Redirect, useLocalSearchParams } from "expo-router";

export default () => {
  const { error } = useLocalSearchParams();

  return (
    <Container>
      <SignedIn>
        <Redirect href="(tabs)" />
      </SignedIn>
      <SignedOut>
        <SignInWithOAuth provider="google" />
        <SignInWithOAuth provider="tiktok" />
        <SignInWithOAuth provider="facebook" />
      </SignedOut>
      <Text>{error ? error : "a"}</Text>
    </Container>
  );
};
