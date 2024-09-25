import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationOutlined({ OnChange = () => {} }) {
  return (
    <>
      <Stack spacing={2} justifyContent={"center"}>
        <p className="text-[10px] text-black mb-3 text-center">
          Showing 1 to 10 of 45 entries
        </p>
        <Pagination
          count={20}
          siblingCount={1}
          variant="outlined"
          color="primary"
          // onChange={OnChange}
          onClick={OnChange}
        />
      </Stack>
    </>
  );
}
