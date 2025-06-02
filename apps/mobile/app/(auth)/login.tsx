import Login from "@/component/Login";
import useAuthStore from "@/stores/authStore";
import { Link, router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const goToRegister = (): void => {
    router.push("/register");
  };
  const { isLoading } = useAuthStore();

  return (
    <View style={styles.container}>
      <Login />
      <Link href="/register" asChild replace>
        <TouchableOpacity style={styles.linkButton}>
          <Text
            style={styles.linkText}
            onPress={goToRegister}
            disabled={isLoading}
          >
            Don&apos;t have an account? Register
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    color: "#007BFF",
    fontSize: 16,
  },
});
