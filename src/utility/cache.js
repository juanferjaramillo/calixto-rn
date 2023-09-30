
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const prefix = "cache";
const expiryInMinutes = 1200;

const store = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(value));
    // console.log("cacheStored", JSON.stringify(value));
  } catch (error) {
    console.log("error store", error);
  }
};

const isExpired = (item) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timestap);
  return now.diff(storedTime, "minutes") > expiryInMinutes;
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);
    // console.log("cacheGet", value);

    if (!item) return null;

    if (isExpired(item)) {
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }
    return item;
  } catch (error) {
    console.log(error);
  }
};

const clear = async () => {
    await AsyncStorage.clear()
}

export default {
  store,
  get,
  clear
};
