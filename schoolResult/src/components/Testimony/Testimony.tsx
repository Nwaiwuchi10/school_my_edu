import React, { useState } from "react";
import abtm from "../../assets/images/abtm.jpg";
import puyol from "../../assets/images/puyol.jpg";
import vj from "../../assets/images/vj.jpg";
import rig from "../../assets/images/rig.jpg";
import rige from "../../assets/images/rig.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonial.css";
import { Container } from "react-bootstrap";
type Props = {
  onClick?: () => any;
};
const SampleNextArrow = (props: Props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i className="fa fa-long-arrow-alt-right"></i>
      </button>
    </div>
  );
};
const SamplePrevArrow = (props: Props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <i className="fa fa-long-arrow-alt-left"></i>
      </button>
    </div>
  );
};
const Testimony = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1246,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="service-bg-div">
      <div className=" testmonial-section">
        <div className="containers ">
          <h2 className="test-h text-center antialiased font-semibold text-black text-3xl pt-12 ">
            Happy Clients
          </h2>
          <h2 className="test-h2 text-center antialiased font-semibold text-black text-5xl pt-2 mb-5">
            Testomonies
          </h2>
          <Slider {...settings} className="d-test-div">
            <figure className="snip1390">
              <div className="img-test-profile">
                {" "}
                <img src={rige} alt="profile-sample3" className="profile" />
              </div>

              <figcaption>
                <h4>Eleanor Crisp</h4>
                <h5>Enterprenuer</h5>
                <blockquote>
                  REGISCAJE DELUX INTERIORS are the best when it comes to Home
                  Decoration and Interior Designs. Patronize them.
                </blockquote>
              </figcaption>
            </figure>

            <figure className="snip1390">
              <img src={puyol} alt="profile-sample6" className="profile" />
              <figcaption>
                <h4>Sue Shei</h4>
                <h5>Public Relations</h5>
                <blockquote>
                  Kudos to REGISCAJE DELUX INTERIORS, They are the best when it
                  comes to Home Compound beautification.
                </blockquote>
              </figcaption>
            </figure>
            <figure className="snip1390 hover">
              <img src={rig} alt="profile-sample5" className="profile" />
              <figcaption>
                <h4>Gordon Nor</h4>
                <h5>Accountant</h5>
                <blockquote>
                  I can't thank REGISCAJE DELUX INTERIORS enough for their high
                  quality and sustainable Furnitures supply.
                </blockquote>
              </figcaption>
            </figure>
            <figure className="snip1390 hover">
              <img src={abtm} alt="profile-sample5" className="profile" />
              <figcaption>
                <h4>Gordon Nor</h4>
                <h5>Accountant</h5>
                <blockquote>
                  REGISCAJE DELUX INTERIORS are the best when it comes to
                  Project Management, Evluation and marketing.
                </blockquote>
              </figcaption>
            </figure>
            <figure className="snip1390 hover">
              <img src={vj} alt="profile-sample5" className="profile" />
              <figcaption>
                <h4>Gordon Nor</h4>
                <h5>Accountant</h5>
                <blockquote>
                  REGISCAJE DELUX INTERIORS are the best when it comes to
                  Industrial Cleaning. Patronize them.
                </blockquote>
              </figcaption>
            </figure>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimony;
