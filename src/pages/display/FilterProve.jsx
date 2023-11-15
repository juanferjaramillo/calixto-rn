import { StyleSheet, Text, ScrollView, Pressable } from "react-native";
import cache from '../../utility/cache'
import { useStore } from "../../globalStore/useStore";

//=================COMPONENT==================
export default function FilterProve(props) {
  const { proveedores } = props;
  const setFilteredProds = useStore((state) => state.setFilteredProds);

  const handleFilter = async (prv) => {
    const prd = await cache.getAll("prod");
    const prd1 = prd.filter((p) =>
      p.provider.name.toLowerCase().includes(prv.toLowerCase())
    );
    setFilteredProds(prd1)
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
          {p?.trim()}
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
    textAlign: "left",
  },
});
