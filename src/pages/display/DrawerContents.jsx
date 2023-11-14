import { Text, StyleSheet, View } from "react-native";
import { Divider } from "@rneui/themed";

//===================COMPONENT===============
export default function DrawerContents(props) {
  const styles = StyleSheet.create({
    containerTop: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      padding: 20,
      // backgroundColor: "#ecf0f1",
      backgroundColor: "lightblue",
    },
    containerBottom: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      padding: 20,
      backgroundColor: "#ecf0f1",
      // backgroundColor:"lightblue"
    },
    paragraph: {
      padding: 10,
      fontSize: 15,
      textAlign: "center",
      borderBottomWidth: 1,
      borderColor: "grey",
      width: "100%",
    },
    paragraphDisabled: {
      padding: 10,
      fontSize: 15,
      color: "grey",
      textAlign: "center",
      borderBottomWidth: 1,
      borderColor: "grey",
      width: "100%",
    },
    subTitle: {
      fontSize: 11,
      width: "100%",
      color: "darkblue",
      textAlign: "left",
      fontWeight: "bold",
      borderBottomWidth: 1,
      borderColor: "grey",
    },
  });

  //------------------render-------------
  return (
    <>
      <View style={styles.containerTop}>
        <Text style={styles.subTitle}>FILTROS</Text>

        <Text onPress={props.handleFProve} style={styles.paragraph}>
          Proveedor
        </Text>

        <Text 
        // onPress={props.handleFDisp} 
        style={styles.paragraphDisabled}>
          Disponibilidad
        </Text>

        <Text onPress={props.handleFCateg} style={styles.paragraph}>
          Categoría
        </Text>

        <Text style={styles.paragraphDisabled}>Atributos</Text>
        <Text style={styles.paragraphDisabled}>Canales</Text>
      </View>

      <View style={styles.containerBottom}>
        <Text style={styles.subTitle}>CACHE</Text>

        {props.ir && (
          <Text onPress={props.storeAS} style={styles.paragraph}>
            Download Data
          </Text>
        )}
        <Text onPress={props.clearCache} style={styles.paragraph}>
          Clear Cache
        </Text>
        {/* <Divider width={30} /> */}
      </View>
    </>
  );
}
