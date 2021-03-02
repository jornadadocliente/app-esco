import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat';
    box-sizing: border-box;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #F9F9F9;
  }

  button {
    cursor: pointer;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    padding: 0 16px;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .only-desktop {
    display: block;
    @media screen and (max-width: 800px) {
      display: none;
    }
  }

  .only-mobile {
    display: none;
    @media screen and (max-width: 800px) {
      display: block;
    }
  }

`

export default GlobalStyle;