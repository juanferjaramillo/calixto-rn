import { Image, View } from "react-native";
import { useStore } from "../../globalStore/useStore";
import cache from "../../utility/cache";
import { useEffect, useRef, useState } from "react";
import getProducts from "../../hooks/getProducts";
import getUsers from "../../hooks/getUsers";
import NetInfo from "@react-native-community/netinfo";
import { useWindowDimensions } from "react-native";
import DrawerContents from "./DrawerContents";
import DisplayContents from "./DisplayContents";
import { StatusBar } from "expo-status-bar";

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

  const usrId = useStore((state)=>state.userAuth);

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
    //Store info from API in cache
    drawer.current.closeDrawer();
    setLoading(true);
    //fetch products from API:
    const { prodUser, prove, categ } = await getProducts(usrId);

    //stores providers in cache.
    prove.map(async (p, i) => {
      await cache.storeProv(i, p);
    });

    //stores categories in cache.
    categ.map(async (c, i) => {
      await cache.storeCateg(i, c);
    });

    //stores products in cache:
    prodUser.map(async (p) => {
      await cache.storeProd(p.id, p);
      await Image.prefetch(p.prodUrl);
    });

    // await Image.prefetch(ICONOS)

    //stores users in cache (to allow login when offline)
    const allUsers = await getUsers(); 
    allUsers?.map(async (usr, i) => await cache.storeUsers(i, usr));

    setNewData(prodUser);
    console.log("storingEnd");
    setLoading(false);
  }

  async function displayFromAS() {
    // console.log("display from AS");
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

  async function handleFProp() {
    drawer.current.closeDrawer();
    // setOptions(await cache.getAll("chan"));
    setFilter("propiedades");
    setModalVisible(true);
  }

  const navigationView = () => (
    <DrawerContents
      handleFProve={handleFProve}
      handleFAttrib={handleFAttrib}
      handleFChan={handleFChan}
      handleFDisp={handleFDisp}
      handleFCateg={handleFCateg}
      handleFProp={handleFProp}
      storeAS={storeAS}
      clearCache={clearCache}
      ir={ir}
    />
  );

  let filteredProds = useStore((state) => state.filteredProds);

  //-------------------RENDER------------------------------
  return (
    <View style={{ marginTop: 35 }}>
      <StatusBar hidden={false} />
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
    </View>
  );
}
