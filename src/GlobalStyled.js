import { createGlobalStyle } from 'styled-components';
import 'normalize.css';

const GlobalStyled = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,700&display=swap');

    body:not(.user-is-tabbing) button:focus {
        outline: none;
    }
`;

export default GlobalStyled;
