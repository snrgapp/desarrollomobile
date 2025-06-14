import Login from "@/component/authentication/Login";
import { StyleSheet, View } from "react-native";
import {
  KeyboardProvider,
  KeyboardAwareScrollView,
} from "react-native-keyboard-controller";

export default function LoginScreen() {
  return (
    <KeyboardProvider>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.container}>
          <Login />
        </View>
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
  },
  contentContainer: {
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    color: "#007BFF",
    fontSize: 16,
  },
});
