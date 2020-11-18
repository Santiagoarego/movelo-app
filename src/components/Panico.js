import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import BotonCircular from "./BotonCircular";
import axios from "axios";
import * as permisos from "expo-permissions";
import * as Location from "expo-location";

import { AuthContext } from "./context";
export default function Panico() {
  const [showAlert, setshowAlert] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setloading] = useState(false);
  const { getUser } = React.useContext(AuthContext);
  useEffect(() => {
    (async () => {
      const resultPermissions = await permisos.askAsync(permisos.LOCATION);
      const statusPermisions = resultPermissions.permissions.location.status;
      if (statusPermisions !== "granted") {
      } else {
        try {
          const currentLocation = await Location.getCurrentPositionAsync({});
          setUserLocation({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          });
        } catch (e) {
          Alert.alert("Ubicacion", "Activa los servicios de ubicacion");
        }
      }
    })();
  }, []);
  const apiReportarEmergencia = () => {
    console.log(userLocation);
    let fecha = new Date();
    let emergencia = {
      id: "1",
      idAcompanamiento: "",
      idAsignado: "",
      lugar: "",
      fecha:
        fecha.getDay() +
        "/" +
        (fecha.getMonth() + 1) +
        "/" +
        fecha.getFullYear(),
      hora:
        fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds(),
      latitud: userLocation.latitude,
      longitud: userLocation.longitude,
      rutas: [],
    };
    axios({
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        correo: getUser().correo,
        password: getUser().password,
      },
      params: { id: getUser().id },
      url:
        "https://proyecto-arquitectura.herokuapp.com/proxy/reportaEmergencia",
      data: emergencia,
    })
      .then((res) => {
        console.log("SUCCESS AXIOS");
        console.log(res.data);
        setloading(false);

        Alert.alert(
          "Alerta envíada",
          "La alerta ha sido envíada con éxito, pronto recibirá ayuda"
        );
        setshowAlert(false);
      })
      .catch((err) => {
        console.log("failed axios");

        Alert.alert("error", err.response.data.mensaje);
        setloading(false);
        setshowAlert(false);
      });
  };
  return (
    <View style={styles.view}>
      {userLocation ? (
        <>
          <BotonCircular
            onPress={() => {
              setshowAlert(true);
            }}
            circleDiameter={300}
          ></BotonCircular>
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

          <AwesomeAlert
            show={showAlert}
            showProgress={loading}
            title="Alerta!"
            message="¡Cuidado! Por favor, ten en cuenta que debes usar esta función de manera
          honesta y seria."
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="Cancelar"
            confirmText="Confirmar"
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
              setshowAlert(false);
            }}
            onConfirmPressed={() => {
              setloading(true);
              apiReportarEmergencia();
            }}
          />
        </>
      ) : (
        <View styles={styles.container}>
          <ActivityIndicator size="large" color="#05e680" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
    color: "#fff",
    fontSize: 15,
  },
});
