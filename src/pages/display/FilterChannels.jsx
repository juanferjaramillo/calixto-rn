import { StyleSheet, Text, ScrollView, Pressable } from "react-native";
import cache from "../../utility/cache";
import { useStore } from "../../globalStore/useStore";
import BouncyCheckbox from "react-native-bouncy-checkbox";

//==================COMPONENT==================
export default function FilterChannels(props) {
  const { categorias } = props;
  const setFilteredProds = useStore((state) => state.setFilteredProds);

  const handleFilter = async (cat) => {
    const prd = await cache.getAll("prod");
    const prd1 = prd.filter((p) =>
      p.category?.name.toLowerCase().includes(cat.toLowerCase())
    );
    setFilteredProds(prd1);
    props.setModalVisible(false);
  };

  const canales = [
    "Saludable",
    "Autoservicio",
    "Gym",
    "CafesCow",
    "Horeca",
    "LicoStores",
    "Educación",
  ];
  //------------------render-------------------
  return (
    <ScrollView style={{ minWidth: "70%" }}>
      {canales?.map((c, i) => (
        <BouncyCheckbox 
        key={i}
        fillColor="black" 
        text={c?.trim()}
        // onPress={() => handleFilter(c)}
        style={{paddingVertical:5}}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalOptions: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    textAlign: "left",
  },
});
