import axios from "axios";
import { useEffect, useState } from "react";

export default function useProducts(ownerId) {
  const [prods, setProds] = useState([]);
  let products = [];
  useEffect( ()=> {
    async function getProd () {
        products =  (await axios(`https://calixtosrv.up.railway.app/prodsuser/${ownerId}`)).data
        setProds(products ); 
    }
    getProd();
    
},[])
  return prods;
}
