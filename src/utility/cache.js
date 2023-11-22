import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const prefixProd = "prod";
const prefixProv = "prov";
const prefixCate = "cate";
const prefixUser = "user";
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
    console.log("cache error storing prods", error.message);
  }
};

const storeProv = async (key, value) => {
  try {
    await AsyncStorage.setItem(prefixProv + key, JSON.stringify(value));
  } catch (error) {
    console.log("cache error storing proveedores", error.message);
  }
};

const storeCateg = async (key, value) => {
  try {
    await AsyncStorage.setItem(prefixCate + key, JSON.stringify(value));
  } catch (error) {
    console.log("cache error storing categ", error.message);
  }
};

const storeUsers = async (key, value) => {
  try {
    await AsyncStorage.setItem(prefixUser + key, JSON.stringify(value));
  } catch (error) {
    console.log("cache error storing users", error.message);
  }
};

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
    console.log(error.message);
  }
};

const getAll = async (prefix) => {
  //gets all items with the given prefix
  let got = [];

  try {
    const keys = await AsyncStorage.getAllKeys();
    // console.log("allKeys", keys);
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i].slice(0, 4);
      // console.log("k",k);
      if (k === prefix) {
        got.push(JSON.parse(await AsyncStorage.getItem(keys[i])));
      }
    }
    if (!got) return null;
    // if (isExpired(prods)) {
    //   await AsyncStorage.removeItem(prefixProd + key);
    //   return null;
    // }
    // return prods;
    return got;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

const clear = async () => {
  await AsyncStorage.clear();
};

export default {
  storeProd,
  storeProv,
  storeCateg,
  storeUsers,
  get,
  getAll,
  clear,
};
