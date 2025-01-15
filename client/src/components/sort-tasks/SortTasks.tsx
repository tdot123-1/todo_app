import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

interface SortTasksProps {
  sort: "updated" | "deadline" | "priority";
  order: "asc" | "desc";
}

const SortTasks = ({ sort, order }: SortTasksProps) => {
  const orderOptions = ["updated", "deadline", "priority"];
  const [sortBy, setSortBy] = useState(sort);
  const [orderBy, setOrderBy] = useState(order);
  const [_, setSearchParams] = useSearchParams();

//   const navigate = useNavigate();

  const updateParams = (sort: string, order: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sort", sort);
      newParams.set("order", order);
      newParams.set("page", "1");
      return newParams;
    });
  };

  const handleSortChange = (value: string) => {
    if (value === "updated" || value === "deadline" || value === "priority") {
      setSortBy(value);
      //   navigate(`/tasks?page=1&sort=${sortBy}&order=asc`);
      updateParams(value, orderBy);
    }
  };

  //   useEffect(() => {
  //     setSearchParams((prev) => {
  //       const newParams = new URLSearchParams(prev);
  //       newParams.set("sort", sortBy);
  //       newParams.set("order", orderBy);
  //       newParams.set("page", "1");
  //       return newParams;
  //     });
  //   }, [sortBy, orderBy]);

  //   useEffect(() => {
  //     navigate(`/tasks?page=1&sort=${sortBy}&order=${orderBy}`);
  //   }, [sortBy, orderBy]);

  const handleClick = () => {
    setOrderBy((prev) => (prev === "asc" ? "desc" : "asc"));
    const newOrder = order === "asc" ? "desc" : "asc";
    updateParams(sortBy, newOrder);
  };

  return (
    <>
      <div>
        <select
          name="sortBy"
          onChange={(v) => handleSortChange(v.target.value)}
          value={sortBy}
        >
          {orderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button onClick={handleClick}>
          {orderBy === "asc" ? "desc" : "asc"}
        </button>
      </div>
    </>
  );
};

export default SortTasks;
