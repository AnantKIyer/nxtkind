"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWixClient } from '@/hooks/useWixClientContext';

export default function AuthCallback() {
  const router = useRouter();
  const { refreshAuthState } = useWixClient();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');

        if (error) {
          console.error('OAuth error:', error);
          router.push('/login?error=oauth_failed');
          return;
        }

        if (code && state) {
          // Parse state to verify it's from our app
          try {
            const stateData = JSON.parse(atob(state));
            if (stateData.provider === 'google') {
              // For now, just redirect to login to complete the process
              // The Wix SDK should handle the OAuth flow automatically
              refreshAuthState();
              router.push('/');
              return;
            }
          } catch (e) {
            console.warn('Could not parse state:', e);
          }
        }

        // If no code or invalid state, redirect to login
        router.push('/login');
      } catch (error) {
        console.error('Callback handling error:', error);
        router.push('/login?error=callback_failed');
      }
    };

    handleCallback();
  }, [router, refreshAuthState]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}
