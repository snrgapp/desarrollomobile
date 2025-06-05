import useAuthStore, { RegisterForm } from "@/stores/authStore";
import { useRouter } from "expo-router";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Register = () => {
  const {
    registerForm,
    isLoading,
    error,
    updateRegisterForm,
    register,
    clearError,
  } = useAuthStore();

  const router = useRouter();

  const handleRegister = async (): Promise<void> => {
    const result = await register();
    if (result.success) {
      router.replace("/emprendimiento");
    } else {
      Alert.alert("Register Failed", result.error || "An error occurred");
    }
  };

  const handleInputChange = (
    field: keyof RegisterForm,
    value: string
  ): void => {
    if (error) clearError();
    updateRegisterForm(field, value);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View>
          <Text>...loading</Text>
        </View>
      ) : (
        <>
          <Text style={styles.headerTitle}>INFORMACION</Text>
          <Text style={styles.title}>de Contacto</Text>
          {error ? (
            <Text style={{ color: "red", paddingBottom: 15 }}>{error}</Text>
          ) : null}
          <View>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={registerForm.name}
              onChangeText={(text) => handleInputChange("name", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>Apellido</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={registerForm.lastName}
              onChangeText={(text) => handleInputChange("lastName", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>Whatsapp</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="Enter number"
              value={registerForm.whatsapp}
              onChangeText={(text) => handleInputChange("whatsapp", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>Correo</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={registerForm.email}
              onChangeText={(text) => handleInputChange("email", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Siguente</Text>
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
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 50,
    color: "#333",
    fontFamily: "Montserrat-Bold",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#333",
    fontFamily: "Montserrat-Bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
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
    backgroundColor: "#D9D9D9",
    alignSelf: "flex-end",
    width: 150,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Register;
