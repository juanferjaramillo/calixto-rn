import useGetApiProducts from "./useGetApiProducts";
import cache from "../utility/cache";
import axios from 'axios';

export default async function getProducts(userId) {
    
  async function gp(userId) {
     produ = (
      await axios(`https://calixtosrv.up.railway.app/prodsuser/${userId}`)
    ).data;
    // let products = useGetApiProducts(userId); //Retrieve all products for a given owner from API
    // if (products) {
        produ = produ?.prodUser;
    // }
    return produ;
}

let products = await gp(1);
return products;
// console.log("ppp",products);
}
