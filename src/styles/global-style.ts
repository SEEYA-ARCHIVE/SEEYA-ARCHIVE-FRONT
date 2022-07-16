import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import { media } from 'src/styles/theme';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    :focus:not(button) {
        outline: none;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    *{
        box-sizing: border-box;
    }
    html{
        font-family: 'Noto Sans KR', sans-serif;
        font-display: fallback;

        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    button{
        border:none;
        cursor: pointer;
    }
    img{
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
    }
    a{
        text-decoration: none;
    }
    .pc-only{
        display: block;
        ${media.pc} {
            display: none;
        }
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

    div {  
        -ms-user-select: none;   
        -moz-user-select: -moz-none;   
        -khtml-user-select: none;   
        -webkit-user-select: none;   
        user-select: none; 
    }

`;
