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
        <Text style={styles.modalText}>{title}</Text>
        <View style={styles.modalView}>{props.children}</View>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => props.setModalVisible(!props.modalVisible)}
        >
          <Text style={styles.textStyle}>Cerrar</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "red",
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

export default ModalFilters;
