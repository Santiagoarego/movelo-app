import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);

  const changeForm = () => {
    setIsLogin(!isLogin);
  };
  return (
    <View style={styles.view}>
      <Image
        style={styles.logo}
        source={require("../assets/logo-movelo.png")}
      />

      {isLogin ? (
        <LoginForm changeForm={changeForm} setUser={setUser} />
      ) : (
        <RegisterForm changeForm={changeForm} setUser={setUser} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    marginTop: 50,
    marginBottom: 50,
  },
});
