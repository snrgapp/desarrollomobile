import Emprendimiento from "@/component/Emprendimiento";
import { ScrollView, StyleSheet, View } from "react-native";

export default function RegisterScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Emprendimiento />
      </View>
    </ScrollView>
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
    overflow: "scroll",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
