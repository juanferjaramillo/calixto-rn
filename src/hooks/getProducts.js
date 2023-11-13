//Return products.prodUser got from API

import axios from "axios";

export default async function getProducts(userId) {
  async function gp(id) {
    try {
      produ = (await axios(`https://calixtosrv.up.railway.app/prodsuser/${id}`))
        .data;
      // produ = produ?.prodUser;
      // const {prodUser, prove, categ } = produ;
      return produ;
      // return prodUser;
    } catch (error) {
      console.log(error.message);
      return {};
    }
  }
  let products = await gp(userId);
  return products;
}
