import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  let { numberOfCartItems } = useContext(CartContext);

  function logout() {
    localStorage.removeItem("token");
    setUserLogin(null);
    navigate("/login");
  }

  function onToogleMenue(e) {
    e.name = e.name === "menu" ? "close" : "menu";
    document.getElementById("nav").classList.toggle("top-[9%]");
  }

  return (
    <>
      <header className="bg-gray-100 p-6 lg:fixed top-0 left-0 right-0 z-50 static ">
        <nav className="flex justify-between items-center container mx-auto">
          <div>
            <Link to="/">
            
            <img
              className="cursor-pointer w-[155px]"
              src={logo}
              alt="Fresh Cart"
            />
            </Link>
         
          </div>

          {userLogin != null ? (
            <>
              <div
                id="nav"
                className=" nav-links duration-500 lg:static absolute lg:min-h-fit min-h-[50vh] left-0 top-[-100%] lg:w-auto w-full flex  items-center px-6  z-30 bg-gray-100 "
              >
                <ul className="flex lg:flex-row flex-col lg:items-center lg:gap-[4vw] gap-8 z-20 ">
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li className="flex gap-4">
                    <NavLink to="cart">Cart</NavLink>
                    <li className="relative lg:hidden visible">
                      <Link to="cart">
                        <i className="fas fa-cart-shopping text-lg hover:opacity-75"></i>
                      </Link>
                      <span className="absolute bottom-3 left-3 flex justify-center items-center min-w-[25px]  min-h-[25px] rounded-full text-white bg-green-700  ">
                        {numberOfCartItems}
                      </span>
                    </li>
                  </li>
                  <li>
                    <NavLink to="products">Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="brands">Brands</NavLink>
                  </li>
                  <li>
                    <NavLink to="categorise">Categorise</NavLink>
                  </li>
                  <li>
                    <NavLink to="cart/allorders">your Orders</NavLink>
                  </li>
                  <li className="lg:hidden visible">
                    <NavLink to="wishlist">Wishlist</NavLink>
                  </li>
                  <li className="lg:hidden visible pb-8">
                    <span
                      className="cursor-pointer hover:opacity-75"
                      onClick={logout}
                    >
                      Logout
                    </span>
                  </li>
                </ul>
              </div>
            </>
          ) : null}

          <ul className=" lg:flex items-center gap-[1vw] lg:visible hidden ">
            {userLogin === null ? (
              <>
                <li>
                  <Link to="register" className="hover:opacity-75">
                    Register
                  </Link>
                </li>
                <li>
                  <Link className="hover:opacity-75" to="login">
                    Sing in
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <span
                    className="cursor-pointer hover:opacity-75"
                    onClick={logout}
                  >
                    Logout
                  </span>
                </li>
                <li>
                  <Link to="wishlist">
                    <svg
                      className=""
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 group-hover:opacity-70 hover:text-red-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="gray"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </Link>
                </li>
                <li className="relative">
                  <Link to="cart">
                    <i className="fas fa-cart-shopping text-lg hover:opacity-75"></i>
                  </Link>
                  <span className="absolute bottom-3 left-3 flex justify-center items-center min-w-[25px]  min-h-[25px] rounded-full text-white bg-green-700  ">
                    {numberOfCartItems}
                  </span>
                </li>
              </>
            )}

            <li className="pl-2">
              <i className="fa-brands fa-facebook hover:opacity-75 cursor-pointer text-lg"></i>
            </li>

            <li>
              <i className="fa-brands fa-x-twitter  hover:opacity-75 cursor-pointer text-lg"></i>
            </li>

            <li>
              <i className="fa-brands fa-instagram  hover:opacity-75 cursor-pointer text-lg"></i>
            </li>

            <li>
              <i className="fa-brands fa-youtube hover:opacity-75 cursor-pointer text-lg"></i>
            </li>

            <li>
              <i className="fa-brands fa-tiktok hover:opacity-75 cursor-pointer text-lg"></i>
            </li>
          </ul>

          <i
            onClick={onToogleMenue}
            name="menu"
            className="fa-solid fa-bars cursor-pointer lg:hidden visible text-3xl mr-10"
          ></i>
        </nav>
      </header>
    </>
  );
}
