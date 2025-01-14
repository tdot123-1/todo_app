import { MAX_PAGINATION_LINKS } from "./constants";

export const convertDate = (timestamp: string) => {
  return new Date(timestamp).toLocaleString;
};

export const generatePagination = (
  totalPages: number,
  currentPage: number
): (number | string)[] => {
  // if 4 or less pages, return total pages as array
  if (totalPages <= MAX_PAGINATION_LINKS) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // current page is in first few pages
  if (currentPage <= MAX_PAGINATION_LINKS) {
    return [
      ...Array.from({ length: MAX_PAGINATION_LINKS }, (_, i) => i + 1),
      "...",
    ];
  }

  // current page is in last few pages
  if (currentPage >= totalPages - MAX_PAGINATION_LINKS + 1) {
    return [
      "...",
      ...Array.from(
        { length: MAX_PAGINATION_LINKS },
        (_, i) => totalPages - MAX_PAGINATION_LINKS + i + 1
      ),
    ];
  }

  // current page is in the middle
  const startPage = currentPage - Math.floor(MAX_PAGINATION_LINKS / 2);
  return [
    ...Array.from({ length: MAX_PAGINATION_LINKS }, (_, i) => startPage + i),
    "...",
  ];
};
