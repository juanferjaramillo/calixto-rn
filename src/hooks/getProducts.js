import useGetApiProducts from "./useGetApiProducts";
import cache from "../utility/cache";

export default function getProducts (userId) {
    let products = useGetApiProducts(userId); //Retrieve all products for a given owner from API
    if (products) {
        products = products.prodUser;
        return products;

    }




}