export const theme = {
  color: {
    blue: '#00bac7',
    gray5: '#f5f5f5',
    gray: '#f6f6f6',
    green: '#07b495',
    lightGreen: '#99ecdd',
    darkGray: '#54595d',
    white: '#ffffff',
  },
  boxShadow: {
    normal: '0 3px 8px 0 rgb(0 0 0 / 10%)',
  },
};

const customMediaQuery = (maxWidth: number): string => `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
};
