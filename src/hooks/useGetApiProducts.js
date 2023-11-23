//get the products for a user from API and stores them in AsyncStorage
import {SERVER_URL} from "@env"
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useGetApiProducts(userId) {
    const [prods, setProds] = useState([]);
    let products = [];
    useEffect( ()=> {
      async function getProd () {
          products =  (await axios(`${SERVER_URL}/prodsuser${userId}`)).data
          // products =  (await axios(`https://calixtosrv.up.railway.app/prodsuser/${userId}`)).data
          setProds(products ); 
      }
      getProd();
  },[])
    return prods;
  }

// export default useProducts = async (userId) => {
//     const [prods, setProds] = useState([]);
//     const products = null;
//     useEffect(
//         async ()=>{products =  await axios.get(`https://calixtosrv.up.railway.app/prodsuser/${userId}`)},
//         setProds(products.data)
//     ,[])

//     return prods;
// } 