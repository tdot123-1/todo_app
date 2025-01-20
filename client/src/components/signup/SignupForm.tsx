import { useNavigate } from "react-router-dom";
import AuthForm from "../form/AuthForm";

const SignupForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error signing up: ${response.status}`);
      }

      const data = await response.json();

      if (data.message) {
        console.log(data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error creating task: ", error);
    }
  };

  return (
    <>
      <div>
        <AuthForm onSubmit={handleSubmit} signup />
      </div>
    </>
  );
};

export default SignupForm;
