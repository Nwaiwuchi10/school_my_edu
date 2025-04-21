import React from "react";
import TopNavBar from "../TopNavBar/TopNavBar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";

import Contact from "../Contact/Contact";
import Service from "../Services/Service";
import BizPartner from "../BizPartner/BizPartner";
import Testimony from "../Testimony/Testimony";
import AboutUs from "../About Us/AboutUs";
import Card from "../Card/Card";

const HomePage = () => {
  return (
    <div className="font-Poppins bg-Solitude">
      {/* {localStorage.getItem("userId") ? null : (
        <> */}
      <TopNavBar />
      {/* </>
      )} */}
      <Header />
      <Card />
      {/* <Hero />
      <AboutUs />
      <Service />
      <BizPartner /> */}

      <Footer />
    </div>
  );
};

export default HomePage;
