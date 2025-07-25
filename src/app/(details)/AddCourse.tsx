import { handleLocalPostData } from "@/src/db/created/handleLocalPostData";
import { getSingleRecordByColumn } from "@/src/db/dbGlobalFn/getSingleRecordByColumn";
import { dbRName } from "@/src/db/operations/utils";
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
  const [error, setError] = React.useState<string | null>(null);
  const handleAddCourse = async () => {
    const trimmedName = name.trim();
    if (!trimmedName || !fees) {
      setError("Please fill all fields");
      return;
    }

    try {
      const existing = await getSingleRecordByColumn(
        `${dbRName?.courses}`,
        "name",
        trimmedName
      );
      if (existing) {
        setError(`Course "${trimmedName}" already exists.`);
        return;
      }

      const result = await handleLocalPostData({
        route: `/${dbRName?.courses}`,
        data: { name: trimmedName, fees: Number(fees) },
        dataType: "json",
      });

      if (result.success) {
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
            <Text
              style={{
                textAlign: "center",
                color: "red",
                marginVertical: error ? 10 : 0,
              }}
            >
              {error}
            </Text>
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
