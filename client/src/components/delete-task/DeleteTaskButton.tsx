import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";

interface DeleteTaskButtonProps {
  taskId: string;
}

const DeleteTaskButton = ({ taskId }: DeleteTaskButtonProps) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/delete/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Task deleted");
        navigate("/tasks", { replace: true });
      } else {
        console.error("Error deleting task: ", response.status);
      }
    } catch (error) {
      console.error("Failed to delete task: ", error);
    }
  };
  return (
    <>
      <Button onClick={handleDelete} variant={`danger`}>
        Delete
      </Button>
    </>
  );
};

export default DeleteTaskButton;
