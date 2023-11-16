import { StyleSheet, Text, ScrollView, Pressable } from "react-native";
import cache from "../../utility/cache";
import { useStore } from "../../globalStore/useStore";

//==================COMPONENT==================
export default function FilterCateg(props) {
  const { options } = props;
  const setFilteredProds = useStore((state) => state.setFilteredProds);
  const filteredProds = useStore((state)=>state.filteredProds);

  const handleFilter = async (cat) => {
    // const prd = await cache.getAll("prod");
    const prd1 = filteredProds.filter((p) =>
      p.category?.name.toLowerCase().includes(cat.toLowerCase())
    );
    setFilteredProds(prd1);
    props.setModalVisible(false);
  };

  //------------------render-------------------
  return (
    <ScrollView style={{ minWidth: "70%" }}>
      {options?.map((c, i) => (
        <Pressable 
        key={i} 
        onPress={() => handleFilter(c)}>
          <Text key={i} style={styles.modalOptions}>
            {c?.trim()}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalOptions: {
    // backgroundColor:"orange",
    paddingVertical: 10,
    borderBottomWidth: 1,
    textAlign: "left",
  },
});
