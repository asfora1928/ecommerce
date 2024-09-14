import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetCode() {
  let navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [loader, setloader] = useState(false);

  async function handleResetCode(formValues) {
    try {
      setloader(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        formValues
      );
      if (data.status === "Success") {
        setloader(false);
        navigate("/nwepassword");
      }
    } catch (error) {
      setloader(false);
      setApiError(error?.response?.data?.message);
    }
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: handleResetCode,
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
              Reset Code:
            </h2>

            <form onSubmit={formik.handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="emaill"
                    className="text-base font-medium text-gray-600"
                  >
                    Reset Code
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="resetCode"
                      id="resetCode"
                      value={formik.values.resetCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="asfora@gmail.com"
                      className="block w-full p-2 text-black placeholder-gray-500 transition-all duration-200  rounded-md bg-gray-50 focus:outline-none focus:border-[#08ac0a] focus:bg-white caret-[#08ac0a] border-2 border-[#c9c4c4ec]"
                    />
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
                      "Submit"
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
