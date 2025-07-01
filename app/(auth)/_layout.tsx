import { Redirect, Stack } from 'expo-router';
import { useDummyAuth } from '@/hooks/useDummyAuth';

export default function AuthLayout() {
  const { isAuthenticated } = useDummyAuth();

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}