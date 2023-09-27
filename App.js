import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Display from "./src/pages/display/Display";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import axios from "axios";
import { PD } from "./assets/prodsData";

//download producto information from backend
async function DownloadProdsData() {
  PD.map(async (p, i) => {
    i = i.toString();
    p = JSON.stringify(p);
    // p=p.toString();
    await AsyncStorage.setItem(i, p);
  });
  //console.log(JSON.parse( await AsyncStorage.getItem("3")));
  //getAllKeys
  //Returns all keys known to your App, for all callers, libraries, etc. Once completed, invokes callback with errors (if any) and array of keys.
  //multiGet
  //Fetches multiple key-value pairs for given array of keys in a batch. Once completed, invokes callback with errors (if any) and results.
}

//===============COMPONENT==================
export default function App() {
  const netInfo = useNetInfo();

  netInfo.isInternetReachable && DownloadProdsData();

  //If online, donwload product information to asyncStorage

  //----------------render--------------------
  return (
    <>
      <StatusBar hidden={true} />
      <Display />
      {/* <Iniciodb /> */}
    </>
  );
}
