import { View, Text, Image, Divider } from "react-native";
import { Badge } from "@rneui/themed";
import { useState } from "react";
import shtemmaLogo from "../../../assets/sthemma.jpg";

//===============COMPONENT=================

export default function CardFront(props) {

    const handleCardTouchEnd = () => {
        props.handleTouch();
    }

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
      onTouchEnd={handleCardTouchEnd}
    >
      <View style={{ width: 250,  }}>
        <Text style={{ textAlign: "center",  }}>{props.id}</Text>
      </View>

 {/* <Badge
          status="success" //success, error, primary, warning
          // style={{backgroundColor: "#ff0000"}}
          containerStyle={{ position: "absolute", top: 0, left: 200 }}
        /> */}

      <Image
        source={{ uri: props.prodUrl }}
        resizeMode="contain"
        style={{ 
          width: "90%",
          height: "45%",
          marginBottom:25,
          marginTop: 25,
        }}
      />

      <View style={{ width: "90%", }}>
        <Text style={{ textAlign:"center", fontWeight:"bold" }}>{props.nombre.trim()}</Text>
      </View>
      <Text style={{fontWeight:"100"}}>___________________________</Text>

      <Text style={{fontSize:13, marginBottom:5}}>{`Precio sin IVA: $ 2000`}</Text>
        <Text style={{fontSize:13, marginBottom:10}}>{`Precio con IVA: $ 2200`}</Text>
        <Text style={{fontSize:13}}>{`SNACKS`}</Text>

    </View>
  );
}
