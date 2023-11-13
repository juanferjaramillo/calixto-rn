import {
    StyleSheet,
    Text,
    ScrollView,
  } from "react-native";

export default function FilterProve(props) {

    return (
  <ScrollView style={{ minWidth: "70%" }}>
    <Text style={styles.modalOptions}>Prov 1</Text>
    <Text style={styles.modalOptions}>Prov 2</Text>
    <Text style={styles.modalOptions}>Prov 3</Text>
    <Text style={styles.modalOptions}>Prov 4</Text>
    <Text style={styles.modalOptions}>Prov 5</Text>
    <Text style={styles.modalOptions}>Prov 6</Text>
    <Text style={styles.modalOptions}>Prov 7</Text>
    <Text style={styles.modalOptions}>Prov 8</Text>
    <Text style={styles.modalOptions}>Prov 9</Text>
    <Text style={styles.modalOptions}>Prov 10</Text>
  </ScrollView>
  )

}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    lowerView: {
      position: "relative",
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      top: "30%",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      // height:"50%",
      backgroundColor: "darkorange",
      zIndex: 5,
    },
    modalView: {
      display: "flex",
      flexDirection: "column",
      height: "50%",
      marginTop: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      justifyContent: "flex-start",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonView: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    button: {
      borderRadius: 20,
      paddingHorizontal: 25,
      paddingVertical: 3,
      elevation: 2,
      marginTop: 20,
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 10,
      marginTop: 10,
      fontSize: 16,
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
      textDecorationLine: "underline",
    },
    modalOptions: {
      borderBottomWidth: 1,
      marginBottom: 5,
      textAlign: "center",
    },
  });