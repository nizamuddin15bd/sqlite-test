import { updateCourse } from "@/src/db/courseService";
import { getSingleRecordByColumn } from "@/src/db/dbGlobalFn/getSingleRecordByColumn";
import useGlobleFormHandler from "@/src/hooks/useGlobleFormHandler";
import { router, useLocalSearchParams } from "expo-router";
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

const EditCourse = () => {
  const params = useLocalSearchParams();
  console.log("EditCourse params", params);
  const courseId = Number(params.id);
  const { values, handleChange, setRef } = useGlobleFormHandler({
    name: params.name ? String(params.name) : "",
    fees: params?.fees ? String(params.fees) : "",

    //   price: userDatas?.price || "",
  });

  const handleSubmit = async () => {
    const trimmedName = values?.name?.trim();

    if (!trimmedName || !values?.fees) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const existing: { id?: number; name?: string; fees?: number } | null =
      await getSingleRecordByColumn("courses", "name", trimmedName);

    // ✅ Check if the name exists and it's not the current course
    if (existing && existing.id !== courseId) {
      Alert.alert(
        "Duplicate Course",
        `Course "${trimmedName}" already exists.`
      );
      return;
    }

    const result = await updateCourse({
      id: courseId,
      name: trimmedName,
      fees: Number(values.fees),
    });

    if (!result.success) {
      Alert.alert("Error", result.message);
      return;
    }

    Alert.alert("Success", "Course updated");
    router.push("/(details)/Courses");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Edit Course</Text>
            <TextInput
              placeholder="Course Name"
              value={values?.name}
              onChangeText={(value) => {
                handleChange("name", value);
                setRef("name", value);
              }}
              style={styles.input}
            />
            <TextInput
              placeholder="Fees"
              value={values?.fees}
              onChangeText={(value) => {
                handleChange("fees", value); // ✅ correct key
                setRef("fees", value); // ✅ correct key
              }}
              keyboardType="numeric"
              style={styles.input}
            />

            <Button color="green" title="Save Changes" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditCourse;

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
