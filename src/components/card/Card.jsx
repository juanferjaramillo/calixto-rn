import { View, Text, Alert, ScrollView, Image } from "react-native";
import { Badge } from "@rneui/themed";
import { useState } from "react";
import shtemmaLogo from "../../../assets/sthemma.jpg";

//===============COMPONENT=================

export default function Card(props) {
  const [front, setFront] = useState(true);

  const _storeData = async () => {
    try {
      setFront((f) => !f);
    } catch (error) {
      console.log("error saving data", error);
    }
  };

  const handleCardTouchEnd = () => {
    setFront((f) => !f);
    // _storeData();
    // AsyncStorage.setItem("key1","value1");
    //console.log("retouched", front);
    // Alert.alert("accion!", "toque detectado");
  };

  //-------------------- render -------------------------
  return (
    <View
      //card container
      style={{
        alignItems: "center",
        width: 300,
        height: 400,
        backgroundColor: "white",
        marginTop: 5,
        borderRadius: 10,
        shadowOffset: 10,
        shadowOpacity: 50,
        shadowColor: "#ffffff",
      }}
      // onTouchEnd={handleCardTouchEnd}
    >
      <View style={{ width: 200 }}>
        <Text style={{ textAlign: "center" }}>{props.id}</Text>
        <Text style={{ textAlign: "center" }}>{props.nombre}</Text>
      </View>

      <Image
        source={{ uri: props.prodUrl }}
        resizeMode="contain"
        style={{ 
          width: "90%",
          height: "50%",
          marginBottom:25,
          marginTop: 25,
        }}
      />

      {/* <Badge
          status="success" //success, error, primary, warning
          // style={{backgroundColor: "#ff0000"}}
          containerStyle={{ position: "absolute", top: 0, left: 200 }}
        /> */}

      <View style={{ width: 210 }}>
        <Text style={{ textAlign: "center" }}>{props.nombre}</Text>
      </View>
    </View>
  );
}
