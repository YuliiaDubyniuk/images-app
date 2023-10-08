import styled from "styled-components";

export const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;

  .error{
    color: red;
    margin: 200px auto 0;
    font-size: 24px;
  }
`