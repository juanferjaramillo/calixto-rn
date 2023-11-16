import {
  DrawerLayoutAndroid,
  View,
  FlatList,
  ActivityIndicator,
  Modal,
} from "react-native";
import Layout from "./Layout";
import Card from "../../components/card/Card";
import ModalFilters from "./ModalFilters";
import FilterCateg from "./FilterCateg";
import FilterProve from "./FilterProve";
import FilterDispon from "./FilterDispon";
import FilterChannels from "./FilterChannels";
import FilterAttributes from "./FilterAttrib";
import FilterProperties from "./FilterProperties";

//================COMPONENT===================
export default function DisplayContents(props) {
  //Drawer, modal filters, card board
  console.log("DispCont-Displayed Prods:",props.filteredProds.length);
  //-------------------render-----------------
  return (
    <Layout>
      <DrawerLayoutAndroid
        ref={props.drawer}
        drawerWidth={200}
        drawerPosition={"left"}
        renderNavigationView={props.navigationView} //<DrawerContents />
      >
        {/* -------------Modals */}
        {props.loading && (
          <Modal transparent={true} style={{ marginTop: 100 }}>
            <ActivityIndicator
              size="large"
              color="orange"
              style={{ marginTop: 300 }}
            />
          </Modal>
        )}

        {props.modalVisible && (
          <ModalFilters
            modalVisible={props.modalVisible}
            setModalVisible={props.setModalVisible}
            filter={props.filter}
          >
            {/* ------------Filter Contents */}
            {props.filter === "proveedor" && (
              <FilterProve
                options={props.options}
                setModalVisible={props.setModalVisible}
              />
              )}
              {props.filter === "atributos" && <FilterAttributes
              options={props.options}
              setModalVisible={props.setModalVisible}
              />}
              {props.filter === "canales" && <FilterChannels
              setModalVisible={props.setModalVisible}
              />}
              
              {props.filter === "disponibilidad" && <FilterDispon />}

            {props.filter === "categoria" && (
              <FilterCateg
              options={props.options}
                setModalVisible={props.setModalVisible}
              />
            )}

            {props.filter === "propiedades" && (
              <FilterProperties
              options={props.options}
                setModalVisible={props.setModalVisible}
              />
            )}
          </ModalFilters>
        )}

        <View
          //card container
          style={{
            alignItems: "center",
            width: "100%",
            height: "94%",
          }}
        >
          {props.filteredProds && (
            <FlatList
              alignItems="center"
              numColumns={props.columns}
              style={{ width: "100%" }}
              data={props.filteredProds}
              renderItem={({ item }) => (
                <Card
                  key={item.id}
                  id={item.id}
                  prodUrl={item.prodUrl}
                  nombre={item.nombre}
                  barras={item.codigoBarras}
                  descripcion={item.descripcion}
                  existencia={item.existencia}
                  icons={item.icons}
                  precio_base={item.precioBase}
                  iva={item.tax?.tax}
                  categoria={item.category?.name}
                />
              )}
              key={props.columns}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={0.2}
            />
          )}
        </View>
      </DrawerLayoutAndroid>
    </Layout>
  );
}
