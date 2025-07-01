declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      EXPO_PUBLIC_API_URL: string;
      EXPO_PUBLIC_API_KEY?: string;
      EXPO_PUBLIC_ENVIRONMENT: 'development' | 'staging' | 'production';
    }
  }
}

export {};