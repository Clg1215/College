import React from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-10">
      <h1 className="font-extrabold text-[60px] text-center mt-28">
        <span className="text-[#f56551]">Welcome to Planora</span>
        <br></br> The ultimate travel companion for seamless planning and unforgettable journeys
      </h1>
      <p className="text-xl text-gray-500 text-center">
      Planora makes travel planning a breeze, letting you create personalized itineraries for any adventure—whether it’s a weekend escape or a world tour. Organize your destinations, activities, and accommodations all in one place. With an easy-to-use interface and endless customization, Planora helps you plan the perfect trip, stress-free and tailored just for you.

      </p>
      <Link to={"/create-trip"}>
        <Button> Map Your Trip Now </Button>
      </Link>
    </div>
  );
}

export default Hero;
