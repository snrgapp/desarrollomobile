import { validatePhone } from "@/schemas/authSchema";
import useAuthStore from "@/stores/authStore";
import { RegisterForm } from "@/types/auth";
import { useRouter } from "expo-router";
import {
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
    validationError,
    updateRegisterForm,
    clearError,
    setValidationError,
  } = useAuthStore();

  const router = useRouter();

  const handleRegister = async (): Promise<void> => {
    const phoneValidation = validatePhone(registerForm.phone);
    if (!phoneValidation.success) {
      setValidationError(
        "phone",
        phoneValidation.error?.issues[0]?.message || ""
      );
      return;
    }
    router.replace("/emprendimiento");
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
              placeholder="Ingresa"
              value={registerForm.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
            <Text style={styles.label}>Apellido</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa"
              value={registerForm.lastname}
              onChangeText={(text) => handleInputChange("lastname", text)}
            />
            <Text style={styles.label}>Whatsapp</Text>
            <TextInput
              style={[styles.input, validationError.phone && styles.inputError]}
              keyboardType="phone-pad"
              maxLength={15}
              placeholder="Enter number"
              value={registerForm.phone}
              onChangeText={(text) => handleInputChange("phone", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {validationError.phone && (
              <Text style={styles.errorText}>{validationError.phone}</Text>
            )}
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
  inputError: {
    borderColor: "#ff4444",
    borderWidth: 2,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
    fontFamily: "Montserrat-Regular",
  },
});

export default Register;
