import React from "react";
import Home from "./components/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Register from "./components/Register/Register";
import { UserContextProvider } from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Products from "./components/Products/Products";
import RelatedProducts from "./components/RelatedProducts/RelatedProducts";
import SpecificBrands from "./components/SpecificBrands/SpecificBrands";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import CheckOut from "./components/CheckOut/CheckOut";
import WishList from "./components/WishList/WishList";
import Forget from "./components/Forget/Forget";
import ResetCode from "./components/ResetCode/ResetCode";
import NewPassword from "./components/NewPassword/NewPassword";
import AllOrders from "./components/AllOrders/AllOrders";
import WishlistContextProvider from "./Context/WishlistContext";

export default function App() {
  let query = new QueryClient();
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart/allorders",
          element: (
            <ProtectedRoute>
              <AllOrders/>
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },

        {
          path: "categorise",
          element: (
            <ProtectedRoute>
              {" "}
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "relatedProducts/:category",
          element: (
            <ProtectedRoute>
              {" "}
              <RelatedProducts />
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id/:category",
          element: (
            <ProtectedRoute>
              {" "}
              <ProductDetails />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />{" "}
            </ProtectedRoute>
          ),
        },

        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "specificBrands/:brand",
          element: (
            <ProtectedRoute>
              <SpecificBrands />{" "}
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "forget", element: <Forget /> },
        { path: "reset", element: <ResetCode /> },
        { path: "register", element: <Register /> },
        { path: "nwepassword", element: <NewPassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={query}>
        <UserContextProvider>
            <CartContextProvider>
              <WishlistContextProvider>
              <RouterProvider router={routes}></RouterProvider>
              <Toaster />
              </WishlistContextProvider>
            </CartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}
