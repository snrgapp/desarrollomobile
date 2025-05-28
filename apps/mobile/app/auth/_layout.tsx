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
          headerTitleStyle: {
            fontFamily: "Montserrat-Regular",
          },
        }}
      />
      <Stack.Screen
        name="emprendimiento"
        options={{
          title: "Emprendimiento",
          headerShown: false,
          headerTitleStyle: {
            fontFamily: "Montserrat-Regular",
          },
        }}
      />
      <Stack.Screen
        name="personalidad"
        options={{
          title: "Personalidad",
          headerShown: false,
          headerTitleStyle: {
            fontFamily: "Montserrat-Regular",
          },
        }}
      />
    </Stack>
  );
}
