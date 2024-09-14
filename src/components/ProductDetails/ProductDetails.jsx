import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { HashLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from '../../Context/WishlistContext';
import toast from "react-hot-toast";


export default function ProductDetails() {
  const {
    addProductTowishlist,
    deleteWishItem,
    getLoggedUserwishlist,
  } = useContext(WishlistContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  let {addProductToCart,setnumberOfCartItems} = useContext(CartContext)
  const [currentProductId, setCurrentProductId] = useState(0)
  const [loader, setloader] = useState(false);
  let { id, category } = useParams();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
    select: (data) => data?.data.data,
  });

  const [productDetails, setProductDetails] = useState([]);
  const [RelatedProduct, setRelatedProduct] = useState([]);

  function getRelatedProducts(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data.data;
        let related = allProducts.filter(
          (product) => product.category.name == category
        );
        console.log(related);

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
    setProductDetails(data);
  }, [data, id, category,wishlistItems]);

  return (
    <>
      <div class="w-full max-w-5xl rounded bg-white p-5 mx-auto text-gray-800 relative md:text-left ">
        <div class="md:flex items-center -mx-10">
          {isLoading ? (
            <div className="flex w-full h-screen justify-center items-center ">
              <HashLoader color="#08ac0a" />
            </div>
          ) : (
            <>
              <div class="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div class="relative md:w-3/4 rounded-xl py-5 w-f ">
                  <Slider {...settings}>
                    {productDetails?.images?.map((src) => (
                      <img
                        src={src}
                        class="w-full relative z-10"
                        alt={productDetails?.title}
                      />
                    ))}
                  </Slider>
                </div>
              </div>
              <div class="w-full md:w-1/2 px-10">
                <div class="mb-10">
                  <h1 class="font-bold uppercase text-2xl mb-5">
                    {productDetails?.title}
                  </h1>
                  <p class="text-sm">{productDetails?.description}</p>
                </div>
                <div>
                  <div class=" mr-5 flex items-center mb-5 gap-3">
                    <span class="text-xl leading-none">
                      {productDetails?.price}EGP
                    </span>
                    <span>
                      {productDetails?.ratingsAverage}
                      <i className="fas fa-star text-yellow-500"></i>
                    </span>
                  </div>
                  <div class="inline-block align-bottom">
                    <button onClick={()=>addProduct(productDetails.id)} class="bg-green-600 opacity-100 hover:opacity-75 text-white rounded-lg px-4 py-2 w-full ">
                     add to cart
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

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
        ))}
      </div>
    </>
  );
}
