import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-elements";
import { validateEmail } from "../utils/validador";
import axios from "axios";

export default function RegisterForm(props) {
  const { changeForm, setUser } = props;
  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  let usuario = {};

  const submitData = () => {
    let errors = {};

    if (
      !formData.email ||
      !formData.confirmPassword ||
      !formData.nombre ||
      !formData.password ||
      !formData.apellido
    ) {
      if (!formData.email) errors.email = true;
      if (!formData.confirmPassword) errors.confirmPassword = true;
      if (!formData.nombre) errors.nombre = true;
      if (!formData.password) errors.password = true;
      if (!formData.apellido) errors.apellido = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else if (formData.password.length < 6) {
      errors.password = true;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = true;
    } else {
      setIsLoading(true);
      usuario = {
        id: "",
        correo: formData.email,
        nombre: formData.nombre,
        apellido: formData.apellido,
        password: formData.password,
        rol: "biciusuario",
        bicicletas: [],
      };

      apiEndPoint();
    }

    setFormError(errors);
  };
  const apiEndPoint = async () => {
    console.log(usuario);
    axios({
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url:
        "https://proyecto-arquitectura.herokuapp.com/proxy/agregarBiciusuario",
      data: JSON.stringify(usuario),
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
          placeholder="Nombres"
          placeholderTextColor="#969696"
          style={[styles.input, formError.nombre && styles.error]}
          onChange={(e) =>
            setFormData({ ...formData, nombre: e.nativeEvent.text })
          }
          autoCompleteType="name"
        />
        <TextInput
          placeholder="Apellidos"
          placeholderTextColor="#969696"
          style={[styles.input, formError.apellido && styles.error]}
          onChange={(e) =>
            setFormData({ ...formData, apellido: e.nativeEvent.text })
          }
          autoCompleteType="name"
        />
        <TextInput
          placeholder="Correo electronico"
          placeholderTextColor="#969696"
          style={[styles.input, formError.email && styles.error]}
          onChange={(e) =>
            setFormData({ ...formData, email: e.nativeEvent.text })
          }
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#969696"
          style={[styles.input, formError.password && styles.error]}
          onChange={(e) =>
            setFormData({ ...formData, password: e.nativeEvent.text })
          }
          secureTextEntry={true}
          textContentType="password"
        />
        <TextInput
          placeholder="Repetir Contraseña"
          placeholderTextColor="#969696"
          style={[styles.input, formError.confirmPassword && styles.error]}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.nativeEvent.text })
          }
          secureTextEntry={true}
          textContentType="password"
        />

        <Button
          type="clear"
          title="Registrarse"
          titleStyle={styles.btnTextPrincipal}
          loading={isLoading}
          loadingProps={{ color: "#05e680" }}
          onPress={submitData}
        />
      </KeyboardAwareScrollView>
      <TouchableOpacity style={{ marginVertical: 20 }} onPress={changeForm}>
        <Text style={styles.btnText}>¿Ya tienes cuenta? Inicia Sesión</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  btnText: {
    color: "#fff",
    fontSize: 18,
  },
  btnTextPrincipal: {
    color: "#05e680",
    fontSize: 18,
  },
  error: {
    borderColor: "#940C0C",
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
});
