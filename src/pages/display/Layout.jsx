import { View, Text, Image } from "react-native";
import { useStore } from "../../globalStore/useStore";
import { useNetInfo } from "@react-native-community/netinfo";
import cache from "../../utility/cache";

//=======================COMPONENT========================
export default function Layout(props) {
  const color = useStore((state) => state.bg);
  const netInfo = useNetInfo();
  let onlinecolor = "red";
  const setFilteredProds = useStore((state) => state.setFilteredProds);
  netInfo.isInternetReachable ? (onlinecolor = "green") : (onlinecolor = "red");

  const handleSearch = async (txt) => {
    console.log(`searching ${txt}`);
    let prd = await cache.getAll();
    prd = prd.filter((p) => p.nombre.toLowerCase().includes(txt));
    setFilteredProds(prd);
  };

  //----------------------- render --------------------------
  return (
    <View
      //page container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        // height: "50%",
      }}
    >
      <View
        //App bar (upper container)
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "6%",
          width: "100vw",
          // backgroundColor: "purple",
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
        <View
          //slogan
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            paddingLeft: 5,
            backgroundColor: "orange",
          }}
        >
          <Text style={{ color: "white", fontSize: 20, height: 40 }}>
            SF Group v0.1.1
          </Text>
          <View
          // search icon
          >
            <Text onPress={() => handleSearch("almendra")}>S</Text>
          </View>
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
              marginRight:5
            }}
          >
          </View>
        </View>
      </View>

      <View
        //lower container (drawer + cards)
        style={{
          width: "100%",
          height: "88%",
          backgroundColor: color,
        }}
      >
        {props.children}
      </View>
      <View
      //lower menu bar
      style={{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        backgroundColor: "darkorange",
        width: "100%",
        height: "6%",
        color:"white"
      }}
      >
        <Text style={{ color: "white", fontSize: 20, }}>1</Text>
        <Text style={{ color: "white", fontSize: 20,  }}>2</Text>
        <Text style={{ color: "white", fontSize: 20,}}>3</Text>
        <Text style={{ color: "white", fontSize: 20,  }}>4</Text>
        <Text style={{ color: "white", fontSize: 20,  }}>5</Text>
      </View>
    </View>
  );
}
