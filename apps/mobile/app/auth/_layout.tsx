import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
    </SafeAreaView>
  );
}
