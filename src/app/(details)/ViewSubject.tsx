import { usePagination } from "@/src/components/RUComponents/useLocalPagination";
import { handleLocalDeleteData } from "@/src/db/deleted/handleLocalDeleteData";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const ViewSubject = () => {
  const {
    data,
    handleRefresh,
    loadMore,
    initialLoader,
    loadingMore,
    totalResult,
    hasMore,
  } = usePagination({
    tableName: "subjects",
    limit: 20,
    sortByOrder: "desc",
  });
  console.log();
  const { data: coursesData } = usePagination({
    tableName: "courses",
    limit: 100,
    sortByOrder: "desc",
  });

  const [viewMode, setViewMode] = React.useState<"all" | "byCourse">("all");
  const [selectedCourse, setSelectedCourse] = React.useState<any>(null);
  const router = useRouter();

  // Filter subjects by selected course if needed
  const filteredSubjects =
    viewMode === "byCourse" && selectedCourse
      ? data?.filter((item: any) => item.course_id === selectedCourse)
      : data;

  // Example delete handler
  const handleDeleteCourse = async (id: number) => {
    const result = await handleLocalDeleteData({ route: "/subjects", id });

    if (result.success) {
      handleRefresh(); // refresh UI
    } else {
      console.warn("Delete failed:", result.message);
    }
  };
  const confirmDeleteCourse = (id: number) => {
    Alert.alert(
      "Delete Course",
      "Are you sure you want to delete this course?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDeleteCourse(id),
        },
      ]
    );
  };
  // Example edit handler
  const handleEdit = (item: any) => {
    // navigation or router logic here
    Alert.alert("Edit", `Edit subject: ${item.name}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subjects List</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, viewMode === "all" && styles.activeBtn]}
          onPress={() => setViewMode("all")}
        >
          <Text style={styles.btnText}>All Subjects</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleBtn,
            viewMode === "byCourse" && styles.activeBtn,
          ]}
          onPress={() => setViewMode("byCourse")}
        >
          <Text style={styles.btnText}>Subjects by Course</Text>
        </TouchableOpacity>
      </View>
      {viewMode === "byCourse" && (
        <Dropdown
          data={
            coursesData?.map((item: any) => ({
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
      )}
      <FlatList
        data={filteredSubjects}
        keyExtractor={(item) => item.id?.toString() || ""}
        onEndReached={hasMore ? loadMore : null}
        onEndReachedThreshold={0.5}
        refreshing={initialLoader}
        showsVerticalScrollIndicator={false}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <Text style={styles.noData}>No subjects found.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.subjectName}>{item.name}</Text>
            <Text style={styles.courseId}>Course ID: {item.course_id}</Text>
            <Text style={styles.courseId}>Course Name: {item.course_name}</Text>
            <View style={styles.iconRow}>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() =>
                  router.push({
                    pathname: "/(details)/EditSubject",
                    params: {
                      id: item.id.toString(),
                      name: item.name,
                    },
                  })
                }
              >
                <Feather name="edit" size={22} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => confirmDeleteCourse(item.id!)}
              >
                <Ionicons name="trash" size={22} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ViewSubject;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  toggleBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginHorizontal: 5,
  },
  activeBtn: {
    backgroundColor: "#4CAF50",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "100%",
    alignSelf: "center",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  courseId: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  noData: {
    textAlign: "center",
    color: "#888",
    marginTop: 40,
    fontSize: 16,
  },
  iconRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
  },
  iconBtn: {
    marginLeft: 16,
  },
});
