import Popover from "@mui/material/Popover";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import * as React from "react";
import { PlusIcon } from "../../../assets/icons";
import Button from "../../../Common/Button";
import Input from "../../../Common/Input";
import axios from "axios";
import { server } from "../../../Constants/server";
import { useSnackbar } from "notistack";
import Spinner from "../../../Common/Spinner";
export default function CreateCategory() {
  const { enqueueSnackbar } = useSnackbar();

  const [category, setCategory] = React.useState("");
  const [isSubmit, setIsSubmit] = React.useState(false);
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      const res = await axios.post(
        `${server}/productCategory.add`,
        {
          name: category,
          products: [],
        },
        {
          headers: {
            "X-Authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          },
        }
      );

      console.log(res);
      enqueueSnackbar(res.data.message, { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    } finally {
      setIsSubmit(false);
      setCategory("");
    }
  };
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button
            {...bindTrigger(popupState)}
            btnClass="bg-[#15A9A0] text-white py-[14px] text-xs xs:text-sm  sm:text-lg"
            type="button"
          >
            <PlusIcon color={"#fff"} width={18} height={18} />
            <span>Add Category</span>
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
            <div className="w-full xs:w-[300px] sm:w-[573px] py-4 px-[10px] sm:px-[27px] min-h-[186px] rounded-[25px]">
             <form onSubmit={handleSubmit}>

             <h1 className="text-black text-lg xs:text-[22px] sm:text-[24px]">
                Create new category
              </h1>
              <Input
                placeholder="Add Category Name"
                inputClasses="!bg-[#F4F4F4] !py-4 sm:!py-6 !rounded-[10px] mt-4 mb-[15px]"
                value={category}
                onChange={handleChange}
                required
              />
              <Button
                title={
                  isSubmit ? (
                    <>
                      <Spinner /> Creating...
                    </>
                  ) : (
                    "Create and Save"
                  )
                }
                btnClass="bg-[#15A9A0] text-white py-[10px] px-5 text-xs text-center w-full "
                type="submit"
                disabled={isSubmit}
              />
             </form>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
