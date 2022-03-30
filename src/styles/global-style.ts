import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import { media } from 'src/styles/theme';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    :focus {
        outline: none;
        border: none;
    }
    ::-webkit-scrollbar {
        display: none;
    }
<<<<<<< HEAD
    *{
        box-sizing: border-box;
    }
=======

    * {
        box-sizing: border-box;
    }
    
>>>>>>> 12c4cbd (style: box-sizing 글로벌에 추가)
    html{
        font-family: 'Noto Sans KR', sans-serif;
        font-display: fallback;

        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    button{
        border:none;
    }
    .pc-tablet-only {
        display: block;
        ${media.mobile} {
            display: none;
        }
    }
    .tablet-mobile-only{
        display: none;
        ${media.tablet}{
            display:block;
        }
    }
    .mobile-only {
        display: none;
        ${media.mobile} {
            display: block;
        }
    }
`;
