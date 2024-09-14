import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CheckOut() {
  const [loader, setloader] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  let { cartId } = useContext(CartContext);
  let navigate = useNavigate();

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: detectAndCall,
  });

  function detectAndCall(formValues) {
    if (isOnline) {
      onlinePayment(formValues);
    } else {
      handleCashOrder(formValues);
    }
  }

  function handleCashOrder(formValues) {
    const backendBody = {
      shippingAddress: formValues,
    };

    setloader(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        backendBody,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setloader(false);
        setSpinner(false);
        navigate("/cart/allorders");
        toast.success("Payment Don Successfully");
      })
      .catch((error) => {
        setloader(false);
        setSpinner(false);
      });
  }

  function onlinePayment(formValues) {
    const backendBody = {
      shippingAddress: formValues,
    };

    setSpinner(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        backendBody,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            url: "http://localhost:5174/cart",
          },
        }
      )
      .then((response) => {
        setloader(false);
        setSpinner(false);
        window.open(response.data.session.url, "_self");
      })
      .catch((error) => {
        setloader(false);
        setSpinner(false);
      });
  }

  return (
    <>
      <div className="container mx-auto p-5  px-4  bg-white sm:px-6 lg:px-8 py-5 xl:w-full xl:max-w-xl 2xl:max-w-md xl:mx-auto">
        <form onSubmit={formik.handleSubmit} className="mt-8">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="details"
                className="text-base font-medium text-gray-600"
              >
                details
              </label>
              <div className="mt-2.5">
                <input
                  required
                  type="text"
                  name="details"
                  id="details"
                  value={formik.values.details}
                  onChange={formik.handleChange}
                  placeholder="Enter your details"
                  className="block w-full p-2 text-black placeholder-gray-500 transition-all duration-200  rounded-md bg-gray-50 focus:outline-none focus:border-[#08ac0a] focus:bg-white caret-[#08ac0a] border-2 border-[#c9c4c4ec]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="text-base font-medium text-gray-600"
              >
                {" "}
                phone{" "}
              </label>
              <div className="mt-2.5">
                <input
                  required
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  placeholder="phone"
                  className="block w-full p-2 text-black placeholder-gray-500 transition-all duration-200 rounded-md bg-gray-50 focus:outline-none focus:border-[#08ac0a] focus:bg-white  caret-[#08ac0a] border-2 border-[#c9c4c4ec]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="city"
                className="text-base font-medium text-gray-600"
              >
                {" "}
                city{" "}
              </label>
              <div className="mt-2.5">
                <input
                  required
                  type="text"
                  name="city"
                  id="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  placeholder="city"
                  className="block w-full p-2 text-black placeholder-gray-500 transition-all duration-200 rounded-md bg-gray-50 focus:outline-none focus:border-[#08ac0a] focus:bg-white  caret-[#08ac0a] border-2 border-[#c9c4c4ec]"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => setIsOnline(false)}
                type="submit"
                className="inline-flex items-center justify-center w-full py-2 text-base font-semibold text-white transition-all duration-200 bg-[#08ac0a] border border-transparent rounded-md focus:outline-none hover:bg-[#08ac0bf1] focus:bg-[#08ac0ba6] mb-4"
              >
                {loader ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Cash Order"
                )}
              </button>

              <button
                onClick={() => setIsOnline(true)}
                type="submit"
                className="inline-flex items-center justify-center w-full py-2 text-base font-semibold text-white transition-all duration-200 bg-[#08ac0a] border border-transparent rounded-md focus:outline-none hover:bg-[#08ac0bf1] focus:bg-[#08ac0ba6]"
              >
                {spinner ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Online Payment Order"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
