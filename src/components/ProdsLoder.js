//gets prods from API to Cache
import axios from "axios";
import cache from "../utility/cache";
import getProducts from "../hooks/getProducts";

export default function ProdsLoader(userId) {

  async function gp () {
    let produ = await getProducts(1);
    produ = produ?.slice(0, 3);
    console.log("prdd", produ[0]);
    return produ;
  }
  gp();

  //   cache.store("producto","almendra");

  // console.log("reading",cache.get("producto"));
}
