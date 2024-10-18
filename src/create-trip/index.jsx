import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { AI_PROMPT, SelectBudgetOptions } from "@/constants/options.jsx";
import { SelectTravelersList } from "@/constants/options.jsx";

import { Button } from "@/components/ui/button";
import { chatSession } from "@/service/AIMODEL";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

function CreateTrip() {
  // State to store selected place from Geoapify
  const [place, setPlace] = useState(null); // Initialize place as null

  // State to store all form data like destination, budget, number of days, and travelers
  const [formData, setFormData] = useState({});

  const [openDialog, setOpenDialog] = useState(false);

  // Function to handle and update form input changes
  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && value > 14) {
      console.log("Please enter days maximum to 14");
    }
    setFormData({
      ...formData, // Spread the previous form data
      [name]: value, // Update the specific field by name
    });
  };

  // Function to handle place selection from Geoapify autocomplete component
  const handlePlaceSelect = (value) => {
    setPlace(value); // Store the selected place in state
    handleInputChange("location", value.properties?.formatted); // Add the selected location to form data
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log(codeResp);
      GetUserProfile(codeResp);
    },
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if ((formData?.noOfDays > 7 && !formData?.location) || !formData?.budget) {
      return;
    }

    // Safely check for formData.location before replacing
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location || "your selected destination"
    )
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{people}", formData?.people)
      .replace("{budget}", formData?.budget)
      .replace("{noOfDays}", formData?.noOfDays);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 ml-20">
      <h2 className="font-bold text-3xl"> Tell Us Your Travel Preference </h2>
      <p className="mt-4 text-gray-400 text-xl">
        Just provide us with details of your budget and days and then wait for
        us to curate the best travel itinerary for you.
      </p>

      <div>
        <div className="mt-10 flex flex-col">
          <h2 className="text-xl my-3 font-medium">What is your destination 🌎</h2>
          <div className="">
            <GeoapifyContext apiKey="71ded9e31d664e36b4427f24e93edc48">
              <GeoapifyGeocoderAutocomplete
                placeholder="Enter address here"
                placeSelect={(value) => handlePlaceSelect(value)}
              />
            </GeoapifyContext>
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 mt-5 font-medium">
            How many days trip are you planning? 🏕️
          </h2>
          <Input
            placeholder=" e.g. 3 days"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 mt-7 font-medium">
            Choose your specific budget for the trip
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-7">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-md ${
                  formData?.budget === item.title && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-600 mt-4">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 mt-7 font-medium">
            Choose the total number of persons going on the trip
          </h2>
          <div className="grid grid-cols-4 gap-7 mt-7">
            {SelectTravelersList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("people", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-md ${
                  formData?.people === item.people && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl text-center">{item.icon}</h2>
                <h2 className="font-bold text-lg text-center">{item.title}</h2>
                <h2 className="text-sm text-gray-600 mt-4">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button onClick={OnGenerateTrip}> Generate Trip </Button>
      </div>

      {/* Google Login Dialog */}
      <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
        <DialogContent>
          <DialogHeader >
            <DialogDescription>
              <img src="/output-onlinepngtools.png" />
              <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
              <p>Sign in to the app with Google authentication</p>
              <Button 
                onClick={() => login()}
                className="w-full mt-5 flex gap-3 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
