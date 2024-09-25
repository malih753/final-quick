import React from "react";
import Button from "../../../../Common/Button";
import { useNavigate } from "react-router-dom";

const OrderCompleted = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate("/admin-orders");
    };
  return (
    <div className="h-[400px] sm:h-[500px] flex flex-col items-center justify-center">
      <img src="/complete.png" alt="payment" />

      <h1 className="text-[22px] mt-10 sm:text-[36px] text-[#15A9A0]">
        Order Placed
      </h1>

      <Button
        onClick={handleNavigate}
        title="View all orders"
        btnClass={`mt-10 sm:mt-[93px] bg-[#15A9A0] text-white pt-2.5 pb-[14px] px-[35px] hover:bg-white hover:text-[#15A9A0] hover:border hover:border-[#15A9A0] duration-300 text-sm sm:text-lg`}
      />
    </div>
  );
};

export default OrderCompleted;
