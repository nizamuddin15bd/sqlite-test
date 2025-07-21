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

const AddSubject = () => {
  const router = useRouter();

  const { data } = usePagination({
    tableName: "courses",
    limit: 20,
    sortByOrder: "desc",
  });

  const [name, setName] = useState("");
  const [courseId, setCourseId] = useState<number | null>(null);
  const [selectedLable, setSelectedLable] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // components/SubjectForm.tsx
  const handleAddSubject = async () => {
    setError(null);
    const trimmedName = name.trim();

    if (!trimmedName || !courseId) {
      setError("Please fill all fields");
      return;
    }

    try {
      const existing = await getSingleRecordByColumn(
        "subjects",
        "name",
        trimmedName
      );

      if (existing) {
        setError(`Subject "${trimmedName}" already exists.`);
        return;
      }

      const course = await getSingleRecordByColumn("courses", "id", courseId);
      if (!course) {
        setError("Selected course does not exist.");
        return;
      }

      // ✅ course_name added
      const result = await handleLocalPostData({
        route: "/subjects",
        data: {
          name: trimmedName,
          course_id: courseId,
          course_name: selectedLable, // ⬅️ Required field
        },
        dataType: "json",
      });

      if (result.success) {
        setName("");
        setCourseId(null);
        router.push("/(details)/Courses");
      } else {
        Alert.alert(
          "Insert Failed",
          result.message || "Failed to insert subject"
        );
      }
    } catch (error) {
      console.error("Error adding subject:", error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Subject</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TextInput
        placeholder="Enter Subject Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
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
        value={courseId}
        onChange={(item) => {
          setCourseId(item.value);
          setSelectedLable(item.label);
          // Access both value and label here:
          console.log("Selected value:", item.value);
          console.log("Selected label:", item.label);
          // You can also store both in state if needed:
          // setSelectedCourse({ value: item.value, label: item.label });
        }}
        placeholder="Select Course"
      />

      {courseId && (
        <Text style={styles.selectedText}>Selected Course ID: {courseId}</Text>
      )}

      <TouchableOpacity style={styles.submitBtn} onPress={handleAddSubject}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddSubject;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    paddingLeft: 10,
    alignSelf: "center",
    marginBottom: 15,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
  submitBtn: {
    width: "90%",
    height: 50,
    marginTop: 20,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#ffffff",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  selectedText: {
    marginTop: 10,
    textAlign: "center",
  },
});
