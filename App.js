import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Display from "./src/pages/display/Display";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import axios from "axios";
import { PD } from "./assets/prodsData";
import { useStore } from "./src/globalStore/useStore";
import ProdsLoader from "./src/components/ProdsLoder";
import getProducts from "./src/hooks/getProducts";
import cache from "./src/utility/cache";
  
  //console.log(JSON.parse( await AsyncStorage.getItem("3")));
  //getAllKeys
  //Returns all keys known to your App, for all callers, libraries, etc. Once completed, invokes callback with errors (if any) and array of keys.
  //multiGet
  //Fetches multiple key-value pairs for given array of keys in a batch. Once completed, invokes callback with errors (if any) and results.

//===============COMPONENT==================
export default function App() {
  // const netInfo = useNetInfo();

  // netInfo.isInternetReachable && DownloadProdsData();

  //If online, donwload product information to asyncStorage

  async function gp () {
    let produ = await getProducts(1);
    produ = produ?.slice(0, 1);
    console.log("prdd", produ[0]);
    return produ[0];
  }

  async function storeAS() {
    await cache.store("producto","almendra");
  }

async function getAS() {
 let ppp = await cache.get("producto");
 console.log("reading",ppp);
}

let products = gp();
storeAS();
getAS();


  //----------------render--------------------
  return (
    <>
      {/* <StatusBar hidden={true} />
      <Display />  */}
    </>
  );
}