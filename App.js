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
import { useEffect } from "react";

//console.log(JSON.parse( await AsyncStorage.getItem("3")));
//getAllKeys
//Returns all keys known to your App, for all callers, libraries, etc. Once completed, invokes callback with errors (if any) and array of keys.
//multiGet
//Fetches multiple key-value pairs for given array of keys in a batch. Once completed, invokes callback with errors (if any) and results.

//===============COMPONENT==================
export default function App() {
  const netInfo = useNetInfo();
  const online = netInfo.isInternetReachable;
  console.log("online", online);
  let products = null;

  async function getP() {
    //get products form API and retruns them
    let produ = await getProducts(1);
    // produ = produ?.slice(0, 5);
    // console.log("getprod", produ);
    return produ;
  }

  async function storeAS() {
    //Store products gotten from API into AsyncStorage
    console.log('storing');
    await cache.store("producto", products);
    // console.log('storingEnd');
  }

  async function getAS() {
    //Gets the products stored in AsyncStorage
    console.log('reading');
    let ppp = await cache.get("producto");
    // console.log('readingEnd');
    // console.log("reading", ppp);
  }

  async function runit() {
      if (online) {
      console.log("online, storing products");
      products = await getP();
      await storeAS();
      }
    //Always gets the products from AsyncStorage
    await getAS();
  }

  useEffect(()=>{
    runit();
  },[])
  
  //----------------render--------------------
  return (
    <>
      <StatusBar hidden={true} />
      <Display /> 
    </>
  );
}
