//gets prods from API to Cache
import axios from "axios";
import cache from "../utility/cache";
import getProducts from "../hooks/getProducts";


export default  function ProdsLoader(userId) {
  let products = getProducts(1);
  products = products?.slice(0, 10);
  console.log("prdd",products);


//   cache.store("producto","almendra");

  // console.log("reading",cache.get("producto"));

}
