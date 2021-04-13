import * as React from "react"

// import Bio from "../components/bio"
// import Layout from "../components/layout"
// import SEO from "../components/seo"
import styled from "@emotion/styled"
import flower from "../images/flower.svg"
import { Link } from "gatsby"

const Container = styled.main`
  max-width: 100%;
  margin: 0 auto;
  background-color: var(--color-lilac-f);
  display: grid;
  grid-template-rows: 15vh 15vh 20vh 20vh 30vh;
  grid-template-columns: [side-start] minmax(6rem, 1fr) [center-start] repeat(8, [col-start] 1fr [col-end]) [center-end] minmax(6rem, 1fr) [side-end];
  .heading {
    --h1-font-size-max: 6;
    grid-column: 3 / 5;
    grid-row: 3 / 5;
    justify-self: center; 
    margin: 0;
    font-variation-settings: "wght" 661, "ital" 0, "YTFI" 723, "YTDE" -225, "YTAS" 826, "YTUC" 963, "YTLC" 511, "XOPQ" 156, "opsz" 34;
    text-transform: uppercase;
    color: var(--color-lilac-a);
    writing-mode: vertical-rl;
  }
  .navigation {
    grid-column: 4 /10;
    grid-row: 2 / 3;
    background-color: var(--color-lilac-d);
    align-self: stretch;
    transform: translate(-3rem, 50%);
    mix-blend-mode: hard-light;
    writing-mode: vertical-rl;
    height: min-content;
    
    ul {
      padding: 1rem;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      li {
        padding: .3rem;
        list-style: none;
        a {
          color: var(--color-grey-b);
          text-transform: uppercase;
          text-decoration: none;
        }
      }
    }
  }
  .introduction {
    grid-row: 2 / 4;
    grid-column: 2 / 4;
    padding: .4rem 1rem;
    border: .5rem solid var(--color-lilac-c);
    width: min-content;
    font-size: calc( 1rem + 3.5 * var(--scale));
    line-height: 1;
    word-spacing: 5ch;
    transition: font-size .2s ease-in-out;
    align-self: center;
  }
  .flower {
    grid-row: 4 / 6;
    grid-column: 1 / -1;
    align-self: flex-end;
    overflow: hidden;
    img {
      width: 100%;
      transform: translateY(30%);
      transition: width .2s ease-in-out;
    }
  }
`


export default function UsersList() {
  console.log('index')
  return (
    <Container>
        <h1 className="heading">Wellcome</h1>
        <section className="introduction">
          share the knowledge with love.
        </section>
        <nav className="navigation">
          <ul className="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Writing</Link></li>
            <li><a href="/">Labs</a></li>
            <li><a href="/">About</a></li>
          </ul>
        </nav>

        <footer className="flower">
          <img src={flower} alt="flower image" />
        </footer>
    </Container>
  )
}