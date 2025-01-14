export const convertDate = (timestamp: string) => {
  return new Date(timestamp).toLocaleString;
};

export const generatePagination = (
  totalPages: number,
  currentPage: number
): (number | string)[] => {
  const MAX_LINKS = 4;
  const pages: (number | string)[] = [];

  // if 4 or less pages, return total pages as array
  if (totalPages <= MAX_LINKS) {
    return Array.from({ length: MAX_LINKS }, (_, i) => i + 1);
  }

  if (currentPage <= MAX_LINKS) {
    return [...Array.from({ length: MAX_LINKS }, (_, i) => i + 1), "..."];
  }

  if (currentPage >= totalPages - MAX_LINKS + 1) {
    return [
      "...",
      ...Array.from(
        { length: MAX_LINKS },
        (_, i) => totalPages - MAX_LINKS + i + 1
      ),
    ];
  }

  return pages;
};
