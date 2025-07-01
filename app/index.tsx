import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    console.log('Index - Auth state:', { isSignedIn, isLoaded });
  }, [isSignedIn, isLoaded]);

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#DC2626" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Redirect based on authentication status
  if (isSignedIn) {
    console.log('Redirecting to tabs...');
    return <Redirect href="/(tabs)" />;
  }

  console.log('Redirecting to welcome...');
  return <Redirect href="/(auth)/welcome" />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});