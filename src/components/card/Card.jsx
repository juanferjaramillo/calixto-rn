import { View, Text, Alert, ScrollView, Image } from "react-native";
import { Badge } from "@rneui/themed";
import { useState } from "react";
import shtemmaLogo from "../../../assets/sthemma.jpg";
import CardFront from "./cardFront";
import CardBack from "./cardBack";

//===============COMPONENT=================

export default function Card(props) {
  const [flipped, setFlipped] = useState(false);

  const handleTouch = async () => {
    setFlipped(!flipped);
    // if (!flipped) {
    //   const stat = {
    //     location: "unknown",
    //     action: 1,
    //     detail: props.id.toString(),
    //   };
    //   await axios.post("/postStats", stat);
    // }
  };

  //-------------------- render -------------------------
  return (
    <View style={{margin:3}}>
    {!flipped ? 
    <CardFront
    // handleAddToCart={handleAddToCart}
    handleTouch={handleTouch}
    precio_base={props.precio_base}
    iva={props.iva}
    ind={props.ind}
    id={props.id}
    prodUrl={props.prodUrl}
    nombre={props.nombre}
    categoria={props.categoria}
    estado={props.estado}
    barras={props.barras}
    existencia={props.existencia}
  />
  :
  <CardBack
    handleTouch={handleTouch}
    ind={props.ind}
    prodUrl={props.prodUrl}
    descripcion={props.descripcion}
    icons={props.icons}
    barras={props.barras}
    existencia={props.existencia}
  /> 
    }
  </View>
  );
}
