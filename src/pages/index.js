import * as React from "react"

import SEO from "../components/seo"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Container = styled.main`
  max-width: 100%;
  margin: 0 auto;
  background-color: var(--color-lilac-f);
  display: grid;
  grid-template-rows: 25vh 25vh 20vh 20vh 30vh;
  @media (min-width: 60.25em) {
    grid-template-rows: 15vh 15vh 20vh 20vh 30vh;
  }
  grid-template-columns:
    [side-start] minmax(6rem, 1fr) [center-start] repeat(
      8,
      [col-start] 1fr [col-end]
    )
    [center-end] minmax(6rem, 1fr) [side-end];
  .heading {
    margin: 0;
    font-variation-settings: "wght" 661, "ital" 0, "YTFI" 723, "YTDE" -225,
      "YTAS" 826, "YTUC" 963, "YTLC" 511, "XOPQ" 156, "opsz" 34;
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
    grid-row: 3 / 4;
    grid-column: 2 / -2;
    align-self: center;
    writing-mode: vertical-rl;

    .menu {
      padding: 1rem;
      height: 100%;
      display: flex;
      gap: 0.3rem;
      justify-content: flex-end;
      flex-direction: column;
      width: min-content;
      &__item {
        display: contents;
        a,
        &__link {
          color: var(--color-grey-b);
          text-transform: uppercase;
          text-decoration: none;
        }
      }
    }
    @media (min-width: 24.15em) {
      grid-column: 2 / 5;
      grid-row: 3 / 5;
      writing-mode: initial;
      align-self: stretch;
      justify-self: center;
      /* transform: translateY(-1rem); */
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
  .design {
    display: none;
    padding: 0.4rem 1rem;
    border: 0.5rem solid var(--color-lilac-c);
    width: min-content;
    font-size: calc(2.7rem + 1.9 * var(--scale));
    line-height: 1;
    word-spacing: 5ch;
    transition: font-size 0.2s ease-in-out;
    grid-row: 1/ 3;
    grid-column: 2 / 7;
    align-self: flex-start;
    align-self: flex-end;
    @media (min-width: 60.25em) {
      grid-row: 2/ 4;
      grid-column: 2 / 4;
      align-self: center;
    }
    @media (min-width: 75em) {
    }
  }
  .poster {
    grid-row: 1/ 3;
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(7, 1fr);
    &__right-angle {
      width: 27%;
      height: 27%;
      justify-self: center;
      align-self: center;
      border: 0.3rem solid var(--color-grey-b);
      &--top-left {
        grid-row: 2 / 4;
        grid-column: 1 / 3;
        border-top: none;
        border-left: none;
        transform: translate(20%, 20%);
      }
      &--top-right {
        grid-row: 2 / 4;
        grid-column: 4 / 7;
        border-top: none;
        border-right: none;
        transform: translate(-20%, 20%);
      }
      &--bottom-left {
        grid-row: 5 / 7;
        grid-column: 1 / 3;
        border-bottom: none;
        border-left: none;
        transform: translate(20%, -20%);
      }
      &--bottom-right {
        grid-row: 5 / 7;
        grid-column: 4 / 6;
        border-bottom: none;
        border-right: none;
        transform: translate(-20%, -20%);
      }
    }
    span {
      justify-self: center;
      align-self: center;
      font-variation-settings: "wght" 600, "wdth" 75, "YOPQ" 125;
      color: var(--color-lilac-d);
      --h2-font-size-max: 8;
      --h2-font-size-min: 3.5;

      font-size: calc(var(--h2-font-size-min) * 1rem);
      @media screen and (min-width: 24.15em) {
        font-size: calc(
          (var(--h2-font-size-min) * 1rem) +
            (var(--h2-font-size-max) - var(--h2-font-size-min)) *
            (
              (100vw - (var(--bp-small) * 16px)) /
                (var(--bp-xlarge) - var(--bp-small))
            ) / 1.6
        );
      }
      @media (min-width: 75em) {
        font-size: calc(var(--h2-font-size-max) * 1rem);
      }
    }
    span:nth-of-type(1) {
      grid-row: 3 / 5;
      grid-column: 2 / 4;
    }
    span:nth-of-type(2) {
      grid-row: 4 / 6;
      grid-column: 3 / 5;
    }
    span:nth-of-type(3) {
      grid-row: 1 / 3;
      grid-column: 5 / 7;
    }
    span:nth-of-type(4) {
      grid-row: 1 / 3;
      grid-column: 3 / 4;
    }
    span:nth-of-type(5) {
      grid-row: 6 / 8;
      grid-column: 2 / 3;
    }
    &::after {
      content: "";
      display: block;
      grid-row: 3/ 6;
      grid-column: 2 / 5;
      border: 1vmax solid var(--color-lilac-c);
    }
    @media (min-width: 60.25em) {
      grid-row: 1/ 5;
      grid-column: 1 / 4;
      transform: translateX(12%);
    }
  }
  .introduction {
    grid-row: 3 / 5;
    grid-column: 2 / 10;
    align-self: center;
    @media (min-width: 24.15em) {
      grid-row: 3 / 5;
      grid-column: 6 / 10;
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
      transition: width 0.2s ease-in-out;
    }
  }
`

export default function UsersList() {
  return (
    <>
      <SEO title="Home" />
      <Container>
        <h1 className="heading">Wellcome</h1>
        <section className="design">share the knowledge with love.</section>
        <section className="poster" aria-hidden="true">
          <i className="poster__right-angle poster__right-angle--top-left" />
          <i className="poster__right-angle poster__right-angle--top-right" />
          <i className="poster__right-angle poster__right-angle--bottom-left" />
          <i className="poster__right-angle poster__right-angle--bottom-right" />
          <span>C</span>
          <span>J</span>
          <span>H</span>
          <span>F</span>
          <span>S</span>
        </section>
        <nav className="navigation" role="navigation" aria-label="main menu">
          <ul className="menu">
            <li className="menu__item">
              <Link to="/">Home</Link>
            </li>
            <li className="menu__item">
              <Link to="/writing">Writing</Link>
            </li>
            <li className="menu__item">
              <Link to="/labs">Labs</Link>
            </li>
            <li className="menu__item">
              <Link to="/wip">About</Link>
            </li>
          </ul>
        </nav>
        <p className="introduction">
          I am a JavaScript Developer that focuses on front-end frameworks such
          as Vue and React, .etc. I am interested in functional programming,
          state machine, Web design, and serverless technologies. I focus on
          building a JAM stack application with new technologies that I never
          tried to grow my skills.
        </p>
        <footer className="flower">
          <StaticImage
            className="flower__image"
            src="../images/flower.svg"
            alt="flower image"
            quality={100}
            layout="fullWidth"
          />
        </footer>
      </Container>
    </>
  )
}
