import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: false,
          headerTitleStyle: {
            fontFamily: "Montserrat-Regular",
          },
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Register",
          headerShown: false,
          // You can customize header styles here
        }}
      />
    </Stack>
  );
}
