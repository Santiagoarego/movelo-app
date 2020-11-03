import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import Mapa from "../components/Mapa";

const Stack = createStackNavigator();

export default function MapaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="mapa"
        component={Mapa}
        options={{
          title: "Ruta",
          headerTintColor: "#fff",
          cardStyle: { backgroundColor: "#15212b" },
          headerStyle: { backgroundColor: "#05e680" },
        }}
      />
    </Stack.Navigator>
  );
}
