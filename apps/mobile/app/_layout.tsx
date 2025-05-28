import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <Stack>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
