import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [Categories, setCategories] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((error) => {});
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="container mx-auto py-10">
        <h2 className="p-4 text-xl text-gray-800 font-medium">
          Shop popular Categories
        </h2>
        <Slider {...settings}>
          {Categories.map((category) => (
            <>
              <Link to={`/relatedProducts/${category.name}`}>
                <div className="rounded-lg max-h-screen m-2 mb-3 hover:scale-105 hover:cursor-pointer transition-all hover:shadow-2xl hover:transform  duration-500 pb-3 antialiased text-gray-900 ">
                  <img
                    class="h-[190px] w-full object-cover"
                    src={category.image}
                    alt={category.name}
                  />
                  <h4 class="mt-2 font-light  leading-tight truncate px-4 py-2">
                    {category.name}
                  </h4>
                </div>
              </Link>
            </>
          ))}
        </Slider>
      </div>
    </>
  );
}
