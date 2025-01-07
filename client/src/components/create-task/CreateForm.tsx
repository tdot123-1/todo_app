import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";

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

    console.log("Task Submitted: ", task)

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
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "2rem" }}>
          <label htmlFor="title">
            Title<span>*</span>
          </label>
          <input name="title" id="title" type="text" required />
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <label htmlFor="description">
            Description<span>*</span>
          </label>
          <textarea name="description" id="description" required />
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <label htmlFor="priority">Priority</label>
          <select name="priority" id="priority">
            <option value={""}>Please select a priority</option>
            <option value={1}>Very High</option>
            <option value={2}>High</option>
            <option value={3}>Medium</option>
            <option value={4}>Low</option>
            <option value={5}>Very Low</option>
          </select>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <label>Deadline</label>
          <input name="deadline" id="deadline" type="text" />
        </div>
        <div>
          <Button variant="secondary">Cancel</Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </>
  );
};

export default CreateForm;
