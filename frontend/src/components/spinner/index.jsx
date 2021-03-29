import { HalfCircleSpinner } from "react-epic-spinners";
import styled from "styled-components";

const StyledSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  height: 85vh;
`;

const Spinner = ({ color }) => (
  <StyledSpinner>
    <HalfCircleSpinner color={color} />
  </StyledSpinner>
);

export default Spinner;
