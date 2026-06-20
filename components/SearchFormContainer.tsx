"use client";
import { useState } from "react";
import ToggleButton from "./Buttons/ToggleButton";
import VehicleDetailsForm from "./Forms/VehicleDetailsForm";
import TireSizeForm from "./Forms/TireSizeForm";
// import VinForm from "../Forms/VinForm";
export default function SearchFormContainer() {
  const [selectedTab, setSelectedTab] = useState("vehicle-details");
  return (
    <div className=" w-full flex flex-col items-center justify-center p-9  bg-brand-charcoal rounded-2xl mt-8">
      <div className="relative flex items-center justify-between w-full sm:w-1/2 md:w-2/3 lg:w-1/3 bg-brand-mid rounded-full p-2 ">
        <ToggleButton
          selected={selectedTab === "vehicle-details"}
          onClick={() => setSelectedTab("vehicle-details")}
        >
          Vehicle
        </ToggleButton>
        <ToggleButton
          selected={selectedTab === "vin"}
          onClick={() => setSelectedTab("vin")}

          // disabled={true} //disable until vin form is ready
        >
          Tire Size
        </ToggleButton>

        <span
          className={`absolute bottom-0 left-0 h-full bg-brand-red rounded-full transition-all duration-300 w-1/2 ${selectedTab === "vehicle-details" ? "rounded-r-none " : "rounded-l-none "}`}
          style={{
            transform:
              selectedTab === "vehicle-details"
                ? "translateX(0%)"
                : "translateX(100%)",
          }}
        />
      </div>
      <div className="w-full  mt-6">
        {selectedTab === "vehicle-details" ? (
          <VehicleDetailsForm />
        ) : (
          <TireSizeForm />
          //   <VinForm /> //temporary until vin form is ready
        )}
      </div>
    </div>
  );
}
