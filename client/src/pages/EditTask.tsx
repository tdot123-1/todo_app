import { useParams } from "react-router-dom";
import EditTaskComp from "../components/edit-task/EditTaskComp";

const EditTask = () => {
  const { taskId } = useParams<{ taskId: string }>();

  if (!taskId) {
    return <p>Not Found</p>;
  }
  return (
    <>
      <h1>Edit Task</h1>
      <EditTaskComp taskId={taskId} />
    </>
  );
};

export default EditTask;
