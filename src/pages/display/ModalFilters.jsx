import { Modal, StyleSheet, Text, Pressable, View } from "react-native";

//================COMPONENT=====================
const ModalFilters = (props) => {
  let title = "";
  switch (props.filter) {
    case "proveedor":
      title = "FILTRO DE PROVEEDOR";
      break;
    case "disponibilidad":
      title = "FILTRO DE DISPONIBILIDAD";
      break;
    case "categoria":
      title = "FILTRO DE CATEGORÍAS";
      break;
  }

  //-------------------render------------------
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <View style={styles.lowerView}>
        <View style={styles.titleModal}>
          <Text style={styles.modalText}>{title}</Text>
        </View>

        <View style={styles.modalView}>{props.children}</View>

        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => props.setModalVisible(!props.modalVisible)}
        >
          <Text style={styles.textStyle}>Cancelar</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  titleModal: {
    backgroundColor: "darkorange",
    width: "100%",
    minHeight: 60,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
    backgroundColor: "orange",
    zIndex: 5,
  },
  modalView: {
    display: "flex",
    flexDirection: "column",
    height: "50%",
    marginTop: 20,
    backgroundColor: "lightblue",
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
  button: {
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 3,
    backgroundColor: "indigo",
    elevation: 2,
    marginTop: 20,
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
});

export default ModalFilters;
