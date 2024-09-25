import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Button from "../../Common/Button";
import Input from "../../Common/Input";
import { server } from "../../Constants/server";
import { FilterIcon, GreySearchIcon } from "../../assets/icons";
import { fetcher } from "../../utils/fetcher";
import ReplyModal from "./components/ReplyModal";
import Spinner from "../../Common/Spinner";

const buttons = ["All", "New", "Old to New"];
const columns = ["Name", "Email", "Question", "Received on"];
const Questions = () => {
  const [active, setActive] = useState("");
  const [search, setSearch] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  // const [isReplyModal, setIsReplyModal] = useState("");

  const handleClick = (button) => {
    setActive(button);
  };

  const { data, isLoading } = useSWR(`${server}/askedQuestion.getAll`, fetcher);

  console.log(data);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = (index) => {
    setIsExpanded(index);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    
    if (active === "All") {
      setFilteredQuestions(data?.askedQuestions);
    } else if (active === "New") {
      const newFilteredQuestions = data?.askedQuestions?.filter((question) => {
        return new Date(question.createdAt) >= new Date();
      });
      setFilteredQuestions(newFilteredQuestions);
    } else if (active === "Old to New") {
      const newFilteredQuestions = data?.askedQuestions?.filter((question) => {
        return new Date(question.createdAt) < new Date();
      });
      setFilteredQuestions(newFilteredQuestions);
    }
    if (search && data) {
      const newFilteredQuestions = data?.askedQuestions?.filter((question) => {
        console.log("question", question);
        console.log(
          "",
          question.user.name.trim().toLowerCase().includes(search.toLowerCase())
        );

        return question.user.name
          .trim()
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      console.log("new filtered questions", newFilteredQuestions);
      setFilteredQuestions(newFilteredQuestions);
    }
    else {
      setFilteredQuestions(data?.askedQuestions);
    }
  }, [search, active]);

  // console.log("filtered Questions", filteredQuestions)
  console.log("search", search);

  return (
    <div className="bg-white bg-opacity-60 min-h-[965px] rounded-[16px] sm:rounded-[31px] sm:p-6 p-[10px]">
      <h3 className="text-lg text-black">Total Questions (12,345)</h3>

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
              <span className="text-xs font-medium">Filters</span>
            </div>
          </Button> */}
        </div>
      </div>

      <div className="block w-full overflow-x-auto rounded-[14px] bg-white">
        {/* <table className="items-center bg-transparent w-full border-collapse ">
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
            {data?.askedQuestions?.slice(0, 5).map((q, index) => (
              <tr key={q.id} className={``}>
                <td className="border-t-0 px-6 whitespace-nowrap align-middle text-[#15A9A0]   py-5 text-left ">
                  {q.user.name}
                </td>
                <td className="border-t-0 px-6 align-middle whitespace-nowrap text-[#404040]   py-5 text-left ">
                  {q.userId}
                </td>
                <td className="border-t-0 whitespace-nowrap px-6 align-middle text-[#404040]   py-5 text-left ">
                  {q.user.email}
                </td>
                <td className="border-t-0 whitespace-nowrap px-6 align-middle text-[#404040]  text-xs py-5 text-left ">
                  {isExpanded === q.id ? (
                    <p>
                      {q.question}{" "}
                      <span
                        onClick={() => handleExpand(q.id)}
                        className="text-[#15A9A0]"
                      >
                        More
                      </span>
                    </p>
                  ) : (
                    q.question.slice(0, 100)
                  )}
                </td>
                <td className="border-t-0 whitespace-nowrap px-6 align-middle text-[#404040] flex items-center justify-between text-xs py-5 text-left ">
                  {new Date(q.createdAt).toLocaleDateString()}
                  <MoreVertIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>  */}

        {isLoading ? (
          <div className="w-full h-[500px] flex items-center justify-center">
            <Spinner classes={"w-[50px] h-[50px]"} />
          </div>
        ) : (
          <table className="items-center bg-transparent w-[800px] md:w-full border-collapse ">
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
              {filteredQuestions?.map((q, index) => (
                <tr key={q.id} className={``}>
                  <td className="border-t-0 px-6 whitespace-nowrap align-middle text-[#15A9A0]   py-5 text-left ">
                    {q.user.name}
                  </td>

                  <td className="border-t-0 whitespace-nowrap px-6 align-middle text-[#404040]   py-5 text-left ">
                    {q.user.email}
                  </td>
                  <td className="border-t-0 whitespace-nowrap px-6 align-middle text-[#404040]  text-xs py-5 text-left ">
                    {isExpanded === q.id ? (
                      <p>
                        {q.question}
                        <span
                          onClick={() => handleExpand(q.id)}
                          className="text-[#15A9A0]"
                        >
                          More
                        </span>
                      </p>
                    ) : (
                      q.question.slice(0, 100)
                    )}
                  </td>
                  <td className="border-t-0 whitespace-nowrap px-6 align-middle text-[#404040] flex items-center justify-between text-xs py-5 text-left ">
                    <div>
                      <h6 className="text-[#15A9A0] mb-1">
                        {new Date(q.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </h6>

                      <span>{new Date(q.createdAt).toLocaleDateString()}</span>
                    </div>

                    <ReplyModal question={q} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex items-center flex-col justify-center my-5 gap-3">
        <p className=" text-[9.22px] text-black">
          Showing 1 to 10 of 10 entries
        </p>
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

export default Questions;
