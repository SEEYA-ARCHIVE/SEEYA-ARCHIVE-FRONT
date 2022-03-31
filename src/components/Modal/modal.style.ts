import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1000;
`;

export const Content = styled.div`
  position: absolute;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  border: none;
  z-index: 1001;
`;
