import { handleLocalPostData } from "@/src/components/RUComponents/handleLocalPostData";
import { router } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const AddCourse = () => {
  const [name, setName] = useState("");
  const [fees, setFees] = useState("");
  const handleAddCourse = async () => {
    if (name.trim() && fees) {
      try {
        const result = await handleLocalPostData({
          route: "/courses",
          data: {
            name,
            fees: Number(fees),
          },
          dataType: "json", // optional
        });
        if (result?.success === true) {
          setName("");
          setFees("");
          router.push("/(details)/Courses");
        }

        if (result?.success === false) {
          console.error("Failed to insert course:", result.message);
          // Optionally show error to user
          return;
        }

        setName("");
        setFees("");
        //   handleRefresh(); // reload course list
      } catch (error) {
        console.error("Error adding course:", error);
        // Optionally show error to user
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text>AddCourse</Text>
      <View
        style={{
          width: "100%",
          marginTop: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
        <Button color={"green"} title="Add Course" onPress={handleAddCourse} />
      </View>
    </View>
  );
};

export default AddCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#666",
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
    width: "90%",
  },
  courseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});
