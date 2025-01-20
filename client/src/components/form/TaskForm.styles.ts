import styled from "styled-components";

export const Input = styled.input`
  padding: 0.5rem;
  border-radius: 10px;
  font-style: italic;
  font-size: 0.8rem;
  color: ${(props) => props.theme.textColor};
  border: none;
  width: full;
`;

export const Label = styled.label`
  font-size: 0.8rem;
  color: ${(props) => props.theme.textColor};
`;

export const TextArea = styled.textarea`
  padding: 0.5rem;
  border-radius: 10px;
  font-style: italic;
  font-size: 0.8rem;
  color: ${(props) => props.theme.textColor};
  border: none;
  min-height: 10rem;
  width: full;
`;

export const InputContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
`;

export const Select = styled.select`
  padding: 0.5rem;
  border-radius: 10px;
  font-style: italic;
  font-size: 0.8rem;
  color: ${(props) => props.theme.textColor};
  border: none;
  width: full;
`;

export const SelectOption = styled.option`
  padding: 0.5rem;
  border-radius: 10px;
  font-style: italic;
  font-size: 0.8rem;
  color: ${(props) => props.theme.textColor};
  border: none;
  width: full;
`;

export const ErrorText = styled.p`
  text-align: center;
  color: ${(props) => props.theme.dangerColor};
  font-style: italic;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

export const FormWrapper = styled.div`
  margin: 2rem auto;
  width: full;

  @media (min-width: 600px) {
    width: 75%;
  }

  @media (min-width: 900px) {
    width: 50%;
  }

  @media (min-width: 1200px) {
    width: 35%;
  }
`;
