import { useNavigate } from "react-router-dom";
import { Task } from "../../types";
import TaskForm from "../form/TaskForm";

interface EditFormProps {
  task: Task;
}

const EditForm = ({ task }: EditFormProps) => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rawTask = Object.fromEntries(formData.entries());
    console.log("Raw task: ", rawTask);

    const taskUpdate = {
      ...rawTask,
      priority: rawTask.priority ? parseInt(rawTask.priority as string) : null,
      deadline: rawTask.deadline ? rawTask.deadline : null,
    };

    console.log("Task Submitted: ", taskUpdate);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/update/${task.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskUpdate),
        }
      );

      if (response.ok) {
        console.log("Success");
        navigate("/tasks", { replace: true });
      } else {
        console.error(`Error creating task: ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating task: ", error);
    }
  };
  return (
    <>
      <div>
        <TaskForm task={task} onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default EditForm;
