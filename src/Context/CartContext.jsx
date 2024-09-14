import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
export let CartContext = createContext();
export default function CartContextProvider({ children }) {
  
  const [cartId, setCartId] = useState(null);
  const [userId, setUserId] = useState(null)
  const [numberOfCartItems, setnumberOfCartItems] = useState(0);
  const [numOfFavoriteItems, setNumOfFavoriteItems] = useState(0);
  const [wishListDetails, setWishListDetails] = useState([]);
  

  let headers = {
    token: localStorage.getItem("token"),
  };

  function addProductToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function deleteProductItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  function updateCartItemCount(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function getLoggedUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  async function getCartItems() {
    let { data } = await getLoggedUserCart();
    setnumberOfCartItems(data.numOfCartItems);
    setCartId(data?.data._id);
    setUserId(data?.data.cartOwner)
  }

  useEffect(() => {
    getCartItems();
  }, []);

  // =================================== wishlist =================================

  async function getLoggedWishList() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  async function getFavProducts() {
    let response = await getLoggedWishList();
    setWishListDetails(response.data.data);
  }

  async function addToWishList(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  async function removeItemFromWishList(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((error) => error);
  }

  async function addProductToWishList(productId) {
    let response = await addToWishList(productId);
    setWishListDetails(response.data.data);
    toast.success('Product added Successfully to wishlist')
  }

  async function removeProductFromWishList(productId) {
    let response = await removeItemFromWishList(productId);
    setWishListDetails(response.data.data);
    toast.error('Product deleted Successfully from wishlist')
  }

  return (
    <CartContext.Provider
      value={{
        getLoggedUserCart,
        addProductToCart,
        updateCartItemCount,
        deleteProductItem,
        clearCart,
        numberOfCartItems,
        setnumberOfCartItems,
        cartId,
        wishListDetails,
        setWishListDetails,
        numOfFavoriteItems,
        setNumOfFavoriteItems,
        getLoggedWishList,
        addToWishList,
        removeItemFromWishList,
        getFavProducts,
        addProductToWishList,
        removeProductFromWishList,
        userId
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
