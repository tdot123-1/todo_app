import { useEffect, useState } from "react";
import { PaginationLink, Wrapper } from "./Pagination.styles";
import { Link } from "react-router-dom";
import { LIMIT, MAX_PAGINATION_LINKS } from "../../constants";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { theme } from "../../styles";
import { generatePagination } from "../../utils";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
}

const Pagination = ({ totalItems, currentPage }: PaginationProps) => {
  const [totalPages, setTotalPages] = useState(0);
  //   const [pages, setPages] = useState<(number | string)[]>([]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / LIMIT));
  }, [totalItems]);

  // useEffect(() => {
  //   setPages(generatePagination(totalPages, currentPage));
  // }, [currentPage]);

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
      {generatePagination(totalPages, currentPage).map((page, index) => {
        if (typeof page === "string") {
          // calculate where to which page the ellipses should lead based on current page
          let nextPage: number;
          if (currentPage <= MAX_PAGINATION_LINKS) {
            nextPage = index + 1;
          } else if (currentPage > totalPages - MAX_PAGINATION_LINKS) {
            nextPage = totalPages - MAX_PAGINATION_LINKS;
          } else {
            nextPage = currentPage + 2;
          }
          return (
            <Link to={`/tasks?page=${nextPage}`} key={`${page}-${index}`}>
              <PaginationLink $active={false}>{page}</PaginationLink>
            </Link>
          );
        } else {
          return (
            <Link key={`${page}-${index}`} to={`/tasks?page=${page}`}>
              <PaginationLink $active={currentPage === page}>
                {page}
              </PaginationLink>
            </Link>
          );
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
