import {
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import Layout from "../../components/layout/Layout";
import Card from "../../components/card/Card";
import { Divider } from "@rneui/themed";
import { useStore } from "../../globalStore/useStore";
import cache from "../../utility/cache";
import { useEffect, useRef, useState } from "react";
import getProducts from "../../hooks/getProducts";
import { useNetInfo } from "@react-native-community/netinfo";
import NetInfo from "@react-native-community/netinfo";
import ModalFilters from "./ModalFilters";

//==================COMPONENT========================
export default function Display(props) {
  const setDarkBg = useStore((state) => state.setDarkBg);
  const setLightBg = useStore((state) => state.setLightBg);
  const setFilteredProds = useStore((state) => state.setFilteredProds);
  const prods = useStore((state) => state.prods);
  const [ir, setIr] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const drawer = useRef(null);

  useEffect(() => {
    async function checkConex() {
      setIr((await NetInfo.fetch()).isInternetReachable);
    }
    checkConex();
    displayFromAS();
  }, []);

  const handleUpdateScreen = () => {
    drawer.current.closeDrawer()
    setLightBg();
  };

  async function storeAS() {
    //Store products gotten from API into AsyncStorage
    drawer.current.closeDrawer()
    await cache.clear();
    const products = await getProducts(1);
    products.map(async (p) => {
      await cache.store(p.id, p);
    });
    console.log("storingEnd");
  }

  async function displayFromAS() {
    console.log("from AS");
    drawer.current.closeDrawer()
    const ppp = await cache.getAll();
    setFilteredProds(ppp);
  }

  async function displayFromApi() {
    console.log("from API");
    drawer.current.closeDrawer()
    //Brings info from Api and displays the cards.
    const prod = await getProducts(1);
    setFilteredProds(prod);
  }

  const handleFCateg =() => {
    drawer.current.closeDrawer()
    setModalVisible(true);
  }

  let filteredProds = useStore((state) => state.filteredProds);

  //------------------Drawer contents----------------------
  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      
      <Text
        style={styles.paragraph}
      >
        Proveedor
      </Text>
      
      <Text style={styles.paragraph}>Disponibilidad</Text>
      
      <Text
      onPress={handleFCateg}
      style={styles.paragraph}>Categoría</Text>
      
      <Text style={styles.paragraph}>Atributos</Text>
      <Text onPress={handleUpdateScreen} style={styles.paragraph}>
        Producto
      </Text>
      <Divider width={30} />
      {ir && (
        <Text onPress={storeAS} style={styles.paragraph}>
          Store to AS
        </Text>
      )}
      <Text onPress={displayFromAS} style={styles.paragraph}>
        Get from AS
      </Text>
      <Text onPress={displayFromApi} style={styles.paragraph}>
        Get from API
      </Text>
      <Divider width={30} />
      <Text onPress={setDarkBg} style={styles.paragraph}>
        Salir
      </Text>
    </View>
  );
  //-------------------RENDER------------------------------
  return (
    <Layout>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={200}
        drawerPosition={"left"}
        renderNavigationView={navigationView}
      >
        {modalVisible &&
        <ModalFilters 
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}        
        />
        }
        {filteredProds && (
          <FlatList
            data={filteredProds}
            renderItem={({ item }) => (
              <Card
                key={item.id}
                id={item.id}
                prodUrl={item.prodUrl}
                nombre={item.nombre}
              />
            )}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.2}
          />
        )}

        {/* scrollview */}
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
