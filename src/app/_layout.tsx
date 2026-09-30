import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native"; // Added for loading state

function RouteGuard() {
  const { user } = useAuth();
  const router = useRouter();
  const segments = useSegments(); // Tells us which folder the user is currently in

  useEffect(() => {
    // Check if the user is currently in the auth group (login/signup/onboarding)
    const inAuthGroup = segments[0] === "(auth)";

    if (!user) {
      // 1. If no user is logged in and they aren't in the auth group, send them to login
      if (!inAuthGroup) {
        router.replace("/(auth)/login");
      }
    } else if (user && !user.onboardingCompleted) {
      // 2. If user is logged in but hasn't finished onboarding, send them to onboarding
      if (segments[1] !== "onboarding") {
        router.replace("/(auth)/onboarding");
      }
    } else if (user && user.onboardingCompleted) {
      // 3. If user is logged in and finished onboarding, send them to the main app
      if (inAuthGroup) {
        router.replace("/(tabs)");
      }
    }
  }, [user, segments]); // Reruns whenever user or current route changes

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard />
    </AuthProvider>
  );
}