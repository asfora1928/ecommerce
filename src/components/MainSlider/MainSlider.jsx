import React from "react";
import shopping from "../../assets/images/Picsart_24-08-24_16-14-24-605.png";
import shopping2 from "../../assets/images/Picsart_24-08-24_17-19-29-948.png";
import offer from "../../assets/images/Picsart_24-08-24_17-21-45-736.png";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const ImageList = [
  {
    id: 1,
    img: shopping,
    title: "Upto 50% off on all Men's Wear",
    description:
      "lorem His Life will forever be Changed dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    img: shopping2,
    title: "30% off on all Women's Wear",
    description:
      "Who's there lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: offer,
    title: "70% off on all Products Sale",
    description:
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

var settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 800,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  cssEase: "ease-in-out",
  pauseOnHover: false,
  pauseOnFocus: true,
};

export default function MainSlider() {
  return (
    <>
      <div className="relative overflow-hidden min-h-[550px] sm:h-screen flex justify-center items-center  duration-200 ">
        <div className="h-[700px] w-[700px] bg-[#08ac0a]/40 absolute -top-[50%] right-0 rounded-2xl rotate-45 -z-9"></div>

        <div className="container">
          <Slider {...settings}>
            {ImageList.map((data) => (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 ">
                  <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10 ">
                    <h1 className="text-5xl sm:text-6xl lg-text-7xl font-bold">
                      {data.title}
                    </h1>
                    <p className="text-sm">{data.description}</p>
                    <div>
                      <button className="active"><Link to= 'products'>Order Now</Link></button>
                      
                    </div>
                  </div>

                  <div className=" order-2 sm:order-1 ">
                    <div className="relative z-10">
                      <img
                        className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm-scale-125 object-contain mx-auto"
                        src={data.img}
                        alt="shopping"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
