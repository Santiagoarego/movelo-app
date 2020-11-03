import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Mapa() {
  return (
    <View style={styles.view}>
      <Text>Mapa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
  },
});
