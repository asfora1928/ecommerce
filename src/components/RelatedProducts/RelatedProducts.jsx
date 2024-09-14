import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';




export default function RelatedProducts() {
  const {
    addProductTowishlist,
    deleteWishItem,
    getLoggedUserwishlist,
  } = useContext(WishlistContext);
  const [wishlistItems, setWishlistItems] = useState([]);

  let {category} = useParams()
  let {addProductToCart,setnumberOfCartItems} = useContext(CartContext)
  const [RelatedProduct, setRelatedProduct] = useState([]);
  const [loader, setloader] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0)

  function getRelatedProducts(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data.data;
        let related = allProducts.filter(
          (product) => product.category.name == category
        );
        setRelatedProduct(related);
      })
      .catch((error) => {});
  }

  async function addProduct(productId) {
    setCurrentProductId(productId)
    setloader(true)
      let response = await  addProductToCart(productId)
      setnumberOfCartItems(response.data.numOfCartItems) 
      console.log(response);
      if (response.data.status === 'success') {
        setloader(false)
        toast.success(response.data.message)
      }else {
        setloader(false)
        toast.error(response.data.message)
      }
      
    }
    
  async function addWish(productId) {
    setCurrentProductId(productId);

    try {
      let response = await addProductTowishlist(productId);
      if (response?.data.status === "success") {
        setWishlistItems([...wishlistItems, productId]);
        toast.success(response?.data.message, {
          duration: 2000,
          position: "top-center",
        });
      } else {
        toast.error(response?.data.message);
      }
    } catch (error) {
      toast.error("Failed to add product to wishlist.");
    } finally {
    }
  }

  async function deleteItem(productId) {
    try {
     await deleteWishItem(productId);
      setWishlistItems(wishlistItems.filter((id) => id !== productId));
      toast.error('Item deleted successfully')
    } catch (error) {
      toast.error("Failed to delete item from wishlist.");
    } finally {
    }
  }

  const handleClick = (productId) => {
    if (wishlistItems.includes(productId)) {
      deleteItem(productId);
    } else {
      addWish(productId);
    }
  };

  const handleWish = async () => {
    let response = await getLoggedUserwishlist();
    console.log(response);
    let wishListProductItems = response.data.data.map((product) => product._id);
    setWishlistItems(wishListProductItems);
  };


  useEffect(() => {
    getRelatedProducts(category);
    handleWish();
  }, [ wishlistItems]);


    
  return (
    <>
 <div className="row container mx-auto">

{RelatedProduct.map((product) => (
          <>
           <div className="lg:w-1/6  md:w-1/3 sm:w-1/2 lg:p-5 md:p-6 p-8">
              <div className="product py-4 rounded-xl bg-white p-3 hover:shadow-xl hover:transform hover:scale-105 duration-500 hover:border-green-600  border-2 mt-2">
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img
                    className="rounded-2xl w-full"
                    src={product.imageCover}
                    alt={product.title}
                  />

                  <span className="block font-light text-green-600">
                    {product.category.name}
                  </span>

                  <h3 className="text-lg font-normal text-gray-800 mb-4 flex justify-between">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>

                  <div className="flex justify-between items-center">
                    <span>{product.price} EGP</span>
                    <span>
                      {product.ratingsAverage}{" "}
                      <i className="fas fa-star text-yellow-400"></i>
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => handleClick(product.id)}
                  className="cursor-pointer"
                >
                  {wishlistItems.includes(product.id) ? (
                    <i className="fa-solid fa-heart text-2xl me-2 text-red-700 mt-4"></i>
                  ) : (
                    <i className="fa-regular fa-heart text-2xl me-2 text-red-700 mt-4"></i>
                  )}
                </button>
                <button
                  onClick={() => addProduct(product.id)}
                  className="px-4 py-2 text-white bg-green-600 rounded-lg w-full mt-3 addCart"
                >
                  {currentProductId === product.id && loader ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "add to cart"
                  )}
                </button>
              </div>
            </div>
          </>
          
        )) }
      </div>
      
    </>
  )
}
