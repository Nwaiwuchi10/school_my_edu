import React from "react";
import teacher1 from "../../assets/teacher1.png";
import teacher2 from "../../assets/teacher2.png";

const BizPartner = () => {
  return (
    <div className="service-bg-div" style={{ paddingBottom: "50px" }}>
      <div
        className="section containers"
        id="teacher"
        style={{ paddingTop: "50px" }}
      >
        <div className="grid sm:grid-cols-2 place-items-center gap-8">
          <div className="pl-5">
            <div className="font-bold sm:text-[1.875rem] text-[1.5rem] mb-5">
              Become <span className="text-Teal">An Investor</span> <br /> of
              Our Platform
            </div>
            <p className="text-sm leading-7 text-gray mb-5">
              Becoming an investor with us gives you the opportunity to take and
              earn 50% share in this platform. Our business partners has an
              equal right and access to the platform. As an investor, you are
              also our partner.
            </p>
            <button className="contact-btn">
              Contact Us
              {/* <IoIosArrowRoundForward />{" "} */}
            </button>
          </div>
          <div className="p-4 md:w-3/4 sm:row-start-1">
            <img src={teacher1} alt="" />
          </div>
          <div className="pl-5">
            <div className="font-bold sm:text-[1.875rem] text-[1.5rem] mb-5">
              Become <span className="text-Teal">A Product Marketer</span>{" "}
              <br /> of Our Platform
            </div>
            <p className="text-sm leading-7 text-gray mb-5">
              Becoming a product marketer with us gives you 10% of any school
              that subscribs with us through your ref name. This is an annual
              10% revenue from each school that you recommended. A product
              marketer earns 3% from our scratch card sells from their ref
              schools.
            </p>
            <button className="contact-btn">
              Contact Us
              {/* <IoIosArrowRoundForward />{" "} */}
            </button>
          </div>
          <div className="p-4 md:w-3/4">
            <img src={teacher2} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BizPartner;
