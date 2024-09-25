import { Box, Modal } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { server } from "../Constants/server";
import Button from "./Button";

export default function DeleteProductModal({ productId }) {
  console.log("productId", productId);
  const [open, setOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    setIsSubmit(true);
    try {
     

      const res = await axios.delete(`${server}/product.delete/${productId}`, {
        headers: {
          "X-Authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzI1OTg0MDc3LCJleHAiOjE3NTc1NDE2Nzd9.kaaecHOziQQLnp-TfepV32Y4z9awmXaag9xNIZHbsJc",
        },
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmit(false);
      handleClose();
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        title="Delete"
        btnClass="rounded-[7.37px] font-medium font-poppins bg-[#15A9A0] text-white hover:bg-white hover:text-[#15A9A0] duration-300 py-[7.37px] px-[11.05px]"
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

            // width: { md: "700px", xs: "95%" },
            bgcolor: "background.paper",
            padding: { sm: "20px 16px", xs: "16px 10px" },
            borderRadius: { sm: "20px", xs: "15px" },
            // overflowY: { md: "hidden", xs: "auto" },
            // "&:hover": {
            //   overflowY: "auto",
            // },
          }}
        >
          {/* <h2 className="text-lg text-[#222222] font-medium">Delete Product</h2> */}

          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <button
            onClick={handleClose}
              type="button"
              className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  "
              data-modal-toggle="deleteModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <svg
              className="text-gray-500 w-11 h-11 mb-3.5 mx-auto"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="mb-4 text-gray-500 ">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-center items-center space-x-4">
              <Button
                title={"Cancel"}
                btnClass="bg-[#F1F4FA] text-black  rounded-[7.37px]"
                disabled={isSubmit}
                onClick={handleClose}
              />
              <Button
                title={isSubmit ? "Submitting..." : "Confirm"}
                btnClass="bg-red-600 text-white hover:bg-transparent border border-red-600 duration-300 hover:text-red-600  rounded-[7.37px]"
                disabled={isSubmit}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
