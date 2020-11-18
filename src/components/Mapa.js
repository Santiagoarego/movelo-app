import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import * as permisos from "expo-permissions";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import getDirections from "react-native-google-maps-directions";
import axios from "axios";

import { AuthContext } from "./context";
const GOOGLE_MAPS_APIKEY = "AIzaSyASzOJyhQutnqZdBlAE8BB0UU9Atw5hu0A";

export default function Mapa({ route, navigation }) {
  const [userLocation, setUserLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [ruta, setRuta] = useState({});

  const { getUser } = React.useContext(AuthContext);

  const apiGuardarRuta = () => {
    console.log(userLocation);
    axios({
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        correo: getUser().correo,
        password: getUser().password,
      },
      params: { id: getUser().id },
      url: "https://proyecto-arquitectura.herokuapp.com/proxy/agregaRuta",
      data: ruta,
    })
      .then((res) => {
        dataDirections();
        console.log(res.data);
      })
      .catch((err) => {
        Alert.alert("error", err.response.data.mensaje);
      });
  };

  const dataDirections = () => {
    const data = {
      source: userLocation,
      destination: destinationLocation,
      params: [
        {
          key: "travelmode",
          value: "driving", // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate", // this instantly initializes navigation using the given travel mode
        },
      ],
    };

    getDirections(data);
  };

  const [crear, setCrear] = useState(false);
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
          setDestinationLocation(userLocation);
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
          <MapView
            initialRegion={userLocation}
            style={styles.mapStyle}
            showsUserLocation
            showsMyLocationButton
            onRegionChange={(region) => {
              if (!crear) setDestinationLocation(region);
            }}
          >
            <Marker
              coordinate={
                destinationLocation
                  ? {
                      latitude: destinationLocation.latitude,
                      longitude: destinationLocation.longitude,
                    }
                  : {
                      latitude: 0,
                      longitude: 0,
                    }
              }
            />
            {crear && (
              <MapViewDirections
                origin={userLocation}
                destination={destinationLocation}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="#05e680"
                onReady={(obj) => {
                  setRuta({
                    id: "",
                    fechaInicio: new Date(),
                    fechaFinal: new Date(),
                    kmRecorridos: obj.distance,
                    puntos: obj.coordinates,
                  });
                  console.log(ruta);
                }}
              />
            )}
          </MapView>
          <View style={styles.viewMapBtn}>
            <Button
              title={crear ? "Ir " : "Calcular ruta"}
              onPress={() => {
                if (!crear) {
                  setCrear(true);
                } else {
                  apiGuardarRuta();
                }
              }}
              containerStyle={styles.btn}
              buttonStyle={{ backgroundColor: crear ? "#05e680" : "#4285F4" }}
            />
            <Button
              title={"Cancelar"}
              onPress={() => {
                setCrear(false);
              }}
              containerStyle={styles.btn}
              buttonStyle={{ backgroundColor: "#fd2f2f" }}
              disabled={!crear}
            />
          </View>
        </>
      ) : (
        <View style={styles.container}>
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
    flexDirection: "column",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  mapStyle: {
    width: "100%",
    height: "100%",
    margin: 1,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    position: "absolute",
    alignSelf: "center",
  },
  btn: {
    width: "40%",
    margin: 5,
  },
});
