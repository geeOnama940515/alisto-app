import { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    console.log('AuthLayout - Auth state:', { isSignedIn, isLoaded });
  }, [isSignedIn, isLoaded]);

  // Wait for Clerk to load
  if (!isLoaded) {
    return null;
  }

  // If user is signed in, redirect to main app
  if (isSignedIn) {
    console.log('AuthLayout - User signed in, redirecting to tabs');
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
}