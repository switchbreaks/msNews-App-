// this  component display default Loding

import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loding = () => (
  <View style={[styles.container, styles.horizontal]} >
    <ActivityIndicator size="90%" color="#000" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    
  },
  horizontal: {
    justifyContent: "space-evenly",
    fontSize:7,
    padding: 130
  }
});
export default Loding;
