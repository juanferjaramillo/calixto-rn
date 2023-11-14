import { StyleSheet, Text, ScrollView, Pressable } from "react-native";

export default function FilterProve(props) {
  const { proveedores } = props;
  // console.log("prov1",proveedores);

  const handleFilter = (p) => {
    console.log(p);
    props.setModalVisible(false);

  }

  //---------------------render--------------------
  return (
    <ScrollView style={{ minWidth: "70%" }}>
      {proveedores.map((p, i) => (
        <Pressable 
        key={i}
        onPress={()=>handleFilter(p)}>
        <Text key={i} style={styles.modalOptions}>
          {p}
        </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalOptions: {
    // backgroundColor:"orange",
    paddingVertical:10,
    borderBottomWidth: 1,
    textAlign: "center",
  },
});
