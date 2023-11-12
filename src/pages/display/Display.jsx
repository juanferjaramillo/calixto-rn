import {
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
} from "react-native";
import Layout from "./Layout";
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

  async function storeAS() {
    //Store products gotten from API into AsyncStorage
    drawer.current.closeDrawer();
    // await cache.clear();
    const products = await getProducts(1);
    products.map(async (p) => {
      await cache.store(p.id, p);
      await Image.prefetch(p.prodUrl);
    });
    console.log("storingEnd");
  }

  async function displayFromAS() {
    console.log("from AS");
    drawer.current.closeDrawer();
    const prod = await cache.getAll();
    setFilteredProds(prod);
  }

  async function clearCache() {
    drawer.current.closeDrawer();
    await cache.clear();
    console.log("cache cleared");
  }

  const handleFCateg = () => {
    drawer.current.closeDrawer();
    setModalVisible(true);
  };

  let filteredProds = useStore((state) => state.filteredProds);

  //------------------Drawer contents----------------------
  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
     
        {/* <Text onPress={displayFromAS} style={styles.botonLike}>
          Todos
        </Text> */}
  
      <Text style={styles.paragraph}>Proveedor</Text>

      <Text style={styles.paragraph}>Disponibilidad</Text>

      <Text onPress={handleFCateg} style={styles.paragraph}>
        Categoría
      </Text>

      <Text style={styles.paragraph}>Atributos</Text>
      <Text style={styles.paragraph}>Canales</Text>
      <Divider width={30} />
      {ir && (
        <Text onPress={storeAS} style={styles.paragraph}>
          Download Data
        </Text>
      )}
      <Text onPress={clearCache} style={styles.paragraph}>
        Clear Cache
      </Text>
      <Divider width={30} />
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
        {modalVisible && (
          <ModalFilters
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        )}
        <View
        //card container
          style={{
            alignItems: "center",
            width: "100%",
          }}
        >
          {filteredProds && (
            <FlatList
            alignItems="center"
            // numColumns={2}
            style={{width:"100%",}}
              data={filteredProds}
              renderItem={({ item }) => (
                <Card
                  key={item.id}
                  id={item.id}
                  prodUrl={item.prodUrl}
                  nombre={item.nombre}
                  barras={item.codigoBarras}
                  descripcion={item.descripcion}
                  existencia={item.existencia}
                  icons={item.icons}
                  precio_base={item.precioBase}
                  iva={item.tax?.tax}
                  categoria={item.category?.name}
                />
              )}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={0.2}
            />
          )}
        </View>
      </DrawerLayoutAndroid>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
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
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    width: "100%",
  },
  botonLike: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    fontSize: 15,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 15,
    width: "80%",
  },
  prodImage: {
    width: 50,
    height: 50,
    // backgroundColor: "pink",
  },
});
