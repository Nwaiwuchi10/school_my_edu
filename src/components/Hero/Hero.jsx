import React, { useEffect, useState } from "react";
import "./Hero.css";
import heroPng from "../../assets/hero.png";
import teacher1 from "../../assets/images/teacher1.png";
import resultPix from "../../assets/images/restj.jpg";
import { Typewriter } from "react-simple-typewriter";
import { IoIosArrowRoundForward } from "react-icons/io";
import Partners from "../Partners/Partners";
const Hero = () => {
  const images = [heroPng, heroPng];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="hero-background-div">
      <div className="hero-display-div ">
        <div>
          <div
            className="inline-flex items-center
             rounded-full border px-2.5 py-0.5 font-semibold 
             transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-carnation-500 mb-2 text-md c-color"
          >
            Feed Your Knowledge
          </div>
          <div className="hero-upload">
            Upload Your School Terminal{" "}
            <span>
              {/* Result */}
              <Typewriter
                words={["Result"]}
                cursor
                deleteSpeed={50}
                typeSpeed={200}
                delaySpeed={1000}
                loop={false}
              />
            </span>
          </div>
          <div className="hero-platform">
            This platform is a powerful tool designed to simplify the process of
            publishing exam results for educational institutions such as
            schools, colleges, and universities.
          </div>
          <button className="contact-btn">
            Contact Us
            {/* <IoIosArrowRoundForward />{" "} */}
          </button>
        </div>
        <div>
          <div>
            {/* <img src={images[currentImageIndex]} alt="img" /> */}
            <img src={heroPng} alt="hero-img" />
          </div>
        </div>
      </div>
      <div className="mt-4 pb-4">
        <Partners />
      </div>
    </div>
  );
};

export default Hero;
