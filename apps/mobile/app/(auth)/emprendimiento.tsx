import Emprendimiento from "@/component/authentication/Emprendimiento";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardProvider,
} from "react-native-keyboard-controller";

export default function RegisterScreen() {
  return (
    <KeyboardProvider>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ScrollView>
          <View style={styles.container}>
            <Emprendimiento />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardProvider>
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
  contentContainer: {
    backgroundColor: "#fff",
    flexGrow: 1,
  },
});
