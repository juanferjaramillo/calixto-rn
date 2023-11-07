import { View, Text, Image, Divider } from "react-native";

export default function CardBack(props) {
  const { ind, handleTouch, barras, existencia, descripcion, prodUrl, icons } =
    props;

  return (
    <View
      style={{
        margin: 1,
        width: "320px",
        height: "530px",
        boxShadow: 8,
        borderRadius: 2,
        onPress: { handleTouch },
      }}
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
        <View
          style={{ height: "230px" }}
          //   boxShadow={4}
        >
          <Text style={{ fontSize: 13, textAlign: "justify" }}>
            {descripcion}
          </Text>
        </View>

        <Image
          source={{ uri: props.prodUrl }}
          resizeMode="contain"
          style={{
            // objectFit: "contain"
            height: "150vh",
            width: "240vh",
            // alt:"producto"
            // border="1"
          }}
        />

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 1,
          }}
        >
          {icons?.map((icon, i) => {
            const iconUrl = icon.iconUrl;
            return (
              <Image
              source={{ uri: iconUrl }}
                style={{
                  key: { i },
                //   alt: "icon",
                  width: 40,
                  height: 40,
                  marginRight: 0.5,
                  marginLeft: 0.5,
                }}
              />
            );
          })}
        </View>
      </View>
    </View>

  );
}
