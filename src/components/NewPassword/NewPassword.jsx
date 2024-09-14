import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function NewPassword() {
  let navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [loader, setloader] = useState(false);

  function handleNewPassword(formValues) {
    setloader(true);
    axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        formValues
      )

      .then(({ data }) => {
        setloader(false);
        if (data.token) {
          navigate("/login");
        }
      })
      .catch((response) => {
        setloader(false);
        setApiError(response.data.message);
      });
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
    newPassword: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with capital letters & (5,10) letters"
      )
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: handleNewPassword,
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
              Reset New Password:
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
                    htmlFor="newPassword"
                    className="text-base font-medium text-gray-600"
                  >
                    {" "}
                    newPassword{" "}
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      value={formik.values.newPassword}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="password"
                      className="block w-full p-2 text-black placeholder-gray-500 transition-all duration-200 rounded-md bg-gray-50 focus:outline-none focus:border-[#08ac0a] focus:bg-white  caret-[#08ac0a] border-2 border-[#c9c4c4ec]"
                    />
                    {formik.errors.newPassword && formik.touched ? (
                      <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
                        {formik.errors.newPassword}
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
                      "submit"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
