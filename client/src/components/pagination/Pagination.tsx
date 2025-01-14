import { useEffect, useState } from "react";
import { PaginationLink, Wrapper } from "./Pagination.styles";
import { Link } from "react-router-dom";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
}

const Pagination = ({ totalItems, currentPage }: PaginationProps) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / 6));
  }, [totalItems]);

  return (
    <Wrapper>
      {Array(totalPages)
        .fill(0)
        .map((_, index) => (
          <Link key={index} to={`/tasks?page=${index + 1}`}>
            <PaginationLink>{index + 1}</PaginationLink>
          </Link>
        ))}
    </Wrapper>
  );
};

export default Pagination;
