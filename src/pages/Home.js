import Action from "components/Action";
import Cards from "components/Cards";
import Faq from "components/Faq";
import Footer from "components/Footer";
import Landing from "components/Landing";
import Nav from "components/Nav";
import React, { useEffect } from "react";

const Home = () => {
  return (
    <div className=" bg-red">
      <Nav />
      <Landing />
      <Cards />
      <Action />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
