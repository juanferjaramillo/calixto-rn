//Return products.prodUser got from API

import axios from "axios";

export default async function getProducts(userId) {
  async function gp(id) {
    try {
      // produ = (await axios(`https://calixtosrv.up.railway.app/prodsuser/${id}`)).data;
      produ = (await axios(`http://192.168.1.10:3003/prodsuser/${id}`)).data;
      // let products = useGetApiProducts(userId); //Retrieve all products for a given owner from API
      produ = produ?.prodUser;
      return produ;
    } catch (error) {
      return [];
      console.log(error.message);
    }
  }

  let products = await gp(userId);
  return products;
}
