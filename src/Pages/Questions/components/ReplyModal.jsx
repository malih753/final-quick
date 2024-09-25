import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as React from "react";
import Button from "../../../Common/Button";
import Input from "../../../Common/Input";
import { DeleteIcon, GreySearchIcon, PlusIcon } from "../../../assets/icons";
import axios from "axios";
import { server } from "../../../Constants/server";
import { enqueueSnackbar } from "notistack";

export default function ReplyModal({ question }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(question);
  const [reply, setReply] = React.useState("");
  const [isSubmit, setIsSubmit] = React.useState(false);

  const handleSubmit = async () => {
    setIsSubmit(true);
    try {
      const res = await axios.put(
        `${server}/askedQuestion.update`,
        {
          id: question?.id,
          answer: reply,
        },
        {
          headers: {
            "X-Authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzI1OTg0MDc3LCJleHAiOjE3NTc1NDE2Nzd9.kaaecHOziQQLnp-TfepV32Y4z9awmXaag9xNIZHbsJc",
          },
        }
      );
      console.log(res);
      enqueueSnackbar("Reply added successfully", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    } finally {
      setIsSubmit(false);
      setOpen(false);
      setReply("");
    }
  };
  return (
    <div>
      <Button
        btnClass="text-white bg-[#15A9A0] py-3 px-[25px] rounded-full"
        title="Reply"
        onClick={handleOpen}
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
            width: { md: "676px", xs: "95%" },
            bgcolor: "background.paper",
            padding: { sm: "19px 25px", xs: "16px 10px" },
            borderRadius: { sm: "25px", xs: "15px" },
          }}
        >
          <div className="">
            <h2 className="text-xl text-black ">
              Question by{" "}
              <span className="text-[#15A9A0]">{question?.user?.name}</span>
            </h2>
            <Input
              placeholder={"Top Selling"}
              inputClasses="!bg-[#EEEEEE] !py-4 sm:!py-6 !rounded-[10px] mt-3"
              value={question?.question + "?"}
              disabled
            />
          </div>
          <div className="mt-[15px]">
            <label className="text-black text-xl">Reply</label>
            <textarea
              className="w-full h-[169px] bg-[#EEEEEE] p-4 sm:px-8 sm:py-5 rounded-[10px] mt-3 outline-none "
              placeholder="Enter Here"
              onChange={(e) => setReply(e.target.value)}
              value={reply}
            />
          </div>
          <div className="flex justify-end mt-5">
            <Button
              title={isSubmit ? "Submitting..." : "Send Reply"}
              btnClass="py-2.5 px-[25px] bg-[#15A9A0] text-white rounded-full "
              onClick={handleSubmit}
              disabled={isSubmit}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
