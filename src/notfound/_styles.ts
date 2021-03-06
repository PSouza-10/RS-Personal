import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  @media (min-width: 768px) {
    margin: 0 5vw;
  }
  justify-content: center;
  .message {
    text-align: center;
    border-bottom: 4px solid ${({ theme: { colors } }) => colors.primary};
    color: white;
    margin-bottom: 30px;
    padding-bottom: 20px;
  }

  .causes {
    text-align: center;

    color: white;
  }
`;
