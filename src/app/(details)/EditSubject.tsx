import { getSingleRecordByColumn } from "@/src/db/dbGlobalFn/getSingleRecordByColumn";
import { handleLocalUpdateData } from "@/src/db/updated/handleLocalUpdateData";
import useGlobleFormHandler from "@/src/hooks/useGlobleFormHandler";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

const EditSubject = () => {
  const params = useLocalSearchParams();
  console.log("EditCourse params", params);
  const courseId = Number(params.id);
  const { values, handleChange, setRef } = useGlobleFormHandler({
    name: params.name ? String(params.name) : "",
    // fees: params?.fees ? String(params.fees) : "",

    //   price: userDatas?.price || "",
  });
  const [error, setError] = React.useState<string | null>(null);
  const handleSubmit = async () => {
    const trimmedName = values?.name?.trim();

    if (!trimmedName || !values?.name) {
      // If any field is empty, set error
      setError("Please fill all fields");
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const existing: { id?: number; name?: string; fees?: number } | null =
      await getSingleRecordByColumn("courses", "name", trimmedName);

    // If course name already exists and it's not the current course, set error
    if (existing && existing.id !== courseId) {
      setError(`Course "${trimmedName}" already exists.`);
      // Alert.alert(
      //   "Duplicate Course",
      //   `Course "${trimmedName}" already exists.`
      // );
      return;
    }

    // const result = await updateCourse({
    //   id: courseId,
    //   name: trimmedName,
    //   fees: Number(values.fees),
    // });
    const result = await handleLocalUpdateData({
      route: "/subjects",
      id: courseId,
      data: { name: trimmedName },
      dataType: "json",
    });
    if (!result.success) {
      Alert.alert("Error", result.message);
      return;
    }

    Alert.alert("Success", "Course updated");
    router.push("/(details)/ViewSubject");
  };
  return (
    <View style={styles.keyboardView}>
      <View style={styles.container}>
        <Text>EditSubject</Text>
        <TextInput
          placeholder="Fees"
          value={values?.name}
          onChangeText={(value) => {
            handleChange("name", value); // ✅ correct key
            setRef("name", value); // ✅ correct key
          }}
          keyboardType="default"
          style={styles.input}
        />
        <Button color="green" title="Save Changes" onPress={handleSubmit} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  keyboardView: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
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
});
export default EditSubject;
