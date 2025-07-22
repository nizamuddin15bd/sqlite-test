import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const StudentsDasboard = () => {
  const handleLogout = () => {
    // Add any logout logic here if needed
    router.push("/(auth)/Login");
  };

  // You can export this function if you want to use it elsewhere
  return (
    <View style={styles.container}>
      <Text style={styles.title}>StudentsDasboard</Text>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export const logout = () => {
  // Add any logout logic here if needed
  router.push("/(auth)/Login");
};

export default StudentsDasboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  logoutBtn: {
    backgroundColor: "#e53935",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    width: 120,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
