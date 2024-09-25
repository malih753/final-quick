import React, { useState } from "react";
import {
  CameraIcon,
  DeleteIcon,
  GreySearchIcon,
  PlusIcon,
} from "../../../assets/icons";
import Input from "../../../Common/Input";
import Button from "../../../Common/Button";
import { server } from "../../../Constants/server";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const AddLabTest = () => {
  const [isSubmit, setIsSubmit] = useState(false);

  const [formData, setFormData] = useState({
    bannerImage: "",
    coverImage: "",
    testName: "",
    description: "",
    mrp: "",
    sellingPrice: "",
    preparations: "",
    sampleRequired: "",
    recommendedFor: "",
    others: [
      {
        heading: "",
        body: "",
      },
    ],
    containsMultipleTest: [], //Lab Test's IDs
    faq: [
      {
        question: "",
        answer: "",
      },
    ],
  });
  const [faqs, setFaqs] = useState([
    {
      question: "",
      answer: "",
    },
  ]);

  const [images, setImages] = useState({
    bannerImage: null,
    coverImage: null,
  });

  const handleAddFAQ = () => {
    setFaqs([
      ...faqs,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImages({ ...images, [e.target.name]: e.target.files[0] });
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFAQChange = (index, field, value) => {
    const newFaqs = faqs.map((faq, i) =>
      i === index ? { ...faq, [field]: value } : faq
    );
    setFaqs(newFaqs);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      let cover, banner;
      if (images.coverImage) {
        const formData = new FormData();
        formData.append("file", images.coverImage);
        const res = await axios.post(`${server}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzI1OTg0MDc3LCJleHAiOjE3NTc1NDE2Nzd9.kaaecHOziQQLnp-TfepV32Y4z9awmXaag9xNIZHbsJc",
          },
        });

        cover = res.data.fileUrl;
        console.log(cover);
      }

      if (images.bannerImage) {
        const formData = new FormData();
        formData.append("file", images.bannerImage);
        const res = await axios.post(`${server}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzI1OTg0MDc3LCJleHAiOjE3NTc1NDE2Nzd9.kaaecHOziQQLnp-TfepV32Y4z9awmXaag9xNIZHbsJc",
          },
        });

        banner = res.data.fileUrl;
        console.log(banner);
      }

      console.log({ ...formData, bannerImage: banner, coverImage: cover });

      const newData = { ...formData, bannerImage: banner, coverImage: cover };
      const res = await axios.post(`${server}/labTest.add`, newData, {
        headers: {
          "X-Authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzI1OTg0MDc3LCJleHAiOjE3NTc1NDE2Nzd9.kaaecHOziQQLnp-TfepV32Y4z9awmXaag9xNIZHbsJc",
        },
      });
      console.log(res);
      enqueueSnackbar("Lab Test Added Successfully", {
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message || "Something went wrong", {
        variant: "error",
      });
    } finally {
      setIsSubmit(false);
      setFormData({
        bannerImage: "",
        coverImage: "",
        testName: "",
        description: "",
        mrp: "",
        sellingPrice: "",
        preparations: "",
        sampleRequired: "",
        recommendedFor: "",
        others: [
          {
            heading: "",
            body: "",
          },
        ],
        containsMultipleTest: [], //Lab Test's IDs
        faq: [
          {
            question: "",
            answer: "",
          },
        ],
      });
      setImages({
        bannerImage: "",
        coverImage: "",
      });
      setFaqs([
        {
          question: "",
          answer: "",
        },
      ]);
    }
  };
  return (
    <form className="mb-5 pb-5" onSubmit={handleSubmit}>
      <div>
        <h1 className="text-[#05004E] font-semibold text-lg mb-5">
          Basic Details
        </h1>
        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
          <div className="w-[507px] h-[168px] bg-white rounded-[7.42px] flex items-center justify-center flex-col relative">
            {images.bannerImage ? (
              <img
                src={URL.createObjectURL(images.bannerImage)}
                alt="banner"
                className="w-full h-full object-cover rounded-[7.42px]"
              />
            ) : (
              <>
                <CameraIcon />
                <h4 className="text-[#515B6B] font-medium font-poppins mt-2">
                  Upload image
                </h4>
                <p className="text-[#515B6B] mt-[6px] text-xs font-poppins font-normal">
                  900×306
                </p>
              </>
            )}
            <input
              required
              type="file"
              className="absolute opacity-0 w-full h-full hover:cursor-pointer"
              name="bannerImage"
              onChange={handleImageChange}
            />
          </div>
          <div className="w-[168px] h-[168px] bg-white rounded-[7.42px] flex items-center justify-center flex-col relative">
            {images.coverImage ? (
              <img
                src={URL.createObjectURL(images.coverImage)}
                alt="cover"
                className="w-full h-full object-cover rounded-[7.42px]"
              />
            ) : (
              <>
                {" "}
                <CameraIcon />
                <h4 className="text-[#515B6B] font-medium font-poppins mt-2">
                  Upload image
                </h4>
                <p className="text-[#515B6B] mt-[6px] text-xs font-poppins font-normal">
                  430×430
                </p>
              </>
            )}
            <input
              type="file"
              className="absolute opacity-0 w-full h-full hover:cursor-pointer"
              name="coverImage"
              required
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>
      <div className="space-y-5 mt-5">
        <Input
          label={"Test Name"}
          value={formData.testName}
          onChange={handleChange}
          required
          name="testName"
        />

        <div className=" w-full gap-4 flex sm:flex-row flex-col">
          <div className="w-full  sm:w-[520px]">
            <h1 className="text-[#06152B] font-medium">Notification Content</h1>
            <textarea
              name="description"
              onChange={handleChange}
              required
              value={formData.description}
              className="mt-[6px]  py-2.5 w-full px-[14px] rounded-[10px] bg-white text-[#06152B] h-[140px]  font-medium  outline-none placeholder:text-[#B8B8B8]"
              placeholder="Enter here"
            ></textarea>
          </div>
          <div className="w-full space-y-2   sm:w-[341px]">
            <Input
              label={"MRP"}
              value={formData.mrp}
              required
              name="mrp"
              onChange={handleChange}
            />
            <Input
              label={"Selling Price"}
              value={formData.sellingPrice}
              required
              name="sellingPrice"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-[#06152B] font-medium">Preparations</h1>
          <textarea
            name="preparations"
            onChange={handleChange}
            required
            value={formData.preparations}
            className="mt-[6px]  py-2.5 w-full px-[14px] rounded-[10px] bg-white text-[#06152B] h-[274px]  font-medium  outline-none placeholder:text-[#B8B8B8]"
            placeholder="Enter here"
          ></textarea>
        </div>
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <Input
            label={"Sample Required"}
            value={formData.sampleRequired}
            onChange={handleChange}
            name="sampleRequired"
            required
          />
          <Input
            label={"Recommended for"}
            value={formData.recommendedFor}
            onChange={handleChange}
            name="recommendedFor"
            required
          />
        </div>

        {Array(2)
          .fill(0)
          .map((_, index) => (
            <div className="pt-5 border-t border-t-[#CACACA] space-y-5">
              <Input
                label={"Heading"}
                value={formData.others[index]?.heading}
                onChange={(e) => {
                  const newHeadings = [...formData.others];
                  newHeadings[index].heading = e.target.value;
                  setFormData({ ...formData, others: newHeadings });
                }}
                required
                name="heading"
              />
              <div className="w-full">
                <h1 className="text-[#06152B] font-medium">Body text</h1>
                <textarea
                  className="mt-[6px]  py-2.5 w-full px-[14px] rounded-[10px] bg-white text-[#858C97] h-[350px]  font-medium  outline-none placeholder:text-[#B8B8B8]"
                  placeholder="Enter here"
                  onChange={(e) => {
                    const newHeadings = [...formData.others];
                    newHeadings[index].body = e.target.value;
                    setFormData({ ...formData, others: newHeadings });
                  }}
                  value={formData.others[index]?.body}
                  name={"body"}
                  required
                ></textarea>
              </div>
            </div>
          ))}

        <div>
          <div
            className="flex items-center gap-2
         "
          >
            <span className="inline-block w-4 h-4 rounded bg-[#15A9A0]"></span>
            <h4 className="text-lg text-[#05004E] font-semibold">
              Contains multiple test
            </h4>
          </div>

          <div className="pt-5">
            <div className="w-full bg-white rounded-[15px] sm:rounded-[20px] p-[10px] sm:p-4 min-h-[353px]  mb-6 ">
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

                          <Button
                            type="button"
                            btnClass="bg-[#FB5458] py-[7px] px-2.5 rounded-md text-white"
                          >
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

                          <Button
                            type="button"
                            btnClass="bg-[#FB5458] py-[7px] px-2.5 rounded-md text-white"
                          >
                            <DeleteIcon />
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {Array(1)
          .fill(0)
          .map((_, index) => (
            <div className="pt-5 border-t border-t-[#CACACA] space-y-5">
              <Input label={"Heading"} value="" />
              <div className="w-full">
                <h1 className="text-[#06152B] font-medium">Body text</h1>
                <textarea
                  className="mt-[6px]  py-2.5 w-full px-[14px] rounded-[10px] bg-white text-[#858C97] h-[350px]  font-medium  outline-none placeholder:text-[#B8B8B8]"
                  placeholder="Enter here"
                ></textarea>
              </div>
            </div>
          ))}

        <div className="border-t border-t-[#CACACA] pt-5">
          <h2 className="text-[#05004E] font-semibold text-lg mb-5">FAQ</h2>

          <div className="bg-white w-full rounded-[10px] px-[10px] sm:px-5 space-y-5 py-4 mb-[18px]">
            {faqs.map((item, index) => (
              <>
                <Input
                  label={"Question"}
                  inputClasses="!bg-[#F1F4FA]"
                  required
                  value={item.question}
                  onChange={(e) =>
                    handleFAQChange(index, "question", e.target.value)
                  }
                  placeholder={
                    "Why is a Comprehensive Gold Full Body Checkup with Smart Report needed?"
                  }
                />
                <Input
                  required
                  value={item.answer}
                  onChange={(e) =>
                    handleFAQChange(index, "answer", e.target.value)
                  }
                  label={"Answer"}
                  inputClasses="!bg-[#F1F4FA]"
                  placeholder={"- Make you aware of overall health status"}
                />
              </>
            ))}
          </div>
          <Button
            type="button"
            btnClass="rounded-[10px] text-black w-[215px] py-[18px] font-poppins font-normal text-sm"
            onClick={handleAddFAQ}
          >
            <PlusIcon color={"black"} width={15} height={15} />
            <span>Add More</span>
          </Button>
        </div>
        <Button
          btnClass="w-full rounded-[10px] mt-8 text-black py-[14px] text-sm sm:text-lg font-bold text-center bg-[#15A9A0] "
          title={isSubmit ? "Saving..." : "Save and upload"}
          type="submit"
          disabled={isSubmit}
        />
      </div>
    </form>
  );
};

export default AddLabTest;
