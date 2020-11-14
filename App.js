//import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import Auth from "./src/components/Auth";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Navigation from "./src/navigation/Navigation";
export default function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.background}>
        {user ? <Navigation user={user} /> : <Auth setUser={setUser} />}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#15212b",
    height: "100%",
  },
});
