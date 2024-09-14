import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  let { setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [loader, setloader] = useState(false);

  function handleLogin(formValues) {
    setloader(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formValues)

      .then((response) => {
        setloader(false);
        if (response.data.message === "success") {
          localStorage.setItem("token", response.data.token);
          setUserLogin(response.data.token);
          navigate("/");
        }
      })
      .catch((response) => {
        setloader(false);
        setApiError(response.data.message);
      });
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with capital letters & (5,10) letters"
      )
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema,
  });

  return (
    <>
      <section className="bg-white mb-7 h-full">
        <div className="grid grid-cols-1 ">
          <div className=" px-4  bg-white sm:px-6 lg:px-8 py-5 xl:w-full xl:max-w-xl 2xl:max-w-md xl:mx-auto ">
            {apiError ? (
              <div className="p-4 mb-4 text-sm text-red-800 bg-red-200 rounded-md">
                {apiError}
              </div>
            ) : null}
            <h2 className="text-3xl font-bold leading-tight text-[#0aad0a] sm:text-4xl">
              Login Now:
            </h2>

            <form onSubmit={formik.handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="emaill"
                    className="text-base font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="emaill"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="asfora@gmail.com"
                      className="block w-full p-2 text-black placeholder-gray-500 transition-all duration-200  rounded-md bg-gray-50 focus:outline-none focus:border-[#08ac0a] focus:bg-white caret-[#08ac0a] border-2 border-[#c9c4c4ec]"
                    />
                    {formik.errors.email && formik.touched ? (
                      <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-600"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="password"
                      className="block w-full p-2 text-black placeholder-gray-500 transition-all duration-200 rounded-md bg-gray-50 focus:outline-none focus:border-[#08ac0a] focus:bg-white  caret-[#08ac0a] border-2 border-[#c9c4c4ec]"
                    />
                    {formik.errors.password && formik.touched ? (
                      <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full py-2 text-base font-semibold text-white transition-all duration-200 bg-[#08ac0a] border border-transparent rounded-md focus:outline-none hover:bg-[#08ac0bf1] focus:bg-[#08ac0ba6]"
                  >
                    {loader ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      "Login"
                    )}
                  </button>

                  <p className="pt-3">
                    didn't have acount yet?{" "}
                    <span className=" font-semibold">
                      <Link to="/register">Register Now</Link>
                    </span>
                  </p>
                  <p className="pt-3">
                    Did you{" "}
                    <span className=" font-semibold">
                      <Link to="/forget">Forget Password?</Link>
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
