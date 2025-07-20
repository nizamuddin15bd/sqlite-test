// Home.tsx
import { Course } from "@/types";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deleteLocalData } from "../components/RUComponents/deleteLocalData";
import { handleLocalPostData } from "../components/RUComponents/handleLocalPostData";
import { usePagination } from "../components/RUComponents/useLocalPagination";
import { initDB } from "../db/schema";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data,
    handleRefresh,
    loadMore,
    initialLoader,
    loadingMore,
    refreshing,
    totalResult,
    hasMore,
  } = usePagination({
    tableName: "courses",
    limit: 20,
    search: searchQuery, // passed as safe string
    sortByOrder: "desc",
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const [name, setName] = useState("");
  const [fees, setFees] = useState("");

  useEffect(() => {
    const setup = async () => {
      await initDB();
      loadCourses();
    };
    setup();
  }, []);

  const loadCourses = async () => {
    // const data = await getCourses();
    setCourses(data);
  };

  // const handleAddCourse = async () => {
  //   if (name.trim() && fees) {
  //     await insertCourse({ name, fees: Number(fees) });
  //     setName('');
  //     setFees('');
  //     // loadCourses();
  //     handleRefresh()
  //   }
  // };

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

        if (result?.success === false) {
          console.error("Failed to insert course:", result.message);
          // Optionally show error to user
          return;
        }

        setName("");
        setFees("");
        handleRefresh(); // reload course list
      } catch (error) {
        console.error("Error adding course:", error);
        // Optionally show error to user
      }
    }
  };

  // const handleDeleteCourse = async (id: number) => {
  //   await deleteCourse(id);
  //   // loadCourses();
  //   handleRefresh()
  // };
  const handleDeleteCourse = async (id: number) => {
    try {
      const result = await deleteLocalData({ table: "courses", id });
      if (result.success) {
        // refresh list or UI
        handleRefresh();
      } else {
        console.warn(result.message);
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // const handleSearch = async (text: string) => {
  //   setSearchQuery(text);
  //   const results = await searchCourses(text);
  //   setCourses(results);
  // };
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };
  return (
    <View style={styles.container}>
      {/* <TextInput
        style={{ borderWidth: 1, borderColor: "green", borderRadius: 10 }}
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search course"
      />

      <Text style={styles.title}>Courses</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id?.toString() || ""}
        onEndReached={hasMore ? loadMore : null}
        onEndReachedThreshold={0.5}
        refreshing={initialLoader}
        onRefresh={handleRefresh}
        ListFooterComponent={
          <ListFooter
            dataLength={data?.length}
            loadingMore={loadingMore}
            totalResult={totalResult}
            hasMore={hasMore}
          />
        }
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <Text>
              {item.name} - ${item.fees}
            </Text>
            <TouchableOpacity onPress={() => handleDeleteCourse(item.id!)}>
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

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
      <Button title="Add Course" onPress={handleAddCourse} /> */}
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

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
