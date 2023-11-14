
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const prefixProd = "prod";
const prefixProv = "prov";
const prefixCate = "cate";
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
    console.log("cache error storing prods", error);
  }
};

const storeProv = async (key, value) => {
  try {
    await AsyncStorage.setItem(prefixProv + key, JSON.stringify(value))
  } catch (error) {
    console.log("cache error storing proveedores", error);
  }
}

const storeCateg = async (key, value) => {
  try {
    await AsyncStorage.setItem(prefixCate + key, JSON.stringify(value))
  } catch (error) {
    console.log("cache error storing categ", error);
  }
}

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

// const getAll = async (prefix) => {
//   const item = [];
//   try {
//     const keys = await AsyncStorage.getAllKeys();
//     for (let i=0; i<keys.length; i++) {
//       const it= JSON.parse(await AsyncStorage.getItem(keys[i]));
//       item.push(it);
//     }
//     if (!item) return null;
//     // if (isExpired(item)) {
//     //   await AsyncStorage.removeItem(prefixProd + key);
//     //   return null;
//     // }
//     return item;
//   } catch (error) {
  //     console.log(error);
//     return [];
//   }
// };

const getAll = async (prefix) => {
  let prods = [];
  let categ = [];

  try {
    const keys = await AsyncStorage.getAllKeys();
    // console.log("allKeys", keys);
    for (let i=0; i<keys.length; i++) {
      let k = keys[i].slice(0,4);
      // console.log("k",k);
      switch (k) {
        case "prod":
          prods.push(JSON.parse(await AsyncStorage.getItem(keys[i])));
          case "cate":
          categ.push(JSON.parse(await AsyncStorage.getItem(keys[i])));
      } 
      // prods.push(it);
    }
    if (!prods) return null;
    // if (isExpired(prods)) {
    //   await AsyncStorage.removeItem(prefixProd + key);
    //   return null;
    // }
    return prods;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const clear = async () => {
    await AsyncStorage.clear()
}

export default {
  storeProd,
  storeProv,
  storeCateg,
  get,
  getAll,
  clear,
};
