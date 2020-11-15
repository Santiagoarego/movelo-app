import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Button,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import BotonCircular from "./BotonCircular";

export default function Panico() {
  const [showAlert, setshowAlert] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

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
            showProgress={false}
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
              setshowAlert(false);
            }}
          />
        </>
      ) : (
        <Text>Necesitamos permisos de localización</Text>
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
    backgroundColor: "#fff",
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
