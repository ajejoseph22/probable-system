import styled from "styled-components";

const StyledErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  height: 85vh;

  button {
    cursor: pointer;
  }
`;

const ErrorPage = ({ message, retryFunction }) => (
  <StyledErrorPage>
    <p>{message}</p>
    <button onClick={retryFunction}>Retry</button>
  </StyledErrorPage>
);

export default ErrorPage;
