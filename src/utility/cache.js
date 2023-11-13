
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const prefixProd = "prod";
const prefixCateg = "categ";
const expiryInMinutes = 1200;

const storeProd = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefixProd + key, JSON.stringify(value));
    // console.log("cacheStored", JSON.stringify(value));
  } catch (error) {
    console.log("error storing prods", error);
  }
};

// const storeCateg = async (key, value) {
//   try {
//     await AsyncStorage.setItem(CATEGORIAS)
//   } catch (error) {
//     console.log("error storing categ", error);
//   }
// }

const isExpired = (item) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timestap);
  return now.diff(storedTime, "minutes") > expiryInMinutes;
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefixProd + key);
    // console.log("cacheGet", value);
    const item = JSON.parse(value);

    if (!item) return null;

    if (isExpired(item)) {
      await AsyncStorage.removeItem(prefixProd + key);
      return null;
    }
    return item;
  } catch (error) {
    console.log(error);
  }
};

const getAll = async () => {
  const item = [];
  try {
    const keys = await AsyncStorage.getAllKeys();
    for (let i=0; i<keys.length; i++) {
      const it= JSON.parse(await AsyncStorage.getItem(keys[i]));
      item.push(it);
    }
    if (!item) return null;
    // if (isExpired(item)) {
    //   await AsyncStorage.removeItem(prefixProd + key);
    //   return null;
    // }
    return item;
  } catch (error) {
    return [];
    console.log(error);
  }
};

const clear = async () => {
    await AsyncStorage.clear()
}

export default {
  storeProd,
  get,
  getAll,
  clear,
};
