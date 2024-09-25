import Popover from "@mui/material/Popover";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import * as React from "react";
import { ArrowRightIcon } from "../../../assets/icons";
import Button from "../../../Common/Button";
import { documentPopoverData } from "../../../Constants/documentPopoverData";
export default function DocumentsPopover() {
  console.log("1");
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button
            {...bindTrigger(popupState)}
            btnClass="bg-transparent underline text-[#15A9A0] text-xs xs:text-sm px-0 sm:text-lg"
          >
            View Documents
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            style={{
              ".css-uywun8-MuiPaper-root-MuiPopover-paper": {
                borderRadius: "25px",
              },
            }}
            PaperProps={{
              sx: {
                borderRadius: { xs: "15px", sm: "25px" },
              },
            }}
          >
            <div className="w-[300px] sm:w-[423px] sm:py-10 sm:px-[38px] p-5 h-[300px] overflow-y-auto sm:h-[530px] rounded-[25px]">
              {documentPopoverData.map((item) => (
                <div
                  key={item.title}
                  className="flex hover:cursor-pointer  justify-between w-full shadow-popover-shadow p-3 rounded-lg sm:px-5 py-3"
                >
                  <div className="space-y-[14px]">
                    <h2 className="text-[#2B2E35] text-base sm:text-lg">
                      {item.title}
                    </h2>
                    <h3
                      className={`text-[${
                        item.value === "Approved" ? "#34A853" : "#15A9A0"
                      }]`}
                    >
                      {item.value}
                    </h3>
                  </div>
                  <ArrowRightIcon width={30} height={30} />
                </div>
              ))}
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
