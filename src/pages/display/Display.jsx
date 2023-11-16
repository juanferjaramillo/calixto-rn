import { Image } from "react-native";
import { useStore } from "../../globalStore/useStore";
import cache from "../../utility/cache";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const [provs, setProvs] = useState([]);
  const [options, setOptions] = useState([]);
  const [newData, setNewData] = useState([]);

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

  useEffect(() => {
    setFilteredProds(newData);
  }, [newData]);

  async function storeAS() {
    //Store info from API into AsyncStorage
    drawer.current.closeDrawer();
    setLoading(true);
    //fetch products from API:
    const { prodUser, prove, categ } = await getProducts(usrId);

    //stores prove in cache.
    prove.map(async (p, i) => {
      await cache.storeProv(i, p);
    });

    //stores categ in cache.
    categ.map(async (c, i) => {
      await cache.storeCateg(i, c);
    });

    //stores products in cache:
    prodUser.map(async (p) => {
      await cache.storeProd(p.id, p);
      await Image.prefetch(p.prodUrl);
    });
    // await Image.prefetch(ICONOS)

    setNewData(prodUser);
    console.log("storingEnd");
    setLoading(false);
  }

  async function displayFromAS() {
    console.log("display from AS");
    drawer.current.closeDrawer();
    const prods = await cache.getAll("prod");
    setFilteredProds(prods);
  }

  async function clearCache() {
    drawer.current.closeDrawer();
    await cache.clear();
    console.log("cache cleared");
  }

  async function handleFProve() {
    drawer.current.closeDrawer();
    setOptions(await cache.getAll("prov"));
    setFilter("proveedor");
    setModalVisible(true);
  }

  async function handleFDisp() {
    drawer.current.closeDrawer();
    setFilter("disponibilidad");
    setModalVisible(true);
  }

  async function handleFCateg() {
    drawer.current.closeDrawer();
    setOptions(await cache.getAll("cate"));
    setFilter("categoria");
    setModalVisible(true);
  }

  async function handleFChan() {
    drawer.current.closeDrawer();
    setOptions(await cache.getAll("chan"));
    setFilter("canales");
    setModalVisible(true);  
  }
  
  async function handleFAttrib() {
    drawer.current.closeDrawer();
    // setOptions(await cache.getAll("chan"));
    setFilter("atributos");
    setModalVisible(true);  
  }
  
  let filteredProds = useStore((state) => state.filteredProds);

  //------------------Drawer contents----------------------
  const navigationView = () => (
    <DrawerContents
      handleFProve={handleFProve}
      handleFDisp={handleFDisp}
      handleFCateg={handleFCateg}
      handleFAttrib={handleFAttrib}
      handleFChan={handleFChan}
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
      options={options}
    />
  );
}
