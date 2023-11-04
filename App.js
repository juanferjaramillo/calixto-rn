import { StatusBar } from "expo-status-bar";
import Display from "./src/pages/display/Display";
// import { useNetInfo } from "@react-native-community/netinfo";
import NetInfo from "@react-native-community/netinfo";
import getProducts from "./src/hooks/getProducts";
import cache from "./src/utility/cache";
import { useEffect, useState } from "react";
import ShowAS from "./src/pages/ShowAS/showAS";
import { Text, View } from "react-native";

//===============COMPONENT==================
export default function App() {
  const [ir, setIr] = useState(false);

  useEffect(()=>{
    async function checkConex() {
      // const isInternetReachable = (await NetInfo.fetch()).isInternetReachable
      setIr((await NetInfo.fetch()).isInternetReachable)
    }
    checkConex();
  }
  ,[])
  
  console.log("ir1", ir);
  //----------------render--------------------
  return (
    <View style={{marginTop:25}}>
      {/* <Text>.</Text>
      <Text>Welcome</Text> */}
      {/* <ShowAS ir={ir} /> */}
      <StatusBar hidden={false} />
      <Display /> 
    </View>
  );
}

//revisar isInternetReachable y si es false esperar 200 ms y 
//hacer un estado local que espere 200 ms y luego revise si isInternetReachable