import Personalidad from "@/component/Personalidad";
import { ScrollView, StyleSheet, View } from "react-native";

export default function RegisterScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Personalidad />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
