import axios, { Axios } from "axios";
import { createContext, useState } from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props)
{
   
    const [wishlistId, setwishlistId] = useState(null)
   
        let headers = {
            token : localStorage.getItem('token')
        } 
    

    function getLoggedUserwishlist(){
       return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers:headers
            
        })
        .then((response)=> response)
        .catch((error)=> error)
    }

function addProductTowishlist(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        productId:productId
    } 
    ,{
            headers
        })
        .then((response)=> response)
        .catch((error)=> error)


}

function deleteWishItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
         headers:headers
     })
     .then((response)=> response)
     .catch((error)=> error)
 }









return <WishlistContext.Provider value={ { wishlistId ,  setwishlistId ,getLoggedUserwishlist,addProductTowishlist,deleteWishItem}}>
{props.children}
</WishlistContext.Provider>



}