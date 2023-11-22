import { View, Text, Image, TextInput } from "react-native";
import { useStore } from "../../globalStore/useStore";
import { useNetInfo } from "@react-native-community/netinfo";
import cache from "../../utility/cache";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

//=======================COMPONENT========================
export default function Layout(props) {
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const color = useStore((state) => state.bg);
  const netInfo = useNetInfo();
  let onlinecolor = "red";
  const setFilteredProds = useStore((state) => state.setFilteredProds);
  netInfo.isInternetReachable ? (onlinecolor = "green") : (onlinecolor = "red");

  const handleSearch = async (txt, e) => {
    // console.log("e",e)
    setSearching(false);
    const prd = await cache.getAll("prod");
    const prd1 = prd.filter((p) =>
      p.nombre.toLowerCase().includes(txt.toLowerCase())
    );
    const prd2 = prd.filter((p) => p.id.toString() === txt);
    setFilteredProds([...prd1, ...prd2]);
    setSearchText("");
  };

  //=======================COMPONENT===========================
  async function displayFromAS() {
    const prods = await cache.getAll("prod");
    // const users = await cache.getAll("user")
    // console.log("layout36",users);
    setFilteredProds(prods);
  }

  //----------------------- render --------------------------
  return (
      <View
        //whole page container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginTop:0,
        }}
      >
        <View
          //App bar (upper container)
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "6%",
            minHeight: 30,
            backgroundColor: "darkorange",
            width: "100%",
          }}
        >
          <View
            //logo
            style={{ width: "20%", backgroundColor: "white" }}
          >
            <Image
              source={{
                uri: "https://res.cloudinary.com/sthemma/calixto/logosProveedores/sfgroup.png",
              }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>

          <Text style={{ color: "white" }}>CALIXTO</Text>
          <View
            //online indicator
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: 15,
              height: 15,
              paddingLeft: 1,
              backgroundColor: onlinecolor,
              borderRadius: 50,
              marginRight: 5,
            }}
          ></View>
        </View>

        <View
          //lower container (drawer + cards)
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          style={{
            width: "100%",
            height: "94%",
            backgroundColor: color,
          }}
        >
          {props.children}
        </View>

        {searching && (
          <View
            //lower search bar
            height="6%"
            width="100%"
            justifyContent="center"
            position="absolute"
            top="88%"
            style={{
              borderWidth: 1,
              borderColor: "lightgrey",
              backgroundColor: "white",
            }}
          >
            <TextInput
              placeholder="Búsqueda"
              onChangeText={(txt) => setSearchText(txt)}
              value={searchText}
              returnKeyType="search"
              onSubmitEditing={(e) => handleSearch(searchText, e)}
              autoFocus={true}
              style={{
                height: 30,
                marginRight: 3,
                // minWidth: 100
              }}
            />
          </View>
        )}

        <View
          //lower menu bar
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "darkorange",
            width: "100%",
            height: "6%",
            minHeight: 30,
            color: "white",
            position: "absolute",
            top: "94%",
          }}
        >
          <Feather
            name="search"
            size={24}
            color="white"
            onPress={() => setSearching(!searching)}
            // onPress={() => handleSearch(searchText)}
          />
          <Text
            onPress={displayFromAS}
            style={{
              color: "white",
              fontSize: 12,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "white",
              padding: 5,
            }}
          >
            TODOS
          </Text>
          <MaterialIcons name="logout" size={24} color="grey" />
        </View>
      </View>

  );
}
