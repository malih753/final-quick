import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const DropDown = ({
  items = [""],
  label,
  styles = "",
  isCategory = false,
  onChange,
  selectedItem,
  name = "",
  value = "",
}) => {
  // console.log(selectedItem);
  return (
    <div className={`flex flex-col ${styles}`}>
      {label && (
        <label className={`mb-[6px] font-medium text-[#06152B] block`}>
          {label}
        </label>
      )}
      <FormControl
        sx={{
          bgcolor: "white",
          border: "1px solid #DFEAF2",
          borderRadius: "10px",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none", // Removes the border
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none", // Removes the border when focused
          },
        }}
      >
        <Select
          sx={{
            "& .MuiSelect-select": {
              border: "none", // Removes the internal border
              outline: "none", // Removes the internal outline
            },
            "&:focus .MuiSelect-select": {
              border: "none", // Removes border on focus
              outline: "none", // Removes outline on focus
            },
            ".css-15k6ek6-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
              {
                padding: "15px",
              },
            color: "#06152B",
            ".css-1u6jos5-MuiSvgIcon-root-MuiSelect-icon , .css-r4d5p-MuiSvgIcon-root-MuiSelect-icon":
              {
                color: "#06152B",
              },
          }}
          value={
            isCategory ? selectedItem : items.find((item) => item === value)
          }
          onChange={(e) => {

            const selectedValue = items.find((item) =>
              isCategory
                ? item.name === e.target.value
                : item === e.target.value
            );
            console.log(selectedValue);

            if (isCategory) {
              onChange(selectedValue);
            } else {
              onChange(e);
            }
          }}
          placeholder="Select"
          displayEmpty
          IconComponent={KeyboardArrowDownIcon}
        >
          {items.map((item) => (
            <MenuItem
              key={isCategory ? item.id : item}
              sx={{ fontWeight: "500", color: "#06152B" }}
              value={isCategory ? item.name : item}
            >
              {isCategory ? item.name : item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DropDown;
