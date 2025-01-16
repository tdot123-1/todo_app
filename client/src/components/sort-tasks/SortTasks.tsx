import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Label, Select } from "./SortTasks.styles";
import { Button } from "../button/Button";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { theme } from "../../styles";
import { ButtonContent } from "../button/Button.styles";

interface SortTasksProps {
  sort: "updated" | "deadline" | "priority";
  order: "asc" | "desc";
}

const SortTasks = ({ sort, order }: SortTasksProps) => {
  const [sortBy, setSortBy] = useState(sort);
  const [orderBy, setOrderBy] = useState(order);
  const [_, setSearchParams] = useSearchParams();

  const orderOptions = ["updated", "deadline", "priority"];

  // update search params if sorting is applied to trigger refetch of data
  const updateParams = (sort: string, order: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sort", sort);
      newParams.set("order", order);
      newParams.set("page", "1");
      return newParams;
    });
  };

  // check if value is valid, set state, update search params
  const handleSortChange = (value: string) => {
    if (value === "updated" || value === "deadline" || value === "priority") {
      setSortBy(value);
      updateParams(value, orderBy);
    }
  };

  // set state, update search params
  const handleClick = () => {
    setOrderBy((prev) => (prev === "asc" ? "desc" : "asc"));
    const newOrder = order === "asc" ? "desc" : "asc";
    updateParams(sortBy, newOrder);
  };

  // temporary component to test sort function
  return (
    <>
      <div>
        <Label>Sort</Label>
        <Container>
          <Select
            name="sortBy"
            onChange={(v) => handleSortChange(v.target.value)}
            value={sortBy}
          >
            {orderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <Button onClick={handleClick}>
            <ButtonContent>
              {orderBy === "asc" ? (
                <IconChevronDown size={theme.iconSizes.button} />
              ) : (
                <IconChevronUp size={theme.iconSizes.button} />
              )}
              <span>Order</span>
            </ButtonContent>
          </Button>
        </Container>
      </div>
    </>
  );
};

export default SortTasks;
