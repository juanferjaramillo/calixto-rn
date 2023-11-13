import { DrawerLayoutAndroid, View, FlatList } from "react-native";
import Layout from "./Layout";
import Card from "../../components/card/Card";
import ModalFilters from "./ModalFilters";
import FilterCateg from "./FilterCateg";
import FilterProve from "./FilterProve";
import FilterDispon from "./FilterDispon";
import { DialogLoading } from "@rneui/base/dist/Dialog/Dialog.Loading";

//================COMPONENT===================
export default function DisplayContents(props) {
  //-------------------render-----------------
  return (
    <Layout>
      {props.loading && <DialogLoading />}
      <DrawerLayoutAndroid
        ref={props.drawer}
        drawerWidth={200}
        drawerPosition={"left"}
        renderNavigationView={props.navigationView}
      >
        {props.modalVisible && (
          <ModalFilters
            modalVisible={props.modalVisible}
            setModalVisible={props.setModalVisible}
            filter={props.filter}
          >
            {props.filter === "proveedor" && <FilterProve />}
            {props.filter === "disponibilidad" && <FilterDispon />}
            {props.filter === "categoria" && <FilterCateg />}
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