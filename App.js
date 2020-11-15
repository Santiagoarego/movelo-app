//import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import Auth from "./src/components/Auth";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Navigation from "./src/navigation/Navigation";
import { AuthContext } from "./src/components/context";
export default function App() {
  const [user, setUser] = useState(null);

  const authContext = useMemo(() => ({
    getUser: () => {
      return user;
    },
  }));

  return (
    <AuthContext.Provider value={authContext}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.background}>
        {user ? <Navigation /> : <Auth setUser={setUser} />}
      </SafeAreaView>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#15212b",
    height: "100%",
  },
});
