//get product info from API if available and stores it in cache
//if offline, does not alter the cache.

import useGetApiProducts from "./useGetApiProducts";
import cache from "../utility/cache";
import { useNetInfo } from "@react-native-community/netinfo";

export default  function cacheProducts (userId) {
    const netInfo = useNetInfo();
   
    async function storeCache (products) {
        await cache.storeProd ("prodData", products)
    }

    try {
        if (netInfo.isInternetReachable) {
            let products = useGetApiProducts(userId); //Retrieve all products for a given owner from API
            products = products.prodUser;
            storeCache(products);
            // await cache.storeProd("prodData", products)
        }
    } catch (error) {
        console.log(error);
    }
}