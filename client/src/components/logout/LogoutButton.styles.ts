import styled from "styled-components";

export const LogoutButtonDiv = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 0.5rem;
  width: fit-content;
  height: fit-content;
  opacity: 0.5;

  &:hover span {
    display: inline;
  }

  &:hover {
    opacity: 1;
  }
`;

export const LogoutText = styled.span`
  display: none;
`;
