import { useEffect, useState } from "react";
import { PaginationLink, Wrapper } from "./Pagination.styles";
import { Link } from "react-router-dom";
import { LIMIT, MAX_PAGINATION_LINKS } from "../../constants";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { theme } from "../../styles";
import { generatePagination } from "../../utils";
import { QueryOptions } from "../../types";

interface PaginationProps {
  totalItems: number;
  queryOptions: QueryOptions;
}

const Pagination = ({ totalItems, queryOptions }: PaginationProps) => {
  const [totalPages, setTotalPages] = useState(0);
  //   const [pages, setPages] = useState<(number | string)[]>([]);

  const { page, order, sort } = queryOptions;

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / LIMIT));
  }, [totalItems]);

  // useEffect(() => {
  //   setPages(generatePagination(totalPages, page));
  // }, [page]);

  return (
    <Wrapper>
      {totalPages >= 1 && (
        <Link
          to={`/tasks?page=${
            page - 1 >= 1 ? page - 1 : page
          }&sort=${sort}&order=${order}`}
        >
          <PaginationLink $active={false} $disabled={!(page - 1 >= 1)}>
            <IconChevronLeft size={theme.iconSizes.button} />
          </PaginationLink>
        </Link>
      )}
      {generatePagination(totalPages, page).map((p, index) => {
        if (typeof p === "string") {
          // calculate to which page the ellipses should lead based on current page
          let nextPage: number;
          if (page <= MAX_PAGINATION_LINKS) {
            nextPage = index + 1;
          } else if (page > totalPages - MAX_PAGINATION_LINKS) {
            nextPage = totalPages - MAX_PAGINATION_LINKS;
          } else {
            nextPage = page + 2;
          }
          return (
            <Link
              to={`/tasks?page=${nextPage}&sort=${sort}&order=${order}`}
              key={`${p}-${index}`}
            >
              <PaginationLink $active={false}>{p}</PaginationLink>
            </Link>
          );
        } else {
          return (
            <Link
              key={`${p}-${index}`}
              to={`/tasks?page=${p}&sort=${sort}&order=${order}`}
            >
              <PaginationLink $active={page === p}>{p}</PaginationLink>
            </Link>
          );
        }
      })}
      {totalPages >= 1 && (
        <Link
          to={`/tasks?page=${
            page + 1 <= totalPages ? page + 1 : page
          }&sort=${sort}&order=${order}`}
        >
          <PaginationLink $active={false} $disabled={!(page + 1 <= totalPages)}>
            <IconChevronRight size={theme.iconSizes.button} />
          </PaginationLink>
        </Link>
      )}
    </Wrapper>
  );
};

export default Pagination;
