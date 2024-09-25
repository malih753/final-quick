import React, { useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";

const CustomDatePicker = ({ formData, setFormData ,onSubmit}) => {
  const [values, setValues] = useState([]);

  console.log(values.toLocaleString("en-US"));
  console.log(formData);
  return (
    <Calendar
      value={values}
      minDate={new DateObject()}
      onChange={(setValues) =>
        setFormData({
          ...formData,
          frequency: [setValues.toLocaleString("en-US").split("/").join("-")],
        })
      }
      multiple
      range
    />
  );
};

export default CustomDatePicker;
