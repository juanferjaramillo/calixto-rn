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
import NetInfo from "@react-native-community/netinfo";
import ModalFilters from "./ModalFilters";
import { useWindowDimensions } from "react-native";
import FilterCateg from "./FilterCateg";
import FilterProve from "./FilterProve";
import FilterDispon from "./FilterDispon";
import { DialogLoading } from "@rneui/base/dist/Dialog/Dialog.Loading";

//==================COMPONENT========================
export default function Display(props) {
  const setDarkBg = useStore((state) => state.setDarkBg);
  const setLightBg = useStore((state) => state.setLightBg);
  const setFilteredProds = useStore((state) => state.setFilteredProds);
  const prods = useStore((state) => state.prods);
  const [ir, setIr] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const drawer = useRef(null);
  let columns = 1;
  const usrId = 1;

  const cellphone = 480; //max value
  const tablet = 830; //max value

  const { height, width } = useWindowDimensions();

  if (width < cellphone) {
    columns = 1;
  } else if (width < tablet) {
    columns = 2;
  } else {
    columns = 4;
  }

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
    setLoading(true);
    //fetch products from API:
    // const products = await getProducts(usrId);
    const {prodUser, prove, categ } = await getProducts(usrId);
    console.log("Display67",categ);
    
    //stores products in AS:
    // products.map(async (p) => {
      prodUser.map(async (p) => {
      await cache.storeProd(p.id, p);
      await Image.prefetch(p.prodUrl);
    });
    setLoading(false);
    // await Image.prefetch(ICONOS)
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

  const handleFProve = () => {
    drawer.current.closeDrawer();
    setFilter("proveedor");
    setModalVisible(true);
  };
  const handleFDisp = () => {
    drawer.current.closeDrawer();
    setFilter("disponibilidad");
    setModalVisible(true);
  };
  const handleFCateg = () => {
    drawer.current.closeDrawer();
    setFilter("categoria");
    setModalVisible(true);
  };

  let filteredProds = useStore((state) => state.filteredProds);

  //------------------Drawer contents----------------------
  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      {/* <Text onPress={displayFromAS} style={styles.botonLike}>
          Todos
        </Text> */}

      <Text onPress={handleFProve} style={styles.paragraph}>
        Proveedor
      </Text>

      <Text onPress={handleFDisp} style={styles.paragraph}>
        Disponibilidad
      </Text>

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
      {loading &&  <DialogLoading />}
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
            filter={filter}
          >
            {filter === "proveedor" && <FilterProve />}
            {filter === "disponibilidad" && <FilterDispon />}
            {filter === "categoria" && <FilterCateg />}
          </ModalFilters>
        )}
        <View
          //card container
          style={{
            alignItems: "center",
            width: "100%",
            height: "94%",
          }}
        >
          {filteredProds && (
            <FlatList
              alignItems="center"
              numColumns={columns}
              style={{ width: "100%" }}
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
              key={columns}
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
