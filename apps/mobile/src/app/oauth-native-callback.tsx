import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, Text } from "react-native";
import Container from "../components/Container";

export default () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn)
    return (
      <Container alignment="center">
        <ActivityIndicator size={"large"} />
        <Text>Authenticating</Text>
      </Container>
    );
  else return <Redirect href="(tabs)" />;
};
