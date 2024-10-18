export const SelectTravelersList = [
  {
    id: 1,
    title: "Just Me",
    desc: "Forge your own path and embrace the freedom of solo adventures. Planora helps you craft a trip that’s all about you",
    icon: "🧳",
    people: "1 person",
  },
  {
    id: 2,
    title: "A couple",
    desc: "Set the scene for unforgettable moments with your favorite person Planora makes planning the perfect getaway for two effortless",
    icon: "💑",
    people: "2 persons",
  },
  {
    id: 3,
    title: "Family",
    desc: "With Planora, organize a fun-filled adventure tailored to every member of the family",
    icon: "🚌",
    people: "3 to 5 persons",
  },
  {
    id: 4,
    title: "Friends",
    desc: "Planora makes group travel planning seamless and exciting for you and your friends.",
    icon: "🚂",
    people: "5 to 10 persons",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "🪙",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about cost",
    icon: "💸",
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location: {location}, for {noOfDays} days for {people} with a {budget} budget,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {noOfDays} days with each day plan with best time to visit and show every cost in INR in JSON format";
