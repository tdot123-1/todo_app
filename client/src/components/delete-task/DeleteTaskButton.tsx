import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import { ButtonContent } from "../button/Button.styles";
import { IconClipboardX } from "@tabler/icons-react";

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
        <ButtonContent>
          <IconClipboardX size={20} />
          <span>Delete</span>
        </ButtonContent>
      </Button>
    </>
  );
};

export default DeleteTaskButton;
