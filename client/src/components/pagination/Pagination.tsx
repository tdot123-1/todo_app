import { useEffect, useState } from "react";
import { PaginationLink, Wrapper } from "./Pagination.styles";
import { Link } from "react-router-dom";
import { LIMIT } from "../../constants";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { theme } from "../../styles";
import { generatePagination } from "../../utils";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
}

const Pagination = ({ totalItems, currentPage }: PaginationProps) => {
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState<(number | string)[]>([]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / LIMIT));
  }, [totalItems]);

  useEffect(() => {
    setPages(generatePagination(totalPages, currentPage));
  });

  return (
    <Wrapper>
      {totalPages >= 1 && (
        <Link
          to={`/tasks?page=${
            currentPage - 1 >= 1 ? currentPage - 1 : currentPage
          }`}
        >
          <PaginationLink $active={false} $disabled={!(currentPage - 1 >= 1)}>
            <IconChevronLeft size={theme.iconSizes.button} />
          </PaginationLink>
        </Link>
      )}
      {/* {Array(totalPages)
        .fill(0)
        .map((_, index) => (
          <Link key={index} to={`/tasks?page=${index + 1}`}>
            <PaginationLink $active={currentPage === index + 1}>
              {index + 1}
            </PaginationLink>
          </Link>
        ))} */}
      {pages.map((page, index) => {
        if (typeof page === "string") {
          return (
            <PaginationLink key={`${page}-${index}`} $active={false}>
              {page}
            </PaginationLink>
          );
        } else {
          <Link key={`${page}-${index}`} to={`/tasks?page=${page}`}>
            <PaginationLink $active={currentPage === page}>
              {page}
            </PaginationLink>
          </Link>;
        }
      })}
      {totalPages >= 1 && (
        <Link
          to={`/tasks?page=${
            currentPage + 1 <= totalPages ? currentPage + 1 : currentPage
          }`}
        >
          <PaginationLink
            $active={false}
            $disabled={!(currentPage + 1 <= totalPages)}
          >
            <IconChevronRight size={theme.iconSizes.button} />
          </PaginationLink>
        </Link>
      )}
    </Wrapper>
  );
};

export default Pagination;
