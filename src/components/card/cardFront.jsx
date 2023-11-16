import { View, Text, Image } from "react-native";
import { Divider } from "@rneui/themed";

import { Badge } from "@rneui/themed";
import { useState } from "react";
import shtemmaLogo from "../../../assets/sthemma.jpg";

//===============COMPONENT=================

export default function CardFront(props) {
  const {
    ind,
    handleTouch,
    prodUrl,
    id,
    nombre,
    barras,
    existencia,
    precio_base,
    iva,
    categoria,
  } = props;

  let PB = Number(precio_base).toFixed();
  let PT = ((1 + Number(iva) / 100) * Number(PB)).toFixed();
  PB = PB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  PT = PT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleCardTouchEnd = () => {
    handleTouch();
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
      onTouchEnd={handleCardTouchEnd}
      key={ind}
    >
      <View style={{ width: 250 }}>
        <Text style={{ textAlign: "center" }}>{id}</Text>
        <Divider style={{ marginTop: 10 }} />
        </View>
      <View
            //online indicator
            style={{
              position:"absolute",
              top:10,
              right:10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: 10,
              height: 10,
              paddingLeft: 1,
              backgroundColor: "green",
              borderRadius: 50,
              marginRight: 5,
            }}
            />
    


      {/* <Badge
          status="success" //success, error, primary, warning
          // style={{backgroundColor: "#ff0000"}}
          containerStyle={{ position: "absolute", top: 0, left: 200 }}
        /> */}

      <Image
        source={{ uri: prodUrl }}
        resizeMode="contain"
        style={{
          width: "80%",
          height: "40%",
          marginBottom: 10,
          marginTop: 5,
        }}
      />

      <View style={{ width: "90%", minHeight: 70 }}>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          {nombre?.trim()}
        </Text>
        <Divider style={{ marginVertical: 10 }} />
      </View>

      <View>
        <Text
          style={{ fontSize: 13, marginBottom: 5 }}
        >{`Precio sin IVA: $ ${PB}`}</Text>
        <Text
          style={{ fontSize: 13, marginBottom: 10 }}
        >{`Precio con IVA: $ ${PT}`}</Text>
        <Text
          style={{ fontSize: 13, textAlign: "center" }}
        >{`${categoria?.trim()}`}</Text>

        {/* <Divider /> */}
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          marginTop: 10,
        }}
      >
        <Text style={{ textAlign: "left", fontSize: 11 }}>{barras}</Text>
        <Text style={{ textAlign: "right", fontSize: 11 }}>{existencia}</Text>
      </View>
    </View>
  );
}
