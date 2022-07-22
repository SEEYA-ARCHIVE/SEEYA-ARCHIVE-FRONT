import { keyframes } from 'styled-components';

export const theme = {
  color: {
    blue5: '#2D7FF9',
    red: '#DF5656',
    blue: '#00bac7',
    gray2: '#999999',
    gray3: '#b3b3b3',
    gray4: '#c4c4c4',
    gray5: '#f5f5f5',
    gray: '#f6f6f6',
    green: '#07b495',
    lightGreen: '#99ecdd',
    white: '#ffffff',
    mint: '#13ACC1',
    black: '#000',
    yellow: '#FFB118',
    darkGray: '#333333',
    purple: '#7B61FF',
    skyblue: '#f4faff',
    pastelBlue: '#688F95',
    kakao: '#FEE500',
    twitter: '#2AA9E0',
    error: '#FF0000',
    success: '#268F31',
  },
  fontColor: {
    black: '#333333',
    gray5: '#706B6B',
    gray: '#7b7b7b',
    lightGray: '#C4C4C4',
    white: '#fff',
    mint: '#13ACC1',
    blue: '#2D7FF9',
    kakao: '#191600',
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
    slideOut: keyframes`
      0% {
        transform: translateX(0%);
      }
      30% {
        transform: translateX(-2%);
      }
      100% {
        transform: translateX(100%);
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
