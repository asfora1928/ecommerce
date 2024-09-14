import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

export default function Brands() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, error, isError, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  if (isLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center ">
        <HashLoader color="#08ac0a" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex w-full h-screen justify-center items-center ">
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <>
      <div className="p-1 flex flex-wrap items-center justify-center container mx-auto">
        {data?.data?.data.map((brand) => (
          <>
            <Link to={`/specificBrands/${brand.name}`}>
              <div class="flex-shrink-0 m-6 relative overflow-hidden bg-gray-400 rounded-lg max-w-xs shadow-lg  hover:scale-105 duration-500 cursor-pointer">
                <svg
                  class="absolute bottom-0 left-0 mb-8 scale-[1.5] opacity-[0.1]"
                  viewBox="0 0 375 283"
                  fill="none"
                >
                  <rect
                    x="159.52"
                    y="175"
                    width="152"
                    height="152"
                    rx="8"
                    transform="rotate(-45 159.52 175)"
                    fill="white"
                  />
                  <rect
                    y="107.48"
                    width="152"
                    height="152"
                    rx="8"
                    transform="rotate(-45 0 107.48)"
                    fill="white"
                  />
                </svg>
                <div class="relative pt-10 px-10 flex items-center justify-center">
                  <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3 demo"></div>
                  <img class="relative w-40" src={brand.image} alt="" />
                </div>
                <div class="relative text-white px-6 pb-6 mt-6">
                  <span class="block opacity-75 -mb-1">Brand</span>
                  <div class="flex justify-between">
                    <span class="block font-semibold text-xl">
                      {brand.name}
                    </span>
                    {/* <span class="block bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none  items-center">$36.00</span> */}
                  </div>
                </div>
              </div>
            </Link>
          </>
        ))}
      </div>
    </>
  );
}
