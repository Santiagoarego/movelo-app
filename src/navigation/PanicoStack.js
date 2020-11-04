import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import Panico from "../components/Panico";

const Stack = createStackNavigator();

export default function PanicoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="panico"
        component={Panico}
        options={{
          title: "Boton Panico",
          cardStyle: { backgroundColor: "#15212b" },
          headerStyle: { backgroundColor: "#fd2f2f" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
