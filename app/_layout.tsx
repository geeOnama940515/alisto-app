import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, useSegments } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      console.log('Retrieved token for key:', key, 'exists:', !!item);
      return item;
    } catch (err) {
      console.error('Error getting token:', err);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
      console.log('Saved token for key:', key);
    } catch (err) {
      console.error('Error saving token:', err);
    }
  },
};

// Get the publishable key from Constants (which reads from app.json or environment variables)
const publishableKey = Constants.expoConfig?.extra?.clerkPublishableKey as string || process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Debug logging
console.log('=== CLERK DEBUG INFO ===');
console.log('Environment:', __DEV__ ? 'development' : 'production');
console.log('Constants available:', !!Constants.expoConfig);
console.log('Extra config exists:', !!Constants.expoConfig?.extra);
console.log('Publishable key exists:', !!publishableKey);
console.log('Key preview:', publishableKey ? publishableKey.substring(0, 20) + '...' : 'NOT FOUND');
console.log('========================');

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please check your app.config.js and environment variables. Key: ' + publishableKey
  );
}

function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    console.log('=== NAVIGATION DEBUG ===');
    console.log('User signed in:', !!user);
    console.log('Current segments:', segments);
    console.log('In auth group:', inAuthGroup);
    console.log('========================');

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      console.log('Redirecting to welcome page - user not signed in');
      router.replace('/(auth)/welcome');
    } else if (user && inAuthGroup) {
      // Redirect away from the auth page.
      console.log('Redirecting to tabs - user is signed in');
      router.replace('/(tabs)');
    }
  }, [user, segments, router]);
}

function RootLayoutContent() {
  const { user, isLoaded } = useAuth();
  
  useProtectedRoute(user);

  useEffect(() => {
    console.log('RootLayoutContent - Auth state:', { user: !!user, isLoaded });
  }, [user, isLoaded]);

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#DC2626" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="news" options={{ headerShown: false }} />
          <Stack.Screen name="services" options={{ headerShown: false }} />
          <Stack.Screen name="assistance" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <RootLayoutContent />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
});