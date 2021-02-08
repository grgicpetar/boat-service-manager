import React, { useEffect } from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

export default function Login() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isFocused) {
      setUsername("");
      setPassword("");
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.title}>Boat Service Manager</Text>
      <View style={styles.loginForm}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={username}
            placeholder={"Korisničko ime"}
            placeholderTextColor={"rgba(236, 236, 236, 0.3)"}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={password}
            placeholder={"Lozinka"}
            placeholderTextColor={"rgba(236, 236, 236, 0.3)"}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate("Home", { username, password });
          }}
        >
          <Text style={styles.loginButtonText}>Prijava</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A49",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: "10%",
  },
  title: {
    color: "#ECECEC",
    fontSize: 28,
  },
  loginForm: {
    marginTop: "40%",
  },
  inputContainer: {
    marginBottom: 20,
    padding: 5,
  },
  input: {
    color: "#ECECEC",
    textAlign: "center",
    borderBottomColor: "#ECECEC",
    borderBottomWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  loginButton: {
    backgroundColor: "#ECECEC",
    padding: 10,
    borderRadius: 10,
  },
  loginButtonText: {
    textAlign: "center",
    color: "#181A49",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 16,
  },
});
