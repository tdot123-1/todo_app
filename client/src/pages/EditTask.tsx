import { useParams } from "react-router-dom";
// import EditTaskComp from "../components/edit-task/EditTaskComp";
import TaskDetailsComp from "../components/task-details/TaskDetailsComp";
import NotFoundComp from "../components/not-found/NotFoundComp";

const EditTask = () => {
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
      <h1>Edit Task</h1>
      {/* <EditTaskComp taskId={taskId} /> */}
      <TaskDetailsComp taskId={taskId} edit />
    </>
  );
};

export default EditTask;
