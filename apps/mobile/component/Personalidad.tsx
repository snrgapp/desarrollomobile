import useAuthStore, { RegisterForm } from "@/stores/authStore";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Personalidad = () => {
  const {
    registerForm,
    isLoading,
    error,
    updateRegisterForm,
    register,
    clearError,
  } = useAuthStore();

  const handleRegister = async (): Promise<void> => {
    const result = await register();
    if (result.success) {
      console.log("Register result:", result);
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
          {error ? (
            <Text style={{ color: "red", paddingBottom: 15 }}>{error}</Text>
          ) : null}
          <View>
            <Text style={styles.title}>Acerca de tu</Text>
            <Text style={styles.headerTitle}>PERSONALIDAD</Text>

            <Text style={styles.label}>Un dato curioso tuyo</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={registerForm.datoCurioso}
              onChangeText={(text) => handleInputChange("datoCurioso", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>Pasion</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={registerForm.pasion}
              onChangeText={(text) => handleInputChange("pasion", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>Pagina web</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="Enter text"
              value={registerForm.deporte}
              onChangeText={(text) => handleInputChange("deporte", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View>
            <TouchableOpacity onPress={handleRegister} style={styles.button}>
              <Text style={styles.buttonText}>Terminamos</Text>
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
    paddingTop: 50,
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "#fff",
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
    marginBottom: 50,
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

export default Personalidad;
