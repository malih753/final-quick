import { Box } from "@mui/material";
import { Modal } from "@mui/material";
import Button from "./Button";
import Input from "./Input";
import { GreySearchIcon, UploadIcon } from "../assets/icons";
import { useEffect, useState } from "react";
import { server } from "../Constants/server";
import { tryParseImages } from "../utils/tryParseImages";
import axios from "axios";

export default function EditProductModal({ product }) {
  console.log("product", product);
  const [open, setOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [productData, setProductData] = useState({
    productName: product?.productName,
    sellingPrice: product?.sellingPrice,
    id: product?.id,
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formattedImages = JSON.parse(product?.images);
  console.log("formattedImages", formattedImages);

  const [images, setImages] = useState([]);

  const handleImageChange = (event, index) => {
    if (event.target.files[0]) {
      setImages((prev) => {
        return {
          ...prev,
          [index]: event.target.files[0],
        };
      });
    }
  };

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setImages(tryParseImages(formattedImages));
  }, []);

  const matchedImages = (index) => {
    if (images[index]) {
      return URL.createObjectURL(images[index]);
    } else {
      console.log("server", product?.images);
      return server + JSON.parse(product?.images)[index];
    }
  };

  const uploadImage = async (image) => {
    const newFormData = new FormData();
    newFormData.append("file", image);

    const res = await axios.post(`${server}/upload`, newFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
      },
    });

    return res.data.fileUrl; // Assuming the server returns the URL of the uploaded file
  };

  const handleSubmit = async () => {
    setIsSubmit(true);
    try {
      let imageUrls = [];
      const uploadAllImages = async (images) => {
        try {
          const uploadPromises = images.map((image, index) =>
            uploadImage(image[index])
          );
          imageUrls = await Promise.all(uploadPromises);

          console.log(imageUrls); // Logs all the uploaded file URLs
        } catch (error) {
          console.error("Error uploading images:", error);
        }
      };

      // Call the function with the images array
      if (images.length > 0) {
        await uploadAllImages(images);
      }
      console.log(JSON.parse(product?.images));
      const newData = {
        ...productData,
        images: [...imageUrls, ...JSON.parse(product?.images)],
      };

      console.log("new Data", newData);

      const res = await axios.put(`${server}/product.update`, newData, {
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

  console.log(images);
  console.log("productData", productData);

  return (
    <>
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
            height: 500,
            width: { md: "700px", xs: "95%" },
            bgcolor: "background.paper",
            padding: { sm: "20px 16px", xs: "16px 10px" },
            borderRadius: { sm: "20px", xs: "15px" },
            overflowY: { md: "hidden", xs: "auto" },
            "&:hover": {
              overflowY: "auto",
            },
          }}
        >
          <h2 className="text-lg text-[#222222] font-medium">Edit Product</h2>

          <div className="gap-4 py-4 grid grid-cols-1 sm:grid-cols-2">
            <Input
              label={"Product Name"}
              // placeholder={product?.productName}
              inputClasses="!bg-[#F1F4FA] !w-[341px] !rounded-[10px]"
              value={productData.productName}
              name="productName"
              onChange={handleChange}
            />
            <Input
              label={"Product Price"}
              placeholder={product?.productName}
              inputClasses="!bg-[#F1F4FA] !w-[341px] !rounded-[10px]"
              value={productData.sellingPrice}
              name="sellingPrice"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-wrap items-center mt-4 gap-4">
            {/* <div className="sm:w-[170px] relative w-[100px] h-[100px] sm:h-[150px] bg-[#F1F4FA] rounded-[10px] flex items-center justify-center flex-col gap-2">
              <UploadIcon />
              <p className="text-xs sm:text-sm font-semibold text-[#06152B]">
                Upload Image
              </p>
              <input
                type="file"
                required
                className="opacity-0 absolute left-0 top-0 w-full h-full hover:cursor-pointer"
                onChange={handleImageChange}
              />
            </div> */}
            {/* {images.length > 0 &&
              images.map((image, index) => (
                <div className="sm:w-[170px] w-[80px] h-[80px] sm:h-[150px] bg-[#F1F4FA] relative rounded-[10px] flex items-center justify-center p-[10px]">
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt="image"
                    className="w-full h-full object-cover object-top rounded-[10px]"
                  />
                </div>
              ))} */}
            {Array.isArray(formattedImages) &&
              formattedImages?.map((img, index) => (
                <div className="sm:w-[170px] w-[80px] h-[80px] sm:h-[150px] bg-[#F1F4FA] rounded-[10px] flex relative items-center justify-center p-[10px]">
                  <img
                    key={img}
                    src={matchedImages(index)}
                    alt="image"
                    className="w-full h-full object-cover object-top rounded-[10px]"
                  />
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(e, index)}
                    className="absolute w-full h-full opacity-0"
                  />
                </div>
              ))}
          </div>

          <Button
            title={isSubmit ? "Submitting..." : "Update"}
            btnClass="bg-[#15A9A0] text-white hover:bg-transparent border border-[#15A9A0] duration-300 hover:text-[#15A9A0] mt-8 rounded-[7.37px]"
            disabled={isSubmit}
            onClick={handleSubmit}
          />
        </Box>
      </Modal>
    </>
  );
}
