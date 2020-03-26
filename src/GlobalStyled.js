import { createGlobalStyle } from 'styled-components';
import 'normalize.css';

const GlobalStyled = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,700&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Kanit:300,400,500,600,700&display=swap');

    body:not(.user-is-tabbing) button:focus {
        outline: none;
    }

    .gm-style .gm-style-iw-d, .gm-style .gm-style-iw-c{
      max-height: none !important;
    }

    .gm-style-iw-t button[aria-label="ปิด"] {
      top: 2px !important;
      right: 2px !important;
    }
`;

export default GlobalStyled;
