import React from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import BotonCircular from "./BotonCircular";

export default function Panico() {
  return (
    <View style={styles.view}>
      <Text></Text>
      <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
        ¡Cuidado! Por favor, ten en cuenta que debes usar esta función de manera
        honesta y seria.
      </Text>
      <Text></Text>
      <BotonCircular onPress={() => console.log("Hola")} circleDiameter={300}>
        <Text
          style={{
            color: "white",
            fontWeight: "normal",
            textAlign: "center",
            fontSize: 40,
          }}
        >
          Alerta!
        </Text>
      </BotonCircular>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
