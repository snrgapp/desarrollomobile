import useAuthStore, { RegisterForm } from "@/stores/authStore";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Emprendimiento = () => {
  const { registerForm, isLoading, error, updateRegisterForm, clearError } =
    useAuthStore();
  const router = useRouter();

  const handleRegister = async (): Promise<void> => {
    router.replace("/personalidad");
  };

  const handleInputChange = <K extends keyof RegisterForm>(
    field: K,
    value: RegisterForm[K]
  ) => {
    if (error) clearError();
    updateRegisterForm(field, value);
  };

  //   // Or if you're receiving field and value from form events:
  // function handleFormChange<K extends keyof RegisterForm>(
  //   field: K,
  //   value: RegisterForm[K]
  // ) {
  //   updateRegisterForm(field, value);
  // }

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
              placeholder="Ingresa"
              value={registerForm.emprendimiento}
              onChangeText={(text) => handleInputChange("emprendimiento", text)}
            />
            <Text style={styles.label}>Instagram</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa @"
              value={registerForm.instagram}
              onChangeText={(text) => handleInputChange("instagram", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.label}>Tamaño de la organizacion</Text>
            <View style={styles.pickerContainer}>
              <Picker<(typeof registerForm)["tamañoOrganizacion"]>
                selectedValue={registerForm.tamañoOrganizacion}
                onValueChange={(itemValue) =>
                  handleInputChange("tamañoOrganizacion", itemValue)
                }
                style={styles.picker}
              >
                <Picker.Item label="Escoge" value={undefined} enabled={false} />
                <Picker.Item label="1-3 personas" value="1-3" />
                <Picker.Item label="4-10 personas" value="4-10" />
                <Picker.Item label="11-100 personas" value="11-100" />
              </Picker>
            </View>
            <Text style={styles.label}>Actividad que realiza</Text>
            <View style={styles.pickerContainer}>
              <Picker<(typeof registerForm)["actividad"]>
                selectedValue={registerForm.actividad}
                onValueChange={(itemValue) =>
                  handleInputChange("actividad", itemValue)
                }
                style={styles.picker}
              >
                <Picker.Item label="Escoge" value={undefined} enabled={false} />
                <Picker.Item label="Comercio" value="Comercio" />
                <Picker.Item label="Servicio" value="Servicio" />
                <Picker.Item label="Industria" value="Industria" />
                <Picker.Item label="Tecnología" value="Tecnología" />
                <Picker.Item label="Otro" value="Otro" />
              </Picker>
            </View>
            <Text style={styles.label}>Que tiempo tiene tu empresa</Text>
            <View style={styles.pickerContainer}>
              <Picker<(typeof registerForm)["edadEmpresa"]>
                selectedValue={registerForm.edadEmpresa}
                onValueChange={(itemValue) =>
                  handleInputChange("edadEmpresa", itemValue)
                }
                style={styles.picker}
              >
                <Picker.Item label="Escoge" value={undefined} enabled={false} />
                <Picker.Item label="6 meses" value="6 meses" />
                <Picker.Item label="+1 año" value="+1 año" />
                <Picker.Item label="+3 años" value="+3 años" />
              </Picker>
            </View>
            <Text style={styles.desafio}>Desafio que enfrenta</Text>
            <Text style={styles.subLabel}>(eso an lo que necesitas ayuda)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa"
              value={registerForm.desafio}
              onChangeText={(text) => handleInputChange("desafio", text)}
            />
            <Text style={styles.desafio}>
              ¿Como te enteraste de nuestas reuniones?
            </Text>
            <View style={styles.pickerContainer}>
              <Picker<(typeof registerForm)["comoSeEntero"]>
                selectedValue={registerForm.comoSeEntero}
                onValueChange={(itemValue) =>
                  handleInputChange("comoSeEntero", itemValue)
                }
                style={styles.picker}
              >
                <Picker.Item label="Escoge" value={undefined} enabled={false} />
                <Picker.Item label="Amigo" value="Amigo" />
                <Picker.Item label="Instagram" value="Instagram" />
                <Picker.Item label="LinkedIn" value="LinkedIn" />
                <Picker.Item
                  label="Ya he venido antes"
                  value="Ya he venido antes"
                />
              </Picker>
            </View>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
  },
  picker: {
    height: 60,
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
