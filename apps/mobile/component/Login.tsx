import useAuthStore from "@/stores/authStore";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import type { LoginForm } from "@/stores/authStore";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  // const handleLogin = () => {
  //   setLoading(true);
  //   setError("");
  //   if (!email || !password) {
  //     setError("Por favor, completa todos los campos");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     // Aquí iría la lógica de autenticación
  //     console.log("Email:", email);
  //     console.log("Password:", password);
  //     setEmail("");
  //     setPassword("");
  //     setError("");
  //   } catch (err) {
  //     setError("Error al iniciar sesión");
  //   }
  // };
  const { loginForm, isLoading, error, updateLoginForm, login, clearError } =
    useAuthStore();

  const handleLogin = async (): Promise<void> => {
    const result = await login();

    if (result.success) {
      console.log(result);
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
      loginForm.email.trim().length > 0 && loginForm.password.trim().length > 0
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

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={loginForm.password}
              onChangeText={(value) => handleInputChange("password", value)}
              secureTextEntry
              autoComplete="password"
              editable={!isLoading}
              testID="password-input"
              autoCapitalize="none"
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
