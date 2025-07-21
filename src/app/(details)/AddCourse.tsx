import { handleLocalPostData } from "@/src/components/RUComponents/handleLocalPostData";
import { getSingleRecordByColumn } from "@/src/db/dbGlobalFn/getSingleRecordByColumn";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const AddCourse = () => {
  const [name, setName] = useState("");
  const [fees, setFees] = useState("");

  const handleAddCourse = async () => {
    const trimmedName = name.trim();
    if (!trimmedName || !fees) return;

    try {
      const existing = await getSingleRecordByColumn(
        "courses",
        "name",
        trimmedName
      );
      if (existing) {
        Alert.alert(
          "Duplicate Course",
          `Course "${trimmedName}" already exists.`
        );
        return;
      }

      const result = await handleLocalPostData({
        route: "/courses",
        data: { name: trimmedName, fees: Number(fees) },
        dataType: "json",
      });
      console.log("AddCourse result", result);
      if (result?.success) {
        setName("");
        setFees("");
        router.push("/(details)/Courses");
      } else {
        Alert.alert(
          "Insert Failed",
          result.message || "Failed to insert course"
        );
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
      console.error("Error adding course:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Add Course</Text>
            <TextInput
              placeholder="Course Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder="Fees"
              value={fees}
              onChangeText={setFees}
              keyboardType="numeric"
              style={styles.input}
            />
            <Button
              color="green"
              title="Add Course"
              onPress={handleAddCourse}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddCourse;

const styles = StyleSheet.create({
  keyboardView: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  container: { width: "100%", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#666",
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
    width: "90%",
  },
});
