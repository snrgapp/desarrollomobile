import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="cards"
        options={{
          title: "Discover",
        }}
      />
    </Stack>
  );
}
