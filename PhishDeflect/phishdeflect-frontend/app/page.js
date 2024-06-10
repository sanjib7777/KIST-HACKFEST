import React from "react";
import Header from "@/components/shared/header";
import Hero from "@/components/ui/hero";
import Fadetext from "@/components/ui/fadetext";
import Footer from "@/components/shared/footer";
import { BouncyCardsFeatures } from "@/components/ui/BouncyCardsFeatures";
const page = () => {
  return (
    <>
      <div>
        <Header />
        <Hero />
        <BouncyCardsFeatures />
        <Fadetext />
        <Footer />
      </div>
    </>
  );
};

export default page;
