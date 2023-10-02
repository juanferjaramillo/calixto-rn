//Return products.prodUser got from API

import axios from "axios";

export default async function getProducts(userId) {
  
  async function gp(id) {
    produ = (await axios(`https://calixtosrv.up.railway.app/prodsuser/${id}`))
      .data;
    // let products = useGetApiProducts(userId); //Retrieve all products for a given owner from API
    // if (products) {
    produ = produ?.prodUser;
    // }
    return produ;
  }

  let products = await gp(userId);

  return products;
}
