import { useSearchParams } from "react-router-dom";
import TasksList from "../components/tasks-list/TasksList";
import { useEffect, useState } from "react";
import { QueryOptions } from "../types";

const AllTasks = () => {
  const [searchParams] = useSearchParams();
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    page: 1,
    order: "desc",
    sort: "updated",
    searchQuery: "",
  });

  // get search params to pass down to components
  useEffect(() => {
    const pageQuery = searchParams.get("page");
    const orderQuery = searchParams.get("order");
    const sortQuery = searchParams.get("sort");
    const searchQuery = searchParams.get("q");

    setQueryOptions((prev) => ({
      ...prev,
      page: pageQuery ? parseInt(pageQuery) : prev.page,
      order:
        orderQuery === "asc" || orderQuery === "desc" ? orderQuery : prev.order,
      sort:
        sortQuery === "updated" ||
        sortQuery === "deadline" ||
        sortQuery === "priority"
          ? sortQuery
          : prev.sort,
      searchQuery: searchQuery || "",
    }));
  }, [searchParams]);

  return (
    <>
      <h1>All Tasks</h1>
      <TasksList queryOptions={queryOptions} />
    </>
  );
};

export default AllTasks;
