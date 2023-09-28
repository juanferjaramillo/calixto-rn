import useProducts from "./useProducts";
import cache from "../utility/cache";

export default function getProducts (userId) {
    let products = useProducts(userId); //Retrieve all products for a given owner from API
    if (products) {
        products = products.prodUser;
        return products;

    }




}