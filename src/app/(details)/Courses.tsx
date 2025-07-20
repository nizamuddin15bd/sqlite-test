import { deleteLocalData } from "@/src/components/RUComponents/deleteLocalData";
import ListFooter from "@/src/components/RUComponents/ListFooter";
import { usePagination } from "@/src/components/RUComponents/useLocalPagination";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Courses = () => {
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
  // console.log("courses data", data);
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };
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
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push("/(details)/AddCourse")}
        style={styles.addBtn}
      >
        <Text style={styles.addBtnText}>+ Add Course</Text>
      </TouchableOpacity>
      <TextInput
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
        showsVerticalScrollIndicator={false}
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
            <View style={styles.itemContainer}>
              <Text style={styles.itemText1}>{item.name}</Text>
              <Text style={styles.itemText2}>INR {item.fees}</Text>
            </View>
            <View style={styles.editandDeleteContainer}>
              <TouchableOpacity
                style={styles.deletedBtn}
                onPress={() => handleDeleteCourse(item.id!)}
              >
                <Text>
                  <Ionicons name="trash" size={24} color="red" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.EditBtn}
                onPress={() =>
                  router.push({
                    pathname: "/(details)/EditCourse",
                    params: {
                      id: item.id.toString(),
                      name: item.name,
                      fees: item.fees,
                    },
                  })
                }
              >
                <Text>
                  <Feather name="edit" size={24} color="black" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#666",
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  courseItem: {
    flexDirection: "row",
    height: 100,
    width: "100%",
    backgroundColor: "#e4eae4",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,

    // borderBottomWidth: 1,
    // borderColor: "#ccc",
  },
  itemContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 8,
  },
  addBtn: {
    backgroundColor: "green",
    width: "40%",
    height: 40,
    position: "absolute",
    bottom: 35,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    zIndex: 100,
    borderRadius: 10,
  },
  addBtnText: {
    fontSize: 20,
    fontWeight: "800",
    color: "white",
  },
  editandDeleteContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",

    height: "100%",
  },

  deletedBtn: {
    padding: 5,
  },
  EditBtn: {
    padding: 5,
  },

  itemText1: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  itemText2: {
    fontSize: 20,
    fontWeight: "600",
    color: "green",
  },
});
