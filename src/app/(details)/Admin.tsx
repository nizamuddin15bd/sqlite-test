import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Admin = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Admin</Text>
      <TouchableOpacity
        onPress={() => router.push("/(details)/Courses")}
        style={{
          backgroundColor: "green",
          width: "90%",
          paddingVertical: 12,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: 17,
          }}
        >
          Go To Courses
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({});
