import { useParams } from "react-router-dom";
import TaskDetailsComp from "../components/task-details/TaskDetailsComp";

const TaskDetails = () => {
  const { taskId } = useParams<{ taskId: string }>();

  if (!taskId) {
    return <p>Not Found</p>;
  }

  return (
    <>
      <h1>Task Details</h1>
      <TaskDetailsComp taskId={taskId} />
    </>
  );
};

export default TaskDetails;
