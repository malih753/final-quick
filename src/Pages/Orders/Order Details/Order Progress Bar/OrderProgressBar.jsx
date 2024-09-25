import React, { useState } from "react";

import { Step, StepButton, StepIndicator, Stepper } from "@mui/joy";
import {
  CartOutlineIcon,
  GiftIcon,
  ProcessingIcon,
  ProgressCheckIcon,
  TruckDeliveryIcon,
} from "../../../../assets/icons";

const steps = [
  { step: "Confirmed order", Icon: CartOutlineIcon },
  { step: "Processing order", Icon: ProcessingIcon },
  { step: "Product dispatched", Icon: GiftIcon },
  { step: "On delivery", Icon: TruckDeliveryIcon },
  { step: "Product delivered", Icon: ProgressCheckIcon },
];

const OrderProgressBar = () => {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <>
      {activeStep !== 6 && (
        <div className="w-[600px] sm:w-full bg-white py-4 px-0 sm:px-8">
          <Stepper
            sx={{
              width: "100%",
              // "--StepIndicator-size": { xs: "20px", sm: "66px" },
              "--StepIndicator-size": { xs: "40px", sm: "66px" },
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
                      bgcolor: activeStep < index ? "#F2F2F2" : "#15A9A0",
                      border: "none",

                      fontSize: "12px",
                      borderRadius: "15px",
                      // width: { xs: "20px", sm: "66px" },
                      // height: { xs: "20px", sm: "66px" },
                    }}
                  >
                    {
                      <step.Icon
                        color={activeStep < index ? "#CBCBCB" : "white"}
                      />
                    }
                  </StepIndicator>
                }
                sx={{
                  "&::after": {
                    height: "1.67px !important",

                    backgroundColor:
                      activeStep < index + 1 ? "#F2F2F2" : "#15A9A0",
                  },
                }}
              >
                <StepButton
                  sx={{
                    fontSize: "10.95px",
                    color: "#06152B",
                    marginTop: "5px",
                  }}
                  onClick={() => setActiveStep(index)}
                >
                  {step.step}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </div>
      )}
    </>
  );
};

export default OrderProgressBar;
