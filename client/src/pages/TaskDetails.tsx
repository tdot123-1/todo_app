import { useParams } from "react-router-dom";
import TaskDetailsComp from "../components/task-details/TaskDetailsComp";
import NotFoundComp from "../components/not-found/NotFoundComp";

const TaskDetails = () => {
  const { taskId } = useParams<{ taskId: string }>();

  if (!taskId) {
    return (
      <>
        <h1>404</h1>
        <NotFoundComp />
      </>
    );
  }

  return (
    <>
      <h1>Task Details</h1>
      <TaskDetailsComp taskId={taskId} />
    </>
  );
};

export default TaskDetails;
