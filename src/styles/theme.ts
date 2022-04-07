import { keyframes } from 'styled-components';

export const theme = {
  color: {
    blue: '#00bac7',
    gray: '#f6f6f6',
    green: '#07b495',
    lightGreen: '#99ecdd',
    white: '#ffffff',
    mint: '#13ACC1',
    black: '#000',
    yellow: '#FFB118',
    darkGray: '#333333',
  },
  fontColor: {
    black: '#33333',
    gray: '#7b7b7b',
    white: '#fff',
  },
  boxShadow: {
    normal: '0 3px 8px 0 rgb(0 0 0 / 10%)',
  },
  animation: {
    slideIn: keyframes`
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(0%);
      }
    `,
  },
};

const customMediaQuery = (maxWidth: number): string => `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
};
