import { View, Text, Image } from "react-native";

//==================COMPONENT====================
export default function CardBack(props) {
  const { ind, handleTouch, existencia, descripcion, prodUrl, icons } = props;

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
      key={ind}
    >
      <View
        style={{
          height: "230px",
          height: 200,
          borderBottomWidth: 2,
          borderColor: "lightgrey",
        }}
      >
        <Text
          style={{
            fontSize: 9,
            textAlign: "justify",
            marginTop: 5,
            paddingHorizontal: 5,
          }}
        >
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
          height: 100,
          marginVertical: 12,
        }}
      />

      <View
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 1,
          width: "60%",
          // borderWidth:1
        }}
      >
        {icons?.map((icon, i) => {
          const iconUrl = icon.iconUrl;
          return (
            <Image
              source={{ uri: iconUrl }}
              resizeMode="contain"
              key={i}
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
