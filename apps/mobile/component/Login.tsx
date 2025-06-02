import type { LoginForm } from "@/stores/authStore";
import useAuthStore from "@/stores/authStore";
import { Image } from "expo-image";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const { loginForm, isLoading, error, updateLoginForm, login, clearError } =
    useAuthStore();

  const handleLogin = async (): Promise<void> => {
    const result = await login();
    if (result.success) {
      console.log("200 OK");
      // authAPI.login(loginForm);
    } else {
      Alert.alert("Login Failed", result.error || "An error occurred");
    }
  };

  const handleInputChange = (field: keyof LoginForm, value: string): void => {
    if (error) clearError();
    updateLoginForm(field, value);
  };

  const isFormValid = (): boolean => {
    return (
      loginForm.email.trim().length > 0
      //&& loginForm.password.trim().length > 0
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View>
          <Text>...loading</Text>
        </View>
      ) : (
        <>
          <Text style={styles.headerTitle}>Bienvenido</Text>
          <Text style={styles.title}>EMPRENDEDOR/A</Text>
          <Text style={styles.subtitle}>Ingresa tus datos</Text>
          {error ? (
            <Text style={{ color: "red", paddingBottom: 15 }}>{error}</Text>
          ) : null}
          <View>
            <TouchableOpacity
              style={[
                styles.googleButton,
                (!isFormValid() || isLoading) && styles.buttonDisabled,
              ]}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={styles.googleLogo}
                    source={require("../assets/images/google-logo.png")}
                  />
                  <Text style={styles.googleLabel}>Log in with Google</Text>
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.lineContainer}>
              <View style={styles.line} />
              <Text style={styles.text}>Or use you email</Text>
              <View style={styles.line} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={loginForm.email}
              onChangeText={(value) => handleInputChange("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!isLoading}
              testID="email-input"
            />
            <TouchableOpacity
              style={[
                styles.button,
                (!isFormValid() || isLoading) && styles.buttonDisabled,
              ]}
              onPress={handleLogin}
              disabled={!isFormValid() || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 5,
    color: "#333",
    fontFamily: "Inter",
    fontWeight: "400",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 5,
    color: "#333",
    fontFamily: "Montserrat",
    fontWeight: "700",
  },
  subtitle: {
    paddingTop: 50,
    paddingBottom: 20,
    // fontFamily: "Montserrat",
    fontWeight: "400",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    fontFamily: "Montserrat-Regular",
  },

  googleButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  googleLabel: {
    fontSize: 14,
    fontWeight: "600",
  },

  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  text: {
    marginHorizontal: 15,
    fontSize: 14,
    color: "#888",
    fontWeight: "400",
  },

  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Login;
