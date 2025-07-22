import { usePagination } from "@/src/components/RUComponents/useLocalPagination";
import { handleLocalPostData } from "@/src/db/created/handleLocalPostData";
import { getSingleRecordByColumn } from "@/src/db/dbGlobalFn/getSingleRecordByColumn";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const Signup = () => {
  const router = useRouter();
  const { data } = usePagination({
    tableName: "courses",
    limit: 100,
    sortByOrder: "desc",
  });

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!fullName || !email || !selectedCourse || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    try {
      // Check for duplicate email
      const existing = await getSingleRecordByColumn(
        "students",
        "email",
        email
      );
      if (existing) {
        Alert.alert("Error", "Email already exists. Please use another email.");
        return;
      }

      const result = await handleLocalPostData({
        route: "/students",
        data: {
          name: fullName,
          email,
          course_id: selectedCourse,
          password,
        },
        dataType: "json",
      });

      if (result.success) {
        Alert.alert("Success", "Registered successfully!");
        setFullName("");
        setEmail("");
        setSelectedCourse(null);
        setPassword("");
        router.push("/(auth)/Login");
      } else {
        Alert.alert("Error", result.message || "Registration failed");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Dropdown
        data={
          data?.map((item: any) => ({
            label: item.name,
            value: item.id,
          })) || []
        }
        labelField="label"
        valueField="value"
        style={styles.dropdown}
        value={selectedCourse}
        onChange={(item) => setSelectedCourse(item.value)}
        placeholder="Select Course"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => router.push("/(auth)/Login")}
      >
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={{ color: "#4CAF50", fontWeight: "bold" }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f7f7f7",
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
  dropdown: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  registerBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  loginLink: {
    marginTop: 24,
    alignItems: "center",
  },
  loginText: {
    color: "#333",
    fontSize: 16,
  },
});
