import { useSearchParams } from "react-router-dom";
import TasksList from "../components/tasks-list/TasksList";
import { useEffect, useState } from "react";
import { QueryOptions } from "../types";

const AllTasks = () => {
  const [searchParams] = useSearchParams();
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    page: 1,
    order: "asc",
    sort: "updated",
  });

  useEffect(() => {
    const pageQuery = searchParams.get("page");
    const orderQuery = searchParams.get("order");
    const sortQuery = searchParams.get("sort");

    console.log("Current page: ", pageQuery);
    console.log("order: ", orderQuery);
    console.log("sort: ", sortQuery);

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
