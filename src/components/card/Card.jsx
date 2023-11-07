import { View, Text, Alert, ScrollView, Image } from "react-native";
import { Badge } from "@rneui/themed";
import { useState } from "react";
import shtemmaLogo from "../../../assets/sthemma.jpg";
import CardFront from "./cardFront";

//===============COMPONENT=================

export default function Card(props) {
  const [flipped, setFlipped] = useState(false);

  const handleTouch = async () => {
    setFlipped(!flipped);
    console.log("touched");
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
    <>
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
  />
  {/* <CardBack
    onClick={() => handleClick()}
    ind={props.ind}
    prodUrl={props.prodUrl}
    descripcion={props.descripcion}
    icons={props.icons}
    Barras={props.Barras}
    existencia={props.existencia}
  /> */}
  </>
  );
}
