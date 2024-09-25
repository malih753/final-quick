import React, { useEffect, useState } from "react";
import Button from "../../Common/Button";
import Input from "../../Common/Input";
import { FilterIcon, GreySearchIcon } from "../../assets/icons";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { server } from "../../Constants/server";
import Spinner from "../../Common/Spinner";
const buttons = ["All Users", "New Users", "Old Users"];
const columns = ["Name", "User ID", "Number", "Joining date"];
const Users = () => {
  const [active, setActive] = useState("");
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleClick = (button) => {
    setActive(button);
  };

  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/user/user-profile/${id}`);
  };

  const { data, isLoading } = useSWR(`${server}/users.get`, fetcher);

  console.log("data", data);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search) {
      const filteredUsers = data?.users.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      });

      console.log("filteredUsers", filteredUsers);
      setFilteredUsers(filteredUsers);
    }
    if (active === "All Users") {
      setFilteredUsers(data?.users);
    } else if (active === "New Users") {
      const filteredUsers = data?.users.filter((user) => {
        console.log(user.joinedAt);
        return (
          new Date(user.joinedAt) >=
          new Date(new Date().setDate(new Date().getDate() - 7))
        );
      });
      setFilteredUsers(filteredUsers);
    } else if (active === "Old Users") {
      const filteredUsers = data?.users.filter((user) => {
        return (
          new Date(user.joinedAt) <=
          new Date(new Date().setDate(new Date().getDate() - 7))
        );
      });
      setFilteredUsers(filteredUsers);
    } else {
      setFilteredUsers(data?.users);
    }
  }, [search, data, active]);

  console.log("filtered Users", filteredUsers);
  return (
    <div className="bg-white bg-opacity-60 min-h-[965px] rounded-[16px] sm:rounded-[31px] sm:p-6 p-[10px]">
      <h3 className="text-lg text-black">All customers (12,345)</h3>

      <div className="flex items-center flex-wrap justify-between gap-4 py-5">
        <div className="flex items-center gap-2 rounded-full bg-[#F3F2F2] px-2 py-[6px]">
          {buttons.map((button) => (
            <Button
              onClick={() => handleClick(button)}
              key={button}
              title={button}
              btnClass={`py-[7px] px-2.5  ${
                active == button ? "bg-[#15A9A0] text-white" : "text-[#8A8A8A]"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-[14px]">
          <Input
            Icon={GreySearchIcon}
            placeholder="Search"
            iconClasses="left-2"
            inputClasses="pl-9 border rounded-[6px] py-[7px] border-[#00000021]"
            onChange={handleSearchChange}
            value={search}
          />
          {/* <Button btnClass="text-black py-[7px] px-[11px] border rounded-[6px] border-[#00000021]">
            <div className="flex items-center gap-2 opacity-30 ">
              <FilterIcon />
              <span className="text-xs font-medium">Filter</span>
            </div>
          </Button> */}
        </div>
      </div>

      <div className="block w-full overflow-x-auto rounded-[14px] bg-white">
        {isLoading ? (
          <div className="w-full h-[500px] flex items-center justify-center">
            <Spinner classes={"w-[50px] h-[50px]"} />
          </div>
        ) : (
          <table className="items-center bg-transparent w-full border-collapse ">
            <thead>
              <tr className="bg-[#15A9A0]">
                {columns.map((c) => (
                  <th
                    key={c}
                    className="px-6 opacity-60 text-white   align-middle   py-3  whitespace-nowrap text-left"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredUsers?.map((user, index) => (
                <tr
                  onClick={() => handleNavigate(user.id)}
                  key={user.id}
                  className={`cursor-pointer ${
                    index % 2 ? "bg-[#F5F4F4]" : ""
                  }`}
                >
                  <td className="border-t-0 px-6 whitespace-nowrap align-middle text-[#15A9A0]   py-5 text-left ">
                    {user.name}
                  </td>
                  <td className="border-t-0 px-6 align-middle whitespace-nowrap text-[#404040]   py-5 text-left ">
                    {user.id}
                  </td>
                  <td className="border-t-0 whitespace-nowrap px-6 align-middle text-[#404040]  underline py-5 text-left ">
                    + {user.phone}
                  </td>
                  <td className="border-t-0 px-6 whitespace-nowrap align-middle text-[#404040]   py-5 text-left flex items-center justify-between">
                    {user.joinedAt}
                    <MoreVertIcon />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex items-center justify-center my-5 gap-3">
        <Pagination
          count={10}
          siblingCount={1}
          variant="outlined"
          color="primary"
          sx={{
            ".MuiPagination-ul li button": {
              color: "#15A9A0",
              border: "1px solid #15A9A0",
            },
            ".MuiPagination-ul li:first-child button, .MuiPagination-ul li:last-child button ":
              {
                border: "1px solid white",
              },
            ".MuiPagination-ul": {
              gap: { xs: "5px", sm: 0 },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Users;
