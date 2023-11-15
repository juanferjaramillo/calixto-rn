import { StyleSheet, Text, ScrollView, Pressable } from "react-native";
import cache from "../../utility/cache";
import { useStore } from "../../globalStore/useStore";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from "react";

//==================COMPONENT==================
export default function FilterChannels(props) {
  const setFilteredProds = useStore((state) => state.setFilteredProds);

  const [fBCh, setFBCh] = useState([
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
    let checked = fBCh;
    checked[i] = !checked[i];
    setFBCh(checked);
    console.log(fBCh);
    let chan = [];
    for (let i = 0; i < checked.length; i++) {
      checked[i] && chan.push(i + 1);
    }
    const prd = await cache.getAll("prod");

    const fp = prd.filter((p) => {
      const icId = p.channels.map((i) => i.id);
      return chan.every((s) => icId.includes(s));
    });
    setFilteredProds(fp);
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
          textStyle={{
            textDecorationLine: "none",
          }}
          // disableBuiltInState = {true}
          // isChecked={fBCh[i]}
          onPress={() => handleFilter(i)}
          style={{ paddingVertical: 5 }}
        />
      ))}
    </ScrollView>
  );
}
