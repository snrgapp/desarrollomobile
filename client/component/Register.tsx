import { Link } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface FormData {
  nombre: string;
  apellido: string;
  whatsapp: string;
  correo: string;
  loading: boolean;
  error: string;
}

const Register = () => {
  const [input, setInput] = useState<FormData>({
    nombre: "",
    apellido: "",
    whatsapp: "",
    correo: "",
    loading: false,
    error: "",
  });

  const resetInputs = () => {
    setInput({
      nombre: "",
      apellido: "",
      whatsapp: "",
      correo: "",
      loading: false,
      error: "",
    });
  };
  const handleLogin = () => {
    setInput({ ...input, loading: true });
    setInput({ ...input, error: "" });

    try {
      console.log("Data:", input);
      resetInputs();
    } catch (err) {
      setInput({ ...input, error: "Error al iniciar sesión" });
    }
  };

  const handleChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      {input.loading ? (
        <View>
          <Text>...loading</Text>
        </View>
      ) : (
        <>
          <Text style={styles.headerTitle}>INFORMACION</Text>
          <Text style={styles.title}>de Contacto</Text>
          {input.error ? (
            <Text style={{ color: "red", paddingBottom: 15 }}>
              {input.error}
            </Text>
          ) : null}
          <View>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={input.nombre}
              onChangeText={(text) => handleChange("nombre", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>Apellido</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={input.apellido}
              onChangeText={(text) => handleChange("apellido", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>Whatsapp</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="Enter number"
              value={input.whatsapp}
              onChangeText={(text) => handleChange("whatsapp", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>Correo</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={input.correo}
              onChangeText={(text) => handleChange("correo", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Link href="/auth/emprendimiento" asChild>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Siguente</Text>
              </TouchableOpacity>
            </Link>
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
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Register;
