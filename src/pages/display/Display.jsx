import { Image } from "react-native";
import { useStore } from "../../globalStore/useStore";
import cache from "../../utility/cache";
import { useEffect, useRef, useState } from "react";
import getProducts from "../../hooks/getProducts";
import NetInfo from "@react-native-community/netinfo";
import { useWindowDimensions } from "react-native";
import DrawerContents from "./DrawerContents";
import DisplayContents from "./DisplayContents";

//==================COMPONENT========================
export default function Display(props) {
  const setFilteredProds = useStore((state) => state.setFilteredProds);
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
    //Store info from API into AsyncStorage
    drawer.current.closeDrawer();
    setLoading(true);
    //fetch products from API:
    const { prodUser, prove, categ } = await getProducts(usrId);
    
    // console.log("Display50", categ);
    // console.log("Display51", prove);

    //stores products in AS:
    prodUser.map(async (p) => {
      await cache.storeProd(p.id, p);
      await Image.prefetch(p.prodUrl);
    });
    //stores providers in AS:
    prove.map(async (p, i) => {
      await cache.storeProv(i, p);
    })
    setLoading(false);
    // await Image.prefetch(ICONOS)
    console.log("storingEnd");
  }

  async function displayFromAS() {
    console.log("from AS");
    drawer.current.closeDrawer();
    const prod = await cache.getAll("prod");
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
    <DrawerContents
      handleFProve={handleFProve}
      handleFDisp={handleFDisp}
      handleFCateg={handleFCateg}
      storeAS={storeAS}
      clearCache={clearCache}
      ir={ir}

    />
  );

  //-------------------RENDER------------------------------
  return (
    <DisplayContents
      loading={loading}
      drawer={drawer}
      navigationView={navigationView}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      filter={filter}
      filteredProds={filteredProds}
      columns={columns}
    />
  );
}