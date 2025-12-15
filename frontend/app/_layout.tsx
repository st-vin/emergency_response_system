import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="report-emergency" options={{ title: 'Report Emergency' }} />
        <Stack.Screen name="view-assignment" options={{ title: 'View Assignment' }} />
        <Stack.Screen name="track-eta" options={{ title: 'Track ETA' }} />
        <Stack.Screen name="responder" options={{ title: 'Responder Dashboard' }} />
        <Stack.Screen name="accept-case" options={{ title: 'Accept Case' }} />
        <Stack.Screen name="update-status" options={{ title: 'Update Status' }} />
        <Stack.Screen name="dispatcher" options={{ title: 'Monitor Incidents' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
