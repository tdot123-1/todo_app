import { useNavigate } from "react-router-dom";
import AuthForm from "../form/AuthForm";
import { useState } from "react";

const SignupForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignupError("");
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // log error code
        console.error("Error signing up: ", response.status);

        const errorData = await response.json();
        console.error("error data: ", errorData);

        // in case of error caught: display error detail
        if (errorData.detail && typeof errorData.detail === "string") {
          setSignupError(errorData.detail);
        } else {
            throw new Error("Unexpected error occured")
        }
      } else {
        const data = await response.json();

        if (data.message) {
          console.log(data.message);
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Error signing up: ", error);
      setSignupError("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <AuthForm
          onSubmit={handleSubmit}
          signup
          isLoading={isLoading}
          error={signupError}
        />
      </div>
    </>
  );
};

export default SignupForm;
