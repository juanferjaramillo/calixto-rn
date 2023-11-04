import { Text, View } from "react-native";
import getProducts from "../../hooks/getProducts";
import cache from "../../utility/cache";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Display from "../display/Display";

//------------------COMPONENT--------------------
export default function ShowAS(props) {
  const [p3, setP3] = useState(null);
  const [msg, setMsg] = useState("mensaje inicial");
  // const [online, setOnline] = useState(false);
  // const netInfo = useNetInfo();
  // netInfo.isInternetReachable ? setOnline(true) : setOnline(false);
  // let p3 = null;
  // console.log("online", online); //////////////////////////

  // const [products, setProducts] = useState(null);

  // useEffect(() => {
  //   console.log("starting showAS");
  //   runit();  //basic part to check AsyncStorage
  //   }, []);


  async function runit() {
    // if (online) {
    // console.log("online, storing products"); //////////////////////////
    // products = await getP();
    await storeAS("MatiasJaramillo" );
    // }
    //Always gets the products from AsyncStorage
    let p2 = await getAS("name");
    setP3(p2.nombre);
    console.log("leidoAS:", p3); //////////////////////////
  }

  async function storeAS(item) {
    //Store products gotten from API into AsyncStorage
    console.log("storing"); //////////////////////////
    await cache.store("name", item);
    // console.log('storingEnd');
  }

  async function getAS(key) {
    //Gets the products stored in AsyncStorage
    console.log("reading"); //////////////////////////
    const ppp = await cache.get(key);
    console.log('readingEnd', ppp);
    return ppp;
  }

  const handleGet = async () => {
    setMsg(await getAS("name"));
  };

  const handleStore = async () => {
    await storeAS("Matis");
  };

  const handleClearMsg = () => {
    setMsg("nada por aqui");
  };

  console.log("IR?", props.ir);

  //------------------render------------------

  return (
    <View>
      {/* <Text>.</Text>
      <Text onPress={handleStore}>StoreInAS</Text>
      <Text>.</Text>
      <Text onPress={handleClearMsg}>ClearMessage</Text>
      <Text>.</Text>
      <Text onPress={handleGet}>GetAS</Text>
      <Text>.</Text>
      <Text>{msg}</Text> */}

      <StatusBar hidden={true} />
     <Display ir={props.ir} />
    </View>
  );
}
