import { View, Text, Image } from "react-native";

//==================COMPONENT====================
export default function CardBack(props) {
  const { ind, handleTouch, barras, existencia, descripcion, prodUrl, icons } =
    props;

    // console.log("icons", icons);
  //--------------------render-----------------------

  return (
    <View
      //card container
      style={{
        alignItems: "center",
        width: 300,
        height: 400,
        backgroundColor: "white",
        marginTop: 5,
        borderRadius: 10,
        shadowOffset: 10,
        shadowOpacity: 50,
        shadowColor: "#ffffff",
      }}
      onTouchEnd={handleTouch}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          height: "500px",
          //    cursor: "pointer",
        }}
      >
        <Text>{`Codigo: ${barras}`}</Text>
        <Text>{existencia}</Text>
      </View>

      {/* <Badge
          status="success" //success, error, primary, warning
          // style={{backgroundColor: "#ff0000"}}
          containerStyle={{ position: "absolute", top: 0, left: 200 }}
        /> */}

      <View
        style={{ height: "230px",
      height:170
      }}
        //   boxShadow={4}
      >
        <Text style={{ fontSize: 9, textAlign: "justify", marginTop: 10 }}>
          {descripcion}
        </Text>
      </View>

      <Image
        source={{
          uri: prodUrl,
        }}
        // source={{ uri: prodUrl }}
        resizeMode="contain"
        style={{
          width: "90%",
          height: "35%",
          // marginBottom:25,
          // marginTop: 25,
        }}
      />

      {/* <View style={{ width: "90%", }}>
        <Text style={{ textAlign:"center", fontWeight:"bold" }}>{props.nombre.trim()}</Text>
      </View> */}
      <View
          style={{
            display: "flex",
            flexDirection:"row",
            justifyContent: "center",
            marginTop: 1,
          }}
        >
     {icons?.map((icon, i) => {
            const iconUrl = icon.iconUrl;
            return (
              <Image
                source={{ uri: iconUrl }}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 30,
                  marginRight: 0.5,
                  marginLeft: 0.5,
                }}
              />
            );
          })}

     </View>
     
     </View>
  );
}
