import React, { useEffect } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import * as SQLite from "expo-sqlite";
import Sequelize from "rn-sequelize";
const Op = Sequelize.Op;
const Model = Sequelize.Model;
 
const sequelize = new Sequelize({
  dialectModule: SQLite,
  database: "calixtodb",
  dialectOptions: {
    version: "1.0",
    description: "Test DB"
  }
});
 
class Product extends Model {}
Product.init(
  {
    id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    category: sequelize.STRING
  },
  {
    sequelize,
    modelName: "product"
  }
);


export default function Iniciodb() {
  useEffect(() => {
    async function init() {
      try {
        await sequelize.sync({
          //force: true
        });
 
        await Product.create({
          id: "3",
          name: "Choco from JS",
          category: "sequelize"
        }).then(console.log('listo!'));
      } catch (error) {
        console.log(error);
      }
    }
    init();
  }, []);
 
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});