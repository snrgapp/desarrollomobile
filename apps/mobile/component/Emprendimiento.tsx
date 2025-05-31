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

const Emprendimiento = () => {
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
      router.replace("/auth/personalidad");
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
            <Text style={styles.label}>Nombre de Emprendimiento</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={registerForm.emprendimiento}
              onChangeText={(text) => handleInputChange("emprendimiento", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>Instagram</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={registerForm.instagram}
              onChangeText={(text) => handleInputChange("instagram", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>Tamaño de la organizacion</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="Enter number"
              value={registerForm.tamañoOrganizacion}
              onChangeText={(text) =>
                handleInputChange("tamañoOrganizacion", text)
              }
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>Actividad que realiza</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={registerForm.actividad}
              onChangeText={(text) => handleInputChange("actividad", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>Que tiempo tiene tu empresa</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={registerForm.edadEmpresa}
              onChangeText={(text) => handleInputChange("edadEmpresa", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.desafio}>Desafio que enfrenta</Text>
            <Text style={styles.subLabel}>(eso an lo que necesitas ayuda)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={registerForm.desafio}
              onChangeText={(text) => handleInputChange("desafio", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.desafio}>
              ¿Como te enteraste de nuestas reuniones?
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={registerForm.comoSeEntero}
              onChangeText={(text) => handleInputChange("comoSeEntero", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity onPress={handleRegister} style={styles.button}>
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
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 5,
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
  desafio: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  subLabel: {
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

export default Emprendimiento;
