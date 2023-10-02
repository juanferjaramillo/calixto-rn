import {
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
} from "react-native";
import Layout from "../../components/layout/Layout";
import Card from "../../components/card/Card";
import { Divider } from "@rneui/themed";
import { useStore } from "../../globalStore/useStore";
import shtemmaLogo from "../../../assets/sthemma.jpg";
import cache from "../../utility/cache";
import { useEffect, useState } from "react";
import getProducts from "../../hooks/getProducts";
import { useNetInfo } from "@react-native-community/netinfo";

//==================COMPONENT========================
export default function Display() {
  const setDarkBg = useStore((state) => state.setDarkBg);
  const setLightBg = useStore((state) => state.setLightBg);
const netInfo = useNetInfo();
  const [products, setProducts] = useState(null);

  useEffect(()=>{
    netInfo.isInternetReachable &&
    getFromApi(1); //gets from API and stores in AS as productos
    getProdsAS("productos") //gets from AS and stores in local state
  },[])

  const handleUpdateScreen = () => {
    setLightBg();
  };

  async function getFromApi(userId) {
    const prod = await getProducts(userId);
  //  console.log(prod[0]);
  //  setProducts(prod);
  const subProds = prod.slice(0,10)
  // console.log("x", subProds);
   await storeAS(subProds);
  //  await getAS("productos");
 }

 async function storeAS(item) {
  //Store products gotten from API into AsyncStorage
  // console.log("storing", item); //////////////////////////
  await cache.store("productos", item);
  // console.log('storingEnd');
}

  async function getProdsAS(key) {         
    const ppp = await cache.get(key);
    // console.log('ppp', ppp);
    setProducts(ppp);
  };

  // products = useStore((state) => state.prods);
  
  //------------------Drawer contents----------------------
  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text
        // onPress={() => drawer.current.closeDrawer()}
        style={styles.paragraph}
      >
        Proveedor
      </Text>
      <Text style={styles.paragraph}>Disponibilidad</Text>
      <Text style={styles.paragraph}>Categoría</Text>
      <Text style={styles.paragraph}>Atributos</Text>
      <Text onPress={handleUpdateScreen} style={styles.paragraph}>
        Producto
      </Text>
      <Divider width={30} />
      <Text onPress={setDarkBg} style={styles.paragraph}>
        Salir
      </Text>
    </View>
  );

  // console.log('p4',products[0]["id"]);
  //-------------------RENDER------------------------------
  return (
   
   <Layout>
      <DrawerLayoutAndroid
        // ref={drawer}
        drawerWidth={200}
        drawerPosition={"left"}
        renderNavigationView={navigationView}
      >
        <ScrollView width={360} Display={"flex"} alignItems={"center"}>
          {/* <View
          style={{ display:"flex", height: "8%", backgroundColor:"white", marginBottom:10 }}
          >
            <Text
             style={{color:"red", backgroundColor:"yellow" }}
            >Este es un Producto Offline</Text>

            <Image
              source={shtemmaLogo}
              resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
            />
          </View> */}

          <Card
            key={999}
            id={"producto siempre offline"}
            productoNombre={"Este es un Producto Offline"}
          >
            <Image
              source={shtemmaLogo}
              resizeMode="contain"
              style={{ width: "90%", height: "90%" }}
            />
          </Card>

          {products?.map((p) => {
            return (
              <Card
                key={p["id"]}
                id={p["id"]}
                productUrl={p["prodUrl"]}
                productoNombre={p["nombre"]}
              />
            );
          })}
        </ScrollView>
      </DrawerLayoutAndroid>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },
  prodImage: {
    width: 50,
    height: 50,
    // backgroundColor: "pink",
  },
});
