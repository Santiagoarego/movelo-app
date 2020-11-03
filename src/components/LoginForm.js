import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateEmail } from "../utils/validador";

import { Button } from "react-native-elements";

import axios from "axios";
export default function LoginForm(props) {
  const { changeForm, setUser } = props;
  const [data, setData] = useState({ correo: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const submitData = () => {
    if (!data.correo || !data.password) {
      Alert.alert("Campos vacios", "Necesita llenar todos los campos");
    } else if (!validateEmail(data.correo)) {
      Alert.alert("Formato incorrecto de correo", "Revisa el correo");
    } else {
      setIsLoading(true);
      console.log(data);
      //apiEndPoint();
      apiAxios();
    }
  };

  const apiEndPoint = async () => {
    await fetch(
      `https://proyecto-arquitectura.herokuapp.com/facade/loginBici?correo=${encodeURIComponent(
        data.correo
      )}&password=${encodeURIComponent(data.password)}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        console.log("respuesta servidor");
        console.log(json);

        setIsLoading(false);
        if (!json.mensaje) setUser(json);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const apiAxios = () => {
    axios({
      method: "POST",
      url: "https://proyecto-arquitectura.herokuapp.com/facade/loginBici",
      params: { correo: data.correo, password: data.password },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("SUCCESS AXIOS");
        console.log(res.data);
        setIsLoading(false);
        setUser(res.data);
      })
      .catch((err) => {
        console.log("failed axios");
        console.log(err.response.data);
        setIsLoading(false);
        Alert.alert("error", err.response.data.mensaje);
      });
  };
  return (
    <>
      <KeyboardAwareScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <TextInput
          placeholder="Correo electronico"
          placeholderTextColor="#969696"
          style={styles.input}
          autoCompleteType="email"
          keyboardType="email-address"
          onChange={(e) => setData({ ...data, correo: e.nativeEvent.text })}
        />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#969696"
          style={styles.input}
          secureTextEntry={true}
          textContentType="password"
          onChange={(e) => setData({ ...data, password: e.nativeEvent.text })}
        />

        <Button
          type="clear"
          title="Iniciar Sesion"
          titleStyle={styles.btnTextPrincipal}
          loadingProps={{ color: "#05e680" }}
          onPress={submitData}
          loading={isLoading}
        />
      </KeyboardAwareScrollView>
      <TouchableOpacity onPress={changeForm} style={{ marginVertical: 20 }}>
        <Text style={styles.btnText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  btnText: {
    color: "#fff",
    fontSize: 18,
  },
  input: {
    height: 50,
    color: "#fff",
    width: "80%",
    marginBottom: 25,
    backgroundColor: "#1e3040",
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#1e3040",
  },
  btnTextPrincipal: {
    color: "#05e680",
    fontSize: 18,
  },
});
