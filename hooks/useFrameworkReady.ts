import { useEffect } from 'react';

export function useFrameworkReady() {
  useEffect(() => {
    // This hook can be used for any app-wide initialization logic
    // that needs to run once the framework is ready.
    // For example, pre-loading assets, setting up analytics, etc.
    // In this specific project, the splash screen hiding is handled
    // by the font loading effect in app/_layout.tsx.
    // This hook serves to satisfy the import and can be expanded later.
    console.log('Framework ready hook initialized.');
  }, []);
}