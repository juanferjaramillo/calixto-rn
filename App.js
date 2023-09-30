import { StatusBar } from "expo-status-bar";
import Display from "./src/pages/display/Display";
import { useNetInfo } from "@react-native-community/netinfo";
import getProducts from "./src/hooks/getProducts";
import cache from "./src/utility/cache";
import { useEffect, useState } from "react";
import ShowAS from "./src/pages/ShowAS/showAS";
import { Text, View } from "react-native";

//===============COMPONENT==================
export default function App() {
 
  //----------------render--------------------
  return (
    <>
    <Text>.</Text>
    <Text>Welcome</Text>
    <ShowAS />
      {/* <StatusBar hidden={true} /> */}
      {/* <Display />  */}
    </>
  );
}
