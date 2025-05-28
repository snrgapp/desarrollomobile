import { Link } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Emprendimiento = () => {
  interface FormData {
    nombreEmplend: string;
    instagram: string;
    pagina: string;
    actividad: string;
    edadEmpresa: string;
    desafio: string;
    loading: boolean;
    error: string;
  }

  const [input, setInput] = useState<FormData>({
    nombreEmplend: "",
    instagram: "",
    pagina: "",
    actividad: "",
    edadEmpresa: "",
    desafio: "",
    loading: false,
    error: "",
  });
  const resetInputs = () => {
    setInput({
      nombreEmplend: "",
      instagram: "",
      pagina: "",
      actividad: "",
      edadEmpresa: "",
      desafio: "",
      loading: false,
      error: "",
    });
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
            <Text style={styles.label}>Nombre de Emprendimiento</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={input.nombreEmplend}
              onChangeText={(text) => handleChange("nombreEmplend", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>Instagram</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={input.instagram}
              onChangeText={(text) => handleChange("instagram", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>Pagina web</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="Enter number"
              value={input.pagina}
              onChangeText={(text) => handleChange("pagina", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>Actividad que realiza</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={input.actividad}
              onChangeText={(text) => handleChange("actividad", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>Que tiempo tiene tu empresa</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={input.edadEmpresa}
              onChangeText={(text) => handleChange("edadEmpresa", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.desafio}>Desafio que enfrenta</Text>
            <Text style={styles.subLabel}>(eso an lo que necesitas ayuda)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={input.desafio}
              onChangeText={(text) => handleChange("desafio", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Link href="/auth/personalidad" asChild>
              <TouchableOpacity style={styles.button}>
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

export default Emprendimiento;
