import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const StudentsDasboard = () => {
  const param = useLocalSearchParams();

  const handleLogout = () => {
    // Add any logout logic here if needed
    router.push("/(auth)/Login");
  };

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
      <Text style={styles.title}>Welcome {param?.username}</Text>
      <View>
        {feature?.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}

              //   onPress={() => router.push(item.screen)}
            >
              <Image source={item?.image} style={{ width: 30, height: 30 }} />
              <Text>{item.lable}</Text>
            </TouchableOpacity>
          );
        })}
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
    justifyContent: "center",
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
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    width: 120,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
