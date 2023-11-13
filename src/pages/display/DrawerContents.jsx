import {
  Text,
  StyleSheet,
  View,
} from "react-native";
import { Divider } from "@rneui/themed";

//===================COMPONENT===============
export default function DrawerContents(props) {

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: 16,
        },
        navigationContainer: {
          backgroundColor: "#ecf0f1",
        },
        paragraph: {
          padding: 16,
          fontSize: 15,
          textAlign: "center",
          borderBottomWidth: 1,
          borderColor: "lightgrey",
          width: "100%",
        },
        botonLike: {
          paddingHorizontal: 16,
          paddingVertical: 4,
          fontSize: 15,
          textAlign: "center",
          borderWidth: 1,
          borderColor: "red",
          borderRadius: 15,
          width: "80%",
        },
        prodImage: {
          width: 50,
          height: 50,
          // backgroundColor: "pink",
        },
      });

  //------------------render-------------
  return (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text onPress={props.handleFProve} style={styles.paragraph}>
        Proveedor
      </Text>

      <Text onPress={props.handleFDisp} style={styles.paragraph}>
        Disponibilidad
      </Text>

      <Text onPress={props.handleFCateg} style={styles.paragraph}>
        Categoría
      </Text>

      <Text style={styles.paragraph}>Atributos</Text>
      <Text style={styles.paragraph}>Canales</Text>
      <Divider width={30} />
      {props.ir && (
        <Text onPress={props.storeAS} style={styles.paragraph}>
          Download Data
        </Text>
      )}
      <Text onPress={props.clearCache} style={styles.paragraph}>
        Clear Cache
      </Text>
      <Divider width={30} />
    </View>
  );
}
