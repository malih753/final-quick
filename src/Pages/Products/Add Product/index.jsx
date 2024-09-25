import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import React, { useState } from "react";
import ReactDropdown from "react-dropdown";
import useSWR from "swr";
import {
  CheckCircleIcon,
  DeleteIcon,
  GreySearchIcon,
  PlusIcon,
  UploadIcon,
} from "../../../assets/icons";
import Button from "../../../Common/Button";
import Input from "../../../Common/Input";
import { server } from "../../../Constants/server";
import { fetcher } from "../../../utils/fetcher";
import SubstituteProduct from "./components/SubstituteProduct";
import Spinner from "../../../Common/Spinner";
import { enqueueSnackbar } from "notistack";

const AddProduct = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    mrp: "",
    sellingPrice: "",
    brand: "",
    productForm: "",
    uses: "",
    age: "Any",
    categoryId: "",
    category: "",
    manufacturer: "",
    consumeType: "",
    expireDate: "",
    packagingDetails: "",
    isPrescriptionRequired: false,
    variants: [
      {
        units: "",
        mrp: "",
        sellingPrice: "",
        stock: "",
      },
      {
        units: "",
        mrp: "",
        sellingPrice: "",
        stock: "",
      },
    ],
    expertAdvice: {
      avatar: "",
      doctorName: "",
      designation: "",
      advice: "",
    },
    composition: "",
    productIntroduction: "",
    usesOfMedication: "",
    benefits: "",
    contradictions: "",
    expertAdvice: {
      avatar: "",
      doctorName: "",
      designation: "",
      advice: "",
    },
    substituteProducts: [],
  });
  const [searchSubstitue, setSearchSubstitue] = useState("");
  const [substitueProducts, setSubstitueProducts] = useState([]);

  const [images, setImages] = useState([]);
  const [expertAdviceImage, setExpertAdviceImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImages([...images, e.target.files[0]]);
    }
  };
  const handleVariantChange = (index, field, value) => {
    const newVariants = formData.variants.map((variant, i) =>
      i === index ? { ...variant, [field]: value } : variant
    );
    setFormData({ ...formData, variants: newVariants });
  };

  const addMoreVariants = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        { units: "", mrp: "", sellingPrice: "", stock: "" },
      ],
    });
  };

  const handlePercriptionRequired = () => {
    setFormData({
      ...formData,
      isPrescriptionRequired: !formData.isPrescriptionRequired,
    });
  };

  const handleExpertAdviceImageChange = (e) => {
    if (e.target.files[0]) {
      setExpertAdviceImage(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    const name = e?.target?.name;
    const value = e?.target?.value;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);
  // console.log("expertAdviceImage", expertAdviceImage);

  const { data } = useSWR(`${server}/productCategory.get`, fetcher);

  console.log(data);

  const { data: searchProducts, isLoading: isSearchLoading } = useSWR(
    `${server}/product.get?sortBy=1&productName=${
      searchSubstitue && searchSubstitue
    }`,
    fetcher
  );

  console.log("substituteProducts", searchProducts);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      let imageUrls = [];
      const uploadAllImages = async (images) => {
        try {
          const uploadPromises = images.map((image) => uploadImage(image));
          imageUrls = await Promise.all(uploadPromises);

          console.log(imageUrls); // Logs all the uploaded file URLs
        } catch (error) {
          console.error("Error uploading images:", error);
        }
      };

      // Call the function with the images array
      await uploadAllImages(images);

      const expertAdviceImageUrl = await uploadImage(expertAdviceImage);
      console.log(expertAdviceImageUrl);

      const newData = {
        ...formData,
        images: imageUrls,
        expertAdvice: {
          ...formData.expertAdvice,
          avatar: expertAdviceImageUrl,
        },
      };

      console.log("new Data", newData);
      const res = await axios.post(
        `${server}/product.add`,
        // {
        //   ...newData,
        //   images: imageUrls,
        //   expertAdvice: {
        //     ...formData.expertAdvice,
        //     avatar: expertAdviceImageUrl,
        //   },
        // },
        newData,
        {
          headers: {
            "X-Authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            Authorization:
              localStorage.getItem("token") ||
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzI1OTg0MDc3LCJleHAiOjE3NTc1NDE2Nzd9.kaaecHOziQQLnp-TfepV32Y4z9awmXaag9xNIZHbsJc",
          },
        }
      );
      console.log(res);
      enqueueSnackbar("Product Added Successfully", {
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    } finally {
      setIsSubmit(false);
      setFormData({
        productName: "",
        mrp: "",
        sellingPrice: "",
        brand: "",
        productForm: "",
        uses: "",
        age: "Any",
        categoryId: "",
        category: "",
        manufacturer: "",
        consumeType: "",
        expireDate: "",
        packagingDetails: "",
        isPrescriptionRequired: false,
        images: [],
        variants: [
          {
            units: "",
            mrp: "",
            sellingPrice: "",
            stock: "",
          },
          {
            units: "",
            mrp: "",
            sellingPrice: "",
            stock: "",
          },
        ],
        expertAdvice: {
          avatar: "",
          doctorName: "",
          designation: "",
          advice: "",
        },
        composition: "",
        productIntroduction: "",
        usesOfMedication: "",
        benefits: "",
        contradictions: "",
        expertAdvice: {
          avatar: "",
          doctorName: "",
          designation: "",
          advice: "",
        },
        substituteProducts: [],
      });

      setImages([]);
      setExpertAdviceImage(null);
      setSubstitueProducts([]);
    }
  };

  const handleAddSubstituteProduct = (product) => {
    console.log(product);
    setSubstitueProducts([...substitueProducts, product]);
    setFormData({
      ...formData,
      substituteProducts: [...formData.substituteProducts, product.id],
    });
  };

  const handleRemoveSubstituteProduct = (id) => {
    setSubstitueProducts(substitueProducts.filter((p) => p.id !== id));
    setFormData({
      ...formData,
      substituteProducts: substitueProducts.filter((p) => p.id !== id),
    });
  };

  const handleSearchSubstituteProduct = (e) => {
    setSearchSubstitue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="select-none">
      <div className="py-6 border-b border-b-[#CACACA]">
        <h1 className="text-[#05004E] font-semibold text-lg">Basic Details</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 mt-4 gap-4">
          <Input
            required
            onChange={handleChange}
            value={formData.productName}
            name={"productName"}
            label={"Product Name"}
            placeholder={"Vitamin c tablets"}
          />
          <Input
            label={"MRP"}
            placeholder={"₹ 600"}
            onChange={handleChange}
            value={formData.mrp}
            name={"mrp"}
            type="number"
            required
          />
          <Input
            label={"Selling Price"}
            placeholder={"₹ 400"}
            onChange={handleChange}
            value={formData.sellingPrice}
            name={"sellingPrice"}
            type="number"
            required
          />
          <Input
            required
            label={"Brand"}
            placeholder={"Abcd"}
            onChange={handleChange}
            value={formData.brand}
            name={"brand"}
          />
          <Input
            label={"Product form"}
            placeholder={"Tablet"}
            onChange={handleChange}
            value={formData.productForm}
            name={"productForm"}
            required
          />
          <Input
            label={"Uses"}
            required
            placeholder={"Immunity Booster"}
            onChange={handleChange}
            value={formData.uses}
            name={"uses"}
          />
          <Input
            label={"Age"}
            placeholder={"All"}
            onChange={handleChange}
            value={formData.age}
            name="age"
            required
          />
          <div>
            <label className="mb-[6px]  font-medium text-[#06152B] block">
              Product Category
            </label>
            <ReactDropdown
              options={data?.categories?.map((c) => ({
                label: c.name,
                value: c.id,
              }))}
              arrowClosed={<KeyboardArrowDownIcon />}
              arrowOpen={<KeyboardArrowDownIcon />}
              onChange={(e) => {
                console.log(e);
                setFormData({
                  ...formData,
                  category: e.label,
                  categoryId: e.value,
                });
              }}
              controlClassName="bg-white rounded-[10px] p-[14px]  text-[#06152B] placeholder-[#B8B8B8] "
              menuClassName="bg-white mt-3 h-[200px] overflow-y-scroll rounded-[6px] p-4 text-[#06152B]"
            />
          </div>
        </div>
      </div>
      <div className="py-6 border-b border-b-[#CACACA]">
        <h1 className="text-[#05004E] font-semibold text-lg">Other Details</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 mt-4 gap-4">
          <Input
            label={"Manufacturer/Marketer"}
            placeholder={"Cipla"}
            onChange={handleChange}
            value={formData.manufacturer}
            name={"manufacturer"}
            required
          />
          <Input
            required
            label={"Consume Type"}
            placeholder={"Oral"}
            onChange={handleChange}
            value={formData.consumeType}
            name={"consumeType"}
          />
          <Input
            label={"Expiry Date"}
            placeholder={"April - 2026"}
            onChange={handleChange}
            value={formData.expireDate}
            name={"expireDate"}
            required
          />
          <Input
            required
            label={"Packaging details"}
            placeholder={"10 capsules in a stripe"}
            onChange={handleChange}
            value={formData.packagingDetails}
            name={"packagingDetails"}
          />
        </div>
      </div>
      <div className="py-6 border-b border-b-[#CACACA]">
        <h1 className="text-[#05004E] font-semibold text-lg">Product Images</h1>

        <div className="flex flex-wrap items-center mt-4 gap-4">
          <div className="sm:w-[170px] relative w-[100px] h-[100px] sm:h-[150px] bg-white rounded-[10px] flex items-center justify-center flex-col gap-2">
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
          </div>
          {images.length > 0 &&
            images.map((image, index) => (
              <div className="sm:w-[170px] w-[80px] h-[80px] sm:h-[150px] bg-white rounded-[10px] flex items-center justify-center p-[10px]">
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt="image"
                  className="w-full h-full object-contain "
                />
              </div>
            ))}
        </div>
      </div>
      <div className="py-6 border-b border-b-[#CACACA]">
        <h1 className="text-[#05004E] font-semibold text-lg">Variants</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 mt-4 gap-4">
          {formData.variants.map((variant, index) => (
            <>
              <Input
                required
                label={"Units"}
                placeholder={"e.g. 30 tablets"}
                value={variant.units}
                onChange={(e) =>
                  handleVariantChange(index, "units", e.target.value)
                }
              />
              <Input
                required
                label={"MRP"}
                placeholder={"e.g. 999.99"}
                value={variant.mrp}
                onChange={(e) =>
                  handleVariantChange(index, "mrp", e.target.value)
                }
              />
              <Input
                required
                label={"Selling Price"}
                placeholder={"e.g. 399.99"}
                value={variant.sellingPrice}
                onChange={(e) =>
                  handleVariantChange(index, "sellingPrice", e.target.value)
                }
              />
            </>
          ))}
        </div>
        <div
          onClick={addMoreVariants}
          className="mt-5 flex justify-center sm:justify-end"
        >
          <Button
            type="button"
            btnClass="rounded-[10px] bg-[#15A8A0] text-white w-full sm:w-fit sm:px-[95px] py-[15px] "
          >
            <span className="opacity-70">Add More Variant</span>
            <span className="opacity-70">
              <PlusIcon width={16} height={16} color={"white"} />
            </span>
          </Button>
        </div>
      </div>
      <div className="py-6 border-b border-b-[#CACACA]">
        <h1 className="text-[#05004E] font-semibold text-lg">Stocks</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 mt-4 gap-4">
          <div>
            <label className="mb-[6px]  font-medium text-[#06152B] block">
              30 tablets stocks
            </label>
            <ReactDropdown
              options={["Available", "Out of Stock"]}
              arrowClosed={<KeyboardArrowDownIcon />}
              arrowOpen={<KeyboardArrowDownIcon />}
              controlClassName="bg-white rounded-[10px] p-[14px]  text-[#06152B] placeholder-[#B8B8B8] "
              menuClassName="bg-white mt-3 min-h-[50px] overflow-y-auto rounded-[6px] p-4 text-[#06152B]"
            />
          </div>
          <div>
            <label className="mb-[6px]  font-medium text-[#06152B] block">
              60 tablets stocks
            </label>
            <ReactDropdown
              options={["Available", "Out of Stock"]}
              arrowClosed={<KeyboardArrowDownIcon />}
              arrowOpen={<KeyboardArrowDownIcon />}
              controlClassName="bg-white rounded-[10px] p-[14px]  text-[#06152B] placeholder-[#B8B8B8] "
              menuClassName="bg-white mt-3 min-h-[50px] overflow-y-auto rounded-[6px] p-4 text-[#06152B]"
            />
          </div>
        </div>
      </div>
      <div className="py-6 border-b border-b-[#CACACA]">
        <h1 className="text-[#05004E] font-semibold text-lg">Composition</h1>
        <textarea
          className="mt-5 w-full p-4 rounded-[10px] bg-white text-[#06152B] h-[110px] font-medium outline-none placeholder:text-[#06152B]"
          placeholder="Enter here"
          onChange={handleChange}
          required
          value={formData.composition}
          name={"composition"}
        ></textarea>
      </div>
      <div className="py-6 border-b border-b-[#CACACA]">
        <h1 className="text-[#05004E] font-semibold text-lg">
          Product Introduction
        </h1>
        <textarea
          className="mt-5 w-full p-4 rounded-[10px] bg-white text-[#06152B] h-[110px] font-medium outline-none placeholder:text-[#06152B]"
          placeholder="Enter here"
          onChange={handleChange}
          value={formData.productIntroduction}
          name={"productIntroduction"}
          required
        ></textarea>
      </div>
      <div className="py-6 border-b border-b-[#CACACA]">
        <h1 className="text-[#05004E] font-semibold text-lg">
          {" "}
          Uses of Medication
        </h1>
        <textarea
          className="mt-5 w-full p-4 rounded-[10px] bg-white text-[#06152B] h-[110px] font-medium outline-none placeholder:text-[#06152B]"
          placeholder="Enter here"
          onChange={handleChange}
          value={formData.usesOfMedication}
          name={"usesOfMedication"}
        ></textarea>
      </div>
      <div className="py-6 border-b border-b-[#CACACA]">
        <h1 className="text-[#05004E] font-semibold text-lg"> Benefits</h1>
        <textarea
          className="mt-5 w-full p-4 rounded-[10px] bg-white text-[#06152B] h-[110px] font-medium outline-none placeholder:text-[#06152B]"
          placeholder="Enter here"
          onChange={handleChange}
          value={formData.benefits}
          name={"benefits"}
          required
        ></textarea>
      </div>
      <div className="py-6 border-b border-b-[#CACACA]">
        <h1 className="text-[#05004E] font-semibold text-lg">Contradictions</h1>
        <textarea
          className="mt-5 w-full p-4 rounded-[10px] bg-white text-[#06152B] h-[110px] font-medium outline-none placeholder:text-[#06152B]"
          placeholder="Enter here"
          onChange={handleChange}
          value={formData.contradictions}
          name={"contradictions"}
          required
        ></textarea>
      </div>
      <div className="py-6 border-b border-b-[#CACACA]">
        <h1 className="text-[#05004E] font-semibold text-lg">
          Prescription required or not
        </h1>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-0 xs:gap-4">
          <div
            onClick={handlePercriptionRequired}
            className={`mt-5 w-full p-4 rounded-[10px] bg-white text-[#06152B] font-medium flex items-center justify-between cursor-pointer ${
              !formData.isPrescriptionRequired ? "opacity-50" : ""
            }`}
          >
            Required
            <CheckCircleIcon
              color={!formData.isPrescriptionRequired ? "#06152B" : "#15A8A0"}
            />
          </div>
          <div
            onClick={handlePercriptionRequired}
            className={`mt-5 w-full p-4 rounded-[10px] bg-white text-[#06152B] font-medium flex items-center justify-between cursor-pointer ${
              formData.isPrescriptionRequired ? "opacity-50" : ""
            }`}
          >
            Not Required
            <CheckCircleIcon
              color={formData.isPrescriptionRequired ? "#06152B" : "#15A8A0"}
            />
          </div>
        </div>
      </div>
      <div className="py-6 border-b border-b-[#CACACA]">
        <h1 className="text-[#05004E] font-semibold text-lg"> Expert Advice</h1>

        <div className="flex flex-wrap items-center mt-4 gap-4">
          <div className="w-[127px] relative h-[127px] bg-white rounded-[10px] flex p-2 items-center justify-center flex-col gap-2">
            {expertAdviceImage ? (
              <img
                src={URL.createObjectURL(expertAdviceImage)}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <UploadIcon />
                <p className="text-[11px] w-[90%] text-center font-semibold text-[#06152B]">
                  {" "}
                  Upload Profile picture
                </p>
              </>
            )}
            <input
              type="file"
              className="opacity-0 absolute left-0 top-0 w-full h-full hover:cursor-pointer"
              onChange={handleExpertAdviceImageChange}
              required
            />
          </div>

          <Input
            label="Doctor name"
            required
            classes="w-[341px]"
            placeholder={"Dr. Russ Mehta Chibber"}
            value={formData.expertAdvice.doctorName}
            onChange={(e) =>
              setFormData({
                ...formData,
                expertAdvice: {
                  ...formData.expertAdvice,
                  doctorName: e.target.value,
                },
              })
            }
          />
          <Input
            required
            label="Designation"
            placeholder={"BDS"}
            classes="w-[341px]"
            onChange={(e) =>
              setFormData({
                ...formData,
                expertAdvice: {
                  ...formData.expertAdvice,
                  designation: e.target.value,
                },
              })
            }
            value={formData.expertAdvice.designation}
          />
        </div>
        <textarea
          className="mt-5 w-full p-4 rounded-[10px] bg-white text-[#06152B] h-[110px] font-medium outline-none placeholder:text-[#06152B]"
          placeholder="Advice"
          required
          onChange={(e) => {
            setFormData({
              ...formData,
              expertAdvice: {
                ...formData.expertAdvice,
                advice: e.target.value,
              },
            });
          }}
          value={formData.expertAdvice.advice}
        ></textarea>
      </div>
      <div className="py-6 border-b border-b-[#CACACA]">
        <h1 className="text-[#05004E] font-semibold text-lg">
          Substitute Products
        </h1>

        <div className="rounded-[20px]  w-full bg-white min-h-[353px] mt-5 mb-6 p-[10px] sm:p-4">
          <Input
            placeholder={"Search Product"}
            inputClasses="text-sm font-normal pl-14 !bg-[#F1F4FA]"
            iconClasses="left-5 w-2"
            Icon={GreySearchIcon}
            value={searchSubstitue}
            onChange={handleSearchSubstituteProduct}
          />

          <div className="flex flex-wrap justify-between mt-5 gap-5 lg:gap-0 before:w-[1px] before:absolute before:left-1/2 before:translate-x-[-50%] before:hidden before:lg:block before:top-0 relative  before:h-full before:bg-[#EEEEEE]">
            <div className="w-[600px] lg:overflow-hidden lg:hover:overflow-auto overflow-auto h-[300px] lg:w-[48%]">
              <h1 className="text-[#05004E] font-semibold text-lg">
                Search Results
              </h1>
              <div className="space-y-2.5 mt-3 lg:w-[454px]">
                {isSearchLoading ? (
                  <div className="w-full h-[200px] flex items-center justify-center">
                    <Spinner classes={"!w-10 !h-10"} />
                  </div>
                ) : (
                  searchProducts?.products?.map((product) => (
                    <SubstituteProduct
                      product={product}
                      key={product.id}
                      handleClick={handleAddSubstituteProduct}
                    />
                  ))
                )}
              </div>
            </div>

            <div className="w-[600px] lg:overflow-hidden lg:hover:overflow-auto overflow-auto h-[300px]  lg:w-[48%]">
              <h1 className="text-[#05004E] font-semibold text-lg">
                Added Products
              </h1>

              {substitueProducts?.map((product) => (
                <div className="space-y-4 mt-3 bg-[#F1F4FA] overflow-x-auto w-[453px]  rounded-[10px] p-[10px] sm:.p-4 ">
                  <SubstituteProduct
                    key={product.id}
                    handleClick={handleRemoveSubstituteProduct}
                    isAdded={true}
                    product={product}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          btnClass="w-full rounded-[10px] py-[14px] text-sm sm:text-lg font-bold text-center text-opacity-70 text-white bg-[#15A9A0] "
          title={isSubmit ? "Submitting..." : "Upload"}
          type="submit"
          disabled={isSubmit}
        />
      </div>
    </form>
  );
};

export default AddProduct;
