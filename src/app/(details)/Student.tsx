import React from "react";
import { StyleSheet, View } from "react-native";
import Login from "../(auth)/Login";

const Student = () => {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
};

export default Student;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
