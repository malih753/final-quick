import React, { useState } from "react";
import {
  CheckIcon,
  FilterIcon,
  SearchIcon,
  SortIcon,
} from "../../../assets/icons";
import Button from "../../../Common/Button";
import { Step, StepButton, StepIndicator, Stepper } from "@mui/joy";
import SelectProducts from "./Components/SelectProducts";
import AddressInfo from "./Components/AddressInfo";
import PaymentInfo from "./Components/PaymentInfo";
import OrderCompleted from "./Components/OrderCompleted";

const steps = [
  "Select Products",
  "Address Info",
  "Payment Info",
  "Order Successful",
];
const AddOrder = () => {
  return (
    <div className="pb-5">
      <div className="flex flex-wrap justify-end gap-3">
        <div className="btn relative w-full sm:w-[150px]">
          <input
            type="text"
            className="border-none text-[#15A9A0] outline-none bg-transparent placeholder:text-[#15A9A0] w-full"
            placeholder="Search Product"
          />
          <SearchIcon classNames={"w-6 h-6"} color={"#15A9A0"} />
        </div>
        <Button btnClass="text-black ">
          <span className="text-xs font-medium">Filter</span>
          <FilterIcon />
        </Button>
        <Button btnClass="text-black ">
          <span className="text-xs font-medium">Sort</span>
          <SortIcon />
        </Button>
      </div>

      <div className="mt-5  py-[15px] px-[25px] bg-white rounded-[30px] w-full   relative">
        <h1 className="text-[#15A9A0] text-lg pb-6 border-b border-b-[#DDDDDD]">
          Order for someone
        </h1>

        <MyStepper />
      </div>
    </div>
  );
};

const MyStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  // const [formData, setFormData] = useState({});
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <SelectProducts />;

      case 1:
        return <AddressInfo />;

      case 2:
        return <PaymentInfo />;

      case 3:
        return <OrderCompleted />;
    }

  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  return (
    <div className="overflow-x-auto">
      <div className="  overflow-x-auto mx-auto bg-white py-4 px-0 sm:px-8">
        <Stepper
          sx={{
            width: "600px",
            margin: "0 auto",
            // "--StepIndicator-size": { xs: "20px", sm: "66px" },
            "--StepIndicator-size": "32px",
            // flexWrap: "wrap",
            // gap: { xs: "20px", sm: "0" },
          }}
        >
          {steps.map((step, index) => (
            <Step
              orientation={"vertical"}
              key={step.step}
              indicator={
                <StepIndicator
                  variant={activeStep <= index ? "soft" : "solid"}
                  color={activeStep < index ? "neutral" : "primary"}
                  sx={{
                    bgcolor:
                      activeStep < index || (activeStep == index && index != 3)
                        ? "white"
                        : "#15A9A0",
                    border:
                      activeStep < index
                        ? "2px solid #A1AEBE"
                        : "2px solid #15A9A0",

                    color: activeStep == index ? "#15A9A0" : "#06152B",
                    fontSize: "12px",

                    borderRadius: "15px",
                    // width: { xs: "20px", sm: "66px" },
                    // height: { xs: "20px", sm: "66px" },
                  }}
                >
                  {activeStep == index + 1 ||
                  activeStep > index + 1 ||
                  activeStep == 3 ? (
                    <CheckIcon />
                  ) : (
                    "0" + (index + 1)
                  )}
                </StepIndicator>
              }
              sx={{
                "&::after": {
                  height: "2px !important",

                  backgroundColor:
                    activeStep < index + 1 ? "#A1AEBE" : "#15A9A0",
                },
              }}
            >
              <StepButton
                sx={{
                  fontSize: "10.95px",
                  color:
                    activeStep == index || activeStep > index
                      ? "#15A9A0"
                      : "#06152B",
                  marginTop: "5px",
                }}
                onClick={() => setActiveStep(index)}
              >
                {step}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="mt-20 min-h-[700px] ">
        {renderStepContent(activeStep)}
      </div>
      <Button
        title="Next"
        onClick={handleNext}
        btnClass={`absolute right-6 bottom-6 bg-[#15A9A0] text-white pt-2.5 pb-[14px] px-[35px] hover:bg-white hover:text-[#15A9A0] hover:border hover:border-[#15A9A0] duration-300 ${
          activeStep == 2
            ? "left-1/2 -translate-x-1/2 sm:bottom-20 bottom-[30%] translate-y-[-30%] w-fit"
            : ""
        } ${activeStep == 3 && "hidden"}`}
      />
    </div>
  );
};

export default AddOrder;
