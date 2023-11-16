import { StyleSheet, Text, ScrollView, Pressable } from "react-native";
import cache from "../../utility/cache";
import { useStore } from "../../globalStore/useStore";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from "react";

//==================COMPONENT==================
export default function FilterAttributes(props) {
  const { options } = props;
  const setFilteredProds = useStore((state) => state.setFilteredProds);

  const [fAt, setFAt] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const styles = StyleSheet.create({
    modalOptions: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      textAlign: "left",
    },
  });

  const handleFilter = async (i) => {
    let checked = fAt;
    checked[i] = !checked[i];
    setFAt(checked);
    console.log(fAt);
    let Attr = [];
    for (let i = 0; i < checked.length; i++) {
      checked[i] && Attr.push(i + 1);
    }
    const prd = await cache.getAll("prod");

    const fp = prd.filter((p) => {
      const icId = p.attributres.map((i) => i.id);
      return Attr.every((s) => icId.includes(s));
    });
    setFilteredProds(fp);
  };

  const attributes = [
    "Attr1",
    "Attr2",
    "Attr3",
    "Attr4",
    "Attr5",
    "Attr6",
    "Attr7",
  ];
  //------------------render-------------------
  return (
    <ScrollView style={{ minWidth: "70%" }}>
      {attributes?.map((c, i) => (
        <BouncyCheckbox
          key={i}
          fillColor="black"
          text={c?.trim()}
          textStyle={{
            textDecorationLine: "none",
          }}
          // disableBuiltInState = {true}
          // isChecked={fBCh[i]}
          // onPress={() => handleFilter(i)}
          style={{ paddingVertical: 5 }}
        />
      ))}
    </ScrollView>
  );
}
