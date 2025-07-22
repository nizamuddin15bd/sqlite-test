import { usePagination } from "@/src/components/RUComponents/useLocalPagination";
import { dbRName } from "@/src/db/operations/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const { data } = usePagination({
    tableName: `${dbRName?.students}`,
  });
  // console.log("user Data", data);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    const inputEmail = username.trim().toLowerCase();
    const user = Array.isArray(data)
      ? data.find(
          (item: any) =>
            typeof item.email === "string" &&
            item.email.trim().toLowerCase() === inputEmail &&
            item.password === password
        )
      : undefined;

    if (user) {
      try {
        await AsyncStorage.setItem("isLogin", "true"); // ✅ Save login status
        await AsyncStorage.setItem(
          "user",
          JSON.stringify({ username: user.name })
        );
        // Optional: save full user

        Alert.alert("Success", "Logged in!");
        router.push({
          pathname: "/(details)/StudentsDasboard",
          params: { username: user.name },
        });
      } catch (error) {
        Alert.alert("Storage Error", "Failed to save login state.");
      }
    } else {
      Alert.alert(
        "Error",
        "Please sign up or enter your current email and password"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => {
          /* navigation logic here */
          router.push("/(auth)/Signup");
        }}
      >
        <Text style={styles.registerText}>
          Don&apos;t have an account?{" "}
          <Text style={{ color: "#4CAF50", fontWeight: "bold" }}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f7f7f7",
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  loginBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  registerLink: {
    marginTop: 24,
    alignItems: "center",
  },
  registerText: {
    color: "#333",
    fontSize: 16,
  },
});
