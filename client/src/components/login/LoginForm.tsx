import { useNavigate } from "react-router-dom";
import AuthForm from "../form/AuthForm";
import { useContext, useState } from "react";
import { SessionContext } from "../../contexts/SessionContext";

const LoginForm = () => {
  const session = useContext(SessionContext);

  if (!session) {
    return <p>Error loading session</p>;
  }

  const { setToken } = session;
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/token`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("error data: ", errorData);
        console.error("Error logging in: ", response.status);
        if (errorData.detail && typeof errorData.detail === "string") {
          setLoginError(errorData.detail);
        } else {
          throw new Error("Unexpected error occured");
        }
        // throw new Error(`Error signing up: ${response.status}`);
      } else {
        const data = await response.json();

        if (data.access_token) {
          console.log(data.access_token);
          setToken(data.access_token);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      setLoginError("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div>
        <AuthForm
          onSubmit={handleSubmit}
          signup={false}
          error={loginError}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default LoginForm;
