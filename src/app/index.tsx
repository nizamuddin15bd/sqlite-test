// Home.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { usePagination } from "../components/RUComponents/useLocalPagination";
import { initDB } from "../db/initDB";
// import { initDB } from "../db/schema";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { data, handleRefresh } = usePagination({
    tableName: "courses",
    limit: 20,
    search: searchQuery, // passed as safe string
    sortByOrder: "desc",
  });

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const isLogin = await AsyncStorage.getItem("isLogin");
        const userName = await AsyncStorage.getItem("userName"); // optional
        if (isLogin === "true") {
          router.replace({
            pathname: "/(details)/StudentsDasboard",
            params: { username: userName ?? "" },
          });
        } else {
          setIsLoading(false);
          router.replace("/(auth)/Login");
        }
      } catch (error) {
        console.log("Login check failed:", error);
        setIsLoading(false);
      }
    };

    // initDB();
    checkLogin();
  }, []);
  useEffect(() => {
    initDB();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose User Type</Text>
      <View style={{ gap: 10, width: "90%", alignSelf: "center" }}>
        <TouchableOpacity
          onPress={() => router.push("/(details)/Admin")}
          style={{
            backgroundColor: "green",
            width: "100%",
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
            I am Admin
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(details)/Student")}
          style={{
            backgroundColor: "blue",
            width: "100%",
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
            I am Student
          </Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
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
