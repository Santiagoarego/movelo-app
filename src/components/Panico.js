import React from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity, Button} from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';
import BotonCircular from "./BotonCircular";

export default class Panico extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showAlert: false };
  };
 
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };
 
  render() {
    const {showAlert} = this.state;
 
    return (
      <View style={styles.view}>
        <BotonCircular onPress={() => {
          this.showAlert();
        }}circleDiameter={300}>
        </BotonCircular>
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
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  };
};
 
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
    color: '#fff',
    fontSize: 15
  }
});
