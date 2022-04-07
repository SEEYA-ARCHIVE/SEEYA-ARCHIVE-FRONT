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
