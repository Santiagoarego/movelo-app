import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapaStack from "./MapaStack";
import PanicoStack from "./PanicoStack";

const Tab = createMaterialBottomTabNavigator();

export default function Navigation({ user }) {
  return (
    <NavigationContainer>
      <Tab.Navigator shifting initialRouteName="mapa" activeColor="#ffffff">
        <Tab.Screen
          name="mapa"
          component={MapaStack}
          options={{
            tabBarLabel: "Ruta",
            tabBarColor: "#05e680",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="map" color={color} size={26} />
            ),
          }}
          initialParams={{
            user: user,
          }}
        />
        <Tab.Screen
          name="panico"
          component={PanicoStack}
          options={{
            tabBarLabel: "Boton Panico",
            tabBarColor: "#fd2f2f",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="alert" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
