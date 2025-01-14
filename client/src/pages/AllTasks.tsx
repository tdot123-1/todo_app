import { useSearchParams } from "react-router-dom";
import TasksList from "../components/tasks-list/TasksList";
import { useEffect, useState } from "react";

const AllTasks = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const pageQuery = searchParams.get("page");
    console.log("Current page: ", pageQuery)
    if (pageQuery) {
      setCurrentPage(parseInt(pageQuery));
    } else {
      setCurrentPage(1); 
    }
  }, [searchParams]);
  
  return (
    <>
      <h1>All Tasks</h1>
      <TasksList page={currentPage} />
    </>
  );
};

export default AllTasks;
