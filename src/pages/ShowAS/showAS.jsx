import { Text, View } from "react-native";
import getProducts from "../../hooks/getProducts";
import cache from "../../utility/cache";
import { useEffect, useState } from "react";

//------------------COMPONENT--------------------
export default function ShowAS() {
  const [p3, setP3] = useState(null);
  const [msg, setMsg] = useState("mensaje inicial");
  // const [online, setOnline] = useState(false);
  // const netInfo = useNetInfo();
  // netInfo.isInternetReachable ? setOnline(true) : setOnline(false);
  // let p3 = null;
  // console.log("online", online); //////////////////////////

  useEffect(() => {
    runit();
  }, []);

  async function runit() {
    // if (online) {
    console.log("online, storing products"); //////////////////////////
    // products = await getP();
    await storeAS({ nombre: "Matias" });
    // }
    //Always gets the products from AsyncStorage
    let p2 = await getAS("producto");
    setP3(p2.nombre);
    console.log("leidoAS:", p3); //////////////////////////
  }

  async function getP() {
    //get products form API and returns them
    let produ = await getProducts(1);
    // produ = produ?.slice(0, 5);
    // console.log("getprod", produ);
    return produ;
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
    // console.log('readingEnd');
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

  return (
    <View>
      <Text>.</Text>
      <Text onPress={handleStore}>StoreInAS</Text>
      <Text>.</Text>
      <Text onPress={handleClearMsg}>ClearMessage</Text>
      <Text>.</Text>
      <Text onPress={handleGet}>GetAS</Text>
      <Text>.</Text>
      <Text>{msg}</Text>
    </View>
  );
}
