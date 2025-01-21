import { Link } from "react-router-dom";
import { Task } from "../../types";
import { Button } from "../button/Button";
import { ButtonContainer, ButtonContent } from "../button/Button.styles";
import {
  ErrorText,
  FormWrapper,
  Input,
  InputContainer,
  Label,
  Select,
  TextArea,
} from "./TaskForm.styles";
import { IconArrowBack, IconUpload } from "@tabler/icons-react";
import { theme } from "../../styles";

interface TaskFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: string;
  task?: Task;
}

const TaskForm = ({ onSubmit, task, isLoading, error }: TaskFormProps) => {
  return (
    <FormWrapper>
      <form onSubmit={onSubmit}>
        <InputContainer>
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            id="title"
            type="text"
            required
            defaultValue={task ? task.title : ""}
            disabled={isLoading}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="description">Description</Label>
          <TextArea
            name="description"
            id="description"
            required
            defaultValue={task ? task.description : ""}
            disabled={isLoading}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="priority">Priority</Label>
          <Select
            name="priority"
            id="priority"
            defaultValue={task ? task.priority : ""}
            disabled={isLoading}
          >
            <option value={""}>--&gt;Please select a priority&lt;--</option>
            <option value={1}>Very High</option>
            <option value={2}>High</option>
            <option value={3}>Medium</option>
            <option value={4}>Low</option>
            <option value={5}>Very Low</option>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            name="deadline"
            id="deadline"
            type="date"
            defaultValue={task?.deadline ? task.deadline : ""}
            disabled={isLoading}
          />
        </InputContainer>
        <ButtonContainer>
          <Button variant="secondary" disabled={isLoading}>
            <Link to={`/tasks`}>
              <ButtonContent>
                <IconArrowBack size={theme.iconSizes.button} />
                <span>Cancel</span>
              </ButtonContent>
            </Link>
          </Button>

          <Button type="submit" disabled={isLoading}>
            <ButtonContent>
              <IconUpload size={theme.iconSizes.button} />
              <span>Save</span>
            </ButtonContent>
          </Button>
        </ButtonContainer>
        {error && <ErrorText>{error}</ErrorText>}
      </form>
    </FormWrapper>
  );
};

export default TaskForm;
