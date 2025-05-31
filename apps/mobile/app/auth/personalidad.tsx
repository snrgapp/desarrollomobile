import Personalidad from "@/component/Personalidad";
import { StyleSheet, View } from "react-native";

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Personalidad />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
