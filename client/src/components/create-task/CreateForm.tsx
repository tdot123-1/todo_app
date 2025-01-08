import { useNavigate } from "react-router-dom";
import TaskForm from "../form/TaskForm";

const CreateForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rawTask = Object.fromEntries(formData.entries());
    console.log("Raw task: ", rawTask);

    const task = {
      ...rawTask,
      priority: rawTask.priority ? parseInt(rawTask.priority as string) : null,
      deadline: rawTask.deadline ? rawTask.deadline : null,
    };

    console.log("Task Submitted: ", task);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
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
        <TaskForm onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default CreateForm;
