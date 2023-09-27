import { View, Alert, ScrollView } from "react-native";
import { Badge, Image, Text } from "@rneui/themed";
import { useState } from "react";

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
    console.log("retouched", front);
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
        // shadowOffset:10,
        // shadowOpacity:50,
        // shadowColor:"#ffffff"
      }}
      // onTouchEnd={handleCardTouchEnd}
    >
      <View
        //codigo
        style={{ width: 200 }}
      >
        <Text style={{ textAlign: "center",  }}>{props.id}</Text>
      </View>

      {props.children}
      
      <View
        //imagen
        style={{
          width: 250,
          height: 220,
          marginTop: 1,
          marginBottom: 2,
        }}
      >
        {/* <Badge
          status="success" //success, error, primary, warning
          // style={{backgroundColor: "#ff0000"}}
          containerStyle={{ position: "absolute", top: 0, left: 200 }}
        /> */}
        <Image
          source={{
            uri: props.productUrl,
            // uri: "https://res.cloudinary.com/sthemma/samples/0900001.jpg",
            // uri: "https://res.cloudinary.com/sthemma/calixto/imgProductos/sthemma.jpg",
          }}
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
          alt="Producto"
        />
      </View>

      <View
        //nombre
        style={{
          width: 250,
          }}
      >
          <Text style={{ textAlign: "center" }}>{props.productoNombre.trim()}</Text>
      </View>
      
    </View>
  );
}
