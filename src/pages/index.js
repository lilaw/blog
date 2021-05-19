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
    margin: 0;
    font-variation-settings: "wght" 661, "ital" 0, "YTFI" 723, "YTDE" -225, "YTAS" 826, "YTUC" 963, "YTLC" 511, "XOPQ" 156, "opsz" 34;
    text-transform: uppercase;
    color: var(--color-lilac-a);
    --h1-font-size-max: 6;
    grid-column: 5 /10;
    grid-row: 3 / 4;
    transform: translate(-2.5rem, -1rem);
    @media screen and (min-width: 24.15em) {
    }
    @media (min-width: 60.25em) {
      align-self: end;
      writing-mode: vertical-rl;
      justify-self: center; 
      grid-column: 3 / 5;
      grid-row: 3 / 5;
      transform: initial;
    }
    @media (min-width: 75em) {
    } 
  }
  .navigation {
    background-color: var(--color-lilac-d);
    align-self: stretch;
    mix-blend-mode: hard-light;
    grid-column: 2 / 5;
    grid-row: 3 / 5;
    transform: translateY(-1rem);
    justify-self: center;
    
    .menu {
      padding: 1rem;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      width: min-content;
      &__item {
        padding: .3rem;
        list-style: none;
        a, &__link {
          color: var(--color-grey-b);
          text-transform: uppercase;
          text-decoration: none;
        }
      }
    }
    @media screen and (min-width: 24.15em) {
    }
    @media (min-width: 60.25em) {
      grid-column: 4 /10;
      grid-row: 2 / 3;
      transform: translate(-3rem, 50%);
      writing-mode: vertical-rl;
      height: min-content;
      width: initial;
      justify-self: initial;
    }
    @media (min-width: 75em) {
    } 
  }
  .introduction {
    padding: .4rem 1rem;
    border: .5rem solid var(--color-lilac-c);
    width: min-content;
    font-size: calc( 2.7rem + 1.9 * var(--scale));
    line-height: 1;
    word-spacing: 5ch;
    transition: font-size .2s ease-in-out;
    grid-row: 1/ 3;
    grid-column: 2 / 7;
    align-self: flex-start;
    --scale: 1px;
    align-self: flex-end;
    @media screen and (min-width: 24.15em) {
      // scale for home page introduction text
      // from 0.7px to 10px, actually you can't get 0, 
      --scale: ((100vw - ( var(--bp-small) * 16px )) / ( var(--bp-xlarge) - var(--bp-small) )) /1.6;
    
    }
    @media (min-width: 60.25em) {
      grid-row: 2/ 4;
      grid-column: 2 / 4;
      align-self: center;
    }
    @media (min-width: 75em) {
    } 
  }
  .flower {
    grid-row: 4 / 6;
    grid-column: 1 / -1;
    align-self: flex-end;
    overflow: hidden;
    &__image {
      width: 100%;
      transform: translateY(30%);
      transition: width .2s ease-in-out;
    }
  }
`


export default function UsersList() {
  return (
    <Container>
        <h1 className="heading">Wellcome</h1>
        <section className="introduction">
          share the knowledge with love.
        </section>
        <nav className="navigation">
          <ul className="menu">
            <li className="menu__item" ><Link to="/">Home</Link></li>
            <li className="menu__item" ><Link to="/writing">Writing</Link></li>
            <li className="menu__item" ><a href="/wip">Labs</a></li>
            <li className="menu__item" ><a href="/wip">About</a></li>
          </ul>
        </nav>

        <footer className="flower">
          <img className='flower__image' src={flower} alt="flower image" />
        </footer>
    </Container>
  )
}