import axios from "axios";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { Link, useParams } from "react-router-dom";

export default function Categories() {
  const [Categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setIsLoading(false);
        setCategories(data.data);
      })
      .catch((error) => {});
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full h-screen justify-center items-center ">
          <HashLoader color="#08ac0a" size={40} />
        </div>
      ) : (
        <>
          <div className="container mx-auto flex flex-wrap py-8 justify-center">
            {Categories.map((category) => (
              <>
                <Link to={`/relatedProducts/${category.name}`}>
                  <div className="rounded-lg max-h-screen m-3 mb-5 hover:scale-105 hover:cursor-pointer transition-all hover:shadow-2xl hover:transform  duration-500 pb-8 antialiased text-gray-900  ">
                    <img
                      class="h-[200px] w-[220px] object-cover"
                      src={category.image}
                      alt={category.name}
                    />
                    <h4 class="mt-2 font-light  leading-tight truncate">
                      {category.name}
                    </h4>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
}
