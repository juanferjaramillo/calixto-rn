import {
  Button,
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
import getProducts from "../../hooks/getProducts"
import shtemmaLogo from "../../../assets/sthemma.jpg";
import cacheProducts from "../../hooks/cacheProducts"

//==================COMPONENT========================
export default  function Display() {
  const setDarkBg = useStore((state) => state.setDarkBg);

  //  cacheProducts(1);
  let products = getProducts(1);
// products = useStore((state) => state.prods);
  const subProducts = products?.slice(0, 10); //Temporary to show only 10 prods in the app

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
      <Text style={styles.paragraph}>Producto</Text>
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

          {subProducts?.map((p) => {
            return (
              <Card
                key={p.id}
                id={p.id}
                productUrl={p.prodUrl}
                productoNombre={p.nombre}
              />
            );
          })}
          {/* {products?.map((p) => {
            return <Card key={p.id} id={p.id} productUrl={p.prodUrl} productoNombre={p.nombre} />;
          })} */}
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
