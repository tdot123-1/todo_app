import { Link } from "react-router-dom";
import { Task } from "../../types";
import { Button } from "../button/Button";
import { ButtonContainer } from "../button/Button.styles";
import {
  FormWrapper,
  Input,
  InputContainer,
  Label,
  Select,
  TextArea,
} from "./TaskForm.styles";

interface TaskFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  task?: Task;
}

const TaskForm = ({ onSubmit, task }: TaskFormProps) => {
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
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="description">Description</Label>
          <TextArea
            name="description"
            id="description"
            required
            defaultValue={task ? task.description : ""}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="priority">Priority</Label>
          <Select
            name="priority"
            id="priority"
            defaultValue={task ? task.priority : ""}
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
            type="text"
            defaultValue={task?.deadline ? task.deadline : ""}
          />
        </InputContainer>
        <ButtonContainer>
          <Link to={`/tasks`}>
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Button type="submit">Create</Button>
        </ButtonContainer>
      </form>
    </FormWrapper>
  );
};

export default TaskForm;
