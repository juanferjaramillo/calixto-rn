import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView } from "react-native";

const ModalFilters = (props) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(!props.modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>FILTRO DE PRODUCTOS</Text>
           
            <ScrollView style={{minWidth: "70%", marginBottom:15}}>
                <Text style={styles.modalOptions}>Cat 1</Text>
                <Text style={styles.modalOptions}>Cat 2</Text>
                <Text style={styles.modalOptions}>Cat 3</Text>
                <Text style={styles.modalOptions}>Cat 4</Text>
                <Text style={styles.modalOptions}>Cat 5</Text>
                <Text style={styles.modalOptions}>Cat 6</Text>
                <Text style={styles.modalOptions}>Cat 7</Text>
                <Text style={styles.modalOptions}>Cat 8</Text>
                <Text style={styles.modalOptions}>Cat 9</Text>
                <Text style={styles.modalOptions}>Cat 10</Text>
            </ScrollView>
            <View style={styles.buttonView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => props.setModalVisible(!props.modalVisible)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    display: "flex",
    flexDirection: "column",
    height: "50%",
    // width:280,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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
    display:"flex",
    flexDirection:"row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
    marginBottom: 15,
    textAlign: "center",
  },
  modalOptions: {
    borderBottomWidth: 1, 
    marginBottom:5,
    textAlign:"center"
  }
});

export default ModalFilters;
