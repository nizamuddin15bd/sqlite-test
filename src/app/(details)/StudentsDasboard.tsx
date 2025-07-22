import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const StudentsDasboard = () => {
  const param = useLocalSearchParams();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const parsed = JSON.parse(user);
        setUsername(parsed.username);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    // Add any logout logic here if needed
    AsyncStorage.removeItem("isLogin");
    router.push("/(auth)/Login");
  };
  console.log("user", AsyncStorage.getItem("user"));

  const feature = [
    {
      id: 1,
      lable: "Mark Attendance",
      image: require("../../assets/images/avator/Markattendance.png"),
      screen: "/(details)/MarkAttendance",
    },
    {
      id: 2,
      lable: "Check Attendance",
      image: require("../../assets/images/avator/checkattendance.jpg"),
      screen: "/(details)/CheckAttendance",
    },
    {
      id: 3,
      lable: "My Course",
      image: require("../../assets/images/avator/mycourse.jpeg"),
      screen: "/(details)/MyCourse",
    },
    {
      id: 4,
      lable: "My Fees",
      image: require("../../assets/images/avator/myfees.jpeg"),
      screen: "/(details)/MyFees",
    },
  ];

  // You can export this function if you want to use it elsewhere
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 70 }}>
        <Text style={styles.title}>Welcome {username} 👋</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "90%",
            alignSelf: "center",
          }}
        >
          {feature?.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                // onPress={() => router.push(item.screen)}
                style={{
                  width: "48%", // Ensures two cards per row with spacing
                  height: 100,
                  marginBottom: 12,
                  // borderWidth: 1,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                }}
              >
                <Image source={item?.image} style={{ width: 40, height: 40 }} />
                <Text style={{ fontSize: 16, fontWeight: "800" }}>
                  {item.lable}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export const logout = () => {
  // Add any logout logic here if needed
  router.push("/(auth)/Login");
};

export default StudentsDasboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  logoutBtn: {
    backgroundColor: "#e53935",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    width: 90,
    position: "absolute",
    top: 20,
    right: 40,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
