import React, { useEffect, useState } from "react";
import Input from "../../Common/Input";
import Button from "../../Common/Button";
import { server } from "../../Constants/server";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    try {
      const res = await axios.post(`${server}/admin.login`, formData, {
        headers: {
          "X-Authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
        },
      });

      console.log(res);
      enqueueSnackbar(res.data.message || "Login Successful", {
        variant: "success",
      });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message || "Login Failed", {
        variant: "error",
      });
    } finally {
      setLoading(false);
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-screen flex items-center justify-center"
    >

      <div className="w-[400px] space-y-5  bg-white rounded-[20px]  p-5 sm:p-8">
        <img src="/logo.png" alt="" className="w-[130px] mx-auto"/>
        <Input
          placeholder="Email"
          label={"Email"}
          inputClasses="!bg-[#F1F4FA]"
          onChange={handleChange}
          name="email"
          value={formData.email}
        />
        <Input
          placeholder="Password"
          inputClasses="!bg-[#F1F4FA]"
          label={"Password"}
          onChange={handleChange}
          name="password"
          value={formData.password}
          type="password"
        />

        <div className="flex justify-center">
          <Button
            title={loading ? "Submitting..." : "Login"}
            btnClass="bg-[#15A9A0]  rounded-md text-white text-sm hover:bg-white hover:text-[#15A9A0] border hover:border-[#15A9A0] duration-300  px-[30px] py-[10px]"
            disabled={loading}
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default Login;
