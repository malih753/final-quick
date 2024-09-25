import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as React from "react";
import Button from "../../../../../Common/Button";
import Input from "../../../../../Common/Input";
import {
  DeleteIcon,
  GreySearchIcon,
  PlusIcon,
} from "../../../../../assets/icons";

export default function LabModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        title="Edit"
        btnClass="py-[6px] px-4 bg-[#15A9A0] text-white rounded-[7.37px] "
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: 458,
            width: { lg: "1000px", xs: "95%" },
            bgcolor: "background.paper",
            padding: { sm: "20px 16px", xs: "16px 10px" },
            borderRadius: { sm: "20px", xs: "15px" },
            overflowY: "hidden",
            "&:hover": {
              overflowY: "scroll",
            },
          }}
        >
          <Input
            label={"Test Package Name"}
            placeholder={"Top Selling"}
            inputClasses="!bg-[#F1F4FA] !w-[341px] !rounded-[10px]"
          />

          <div className="py-6">
            <div className="w-full  min-h-[353px]  mb-6 ">
              <Input
                placeholder={"Search Product"}
                inputClasses="text-sm font-normal pl-14 !bg-[#F1F4FA]"
                iconClasses="left-5 w-2"
                Icon={GreySearchIcon}
              />

              <div className="flex flex-wrap justify-between mt-5 gap-5 lg:gap-0 before:w-[1px] before:absolute before:left-1/2 before:translate-x-[-50%] before:hidden before:lg:block before:top-0 relative  before:h-full before:bg-[#EEEEEE]">
                <div className="w-[600px] overflow-auto lg:w-[48%]">
                  <h1 className="text-[#05004E] font-semibold text-lg">
                    Search Results
                  </h1>
                  <div className="space-y-2.5 mt-3 lg:w-[454px]">
                    {Array(3)
                      .fill(0)
                      .map((item, index) => (
                        <div className="flex items-center  justify-between gap-3">
                          <div className="flex items-center gap-5">
                            <div className="w-[62px] h-[62px]  rounded flex items-center justify-center">
                              <img
                                src={"/lab.png"}
                                alt="image"
                                className=" object-cover w-full h-full rounded-[10px] "
                              />
                            </div>
                            <h6 className="text-sm text-[#06152B] w-[247px]">
                              MuscleBlaze Biozyme Performance Whey, 2 kg (4.4
                              lb), Rich Chocolate
                            </h6>
                          </div>

                          <Button btnClass="bg-[#FB5458] py-[7px] px-2.5 rounded-md text-white">
                            <span>Add</span>
                            <PlusIcon color={"white"} width={15} height={15} />
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="w-[600px] overflow-x-auto lg:w-[48%]">
                  <h1 className="text-[#05004E] font-semibold text-lg">
                    Added Products
                  </h1>
                  <div className="space-y-2.5 mt-3  overflow-x-auto w-[453px]   p-[10px] sm:.p-4 ">
                    {Array(2)
                      .fill(0)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center  justify-between gap-3"
                        >
                          <div className="flex items-center gap-5">
                            <div className="w-[62px] h-[62px]  rounded flex items-center justify-center">
                              <img
                                src={"/lab.png"}
                                alt="image"
                                className=" object-cover w-full h-full rounded-[10px] "
                              />
                            </div>
                            <h6 className="text-sm  text-[#06152B] w-[247px]">
                              MuscleBlaze Biozyme Performance Whey, 2 kg (4.4
                              lb), Rich Chocolate
                            </h6>
                          </div>

                          <Button btnClass="bg-[#FB5458] py-[7px] px-2.5 rounded-md text-white">
                            <DeleteIcon />
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
