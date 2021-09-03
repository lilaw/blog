import { Link } from "gatsby"
import React from "react"
import { css } from "@emotion/react"
import logo from "../images/logo.svg"
import { useMatch } from "@reach/router"

const outer = css`
  background: linear-gradient(
    30deg,
    var(--color-lilac-e),
    var(--color-lilac-a)
  );
  padding: 0.5rem;
  min-height: cal(100vh - 1rem);
`
const inter = css`
  background-color: var(--color-grey-z);
  display: grid;
  padding: 2rem;
  grid-template-columns: minmax(7rem, 1fr) repeat(
      2,
      minmax(min-content, 46.5rem)
    );
  grid-template-rows: 9rem;
  gap: 1rem;
  min-height: calc(100vh - 1rem);
  .header {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }

  .navigation {
    background-color: var(--color-lilac-e);
    justify-self: stretch;
    align-self: baseline;
    grid-column: 3 /4;
    grid-row: 1 /3;
    writing-mode: vertical-rl;
  }
  .menu {
    padding: 1rem;
    &__item {
      list-style-type: none;
      border-top: 0.1em solid transparent;

      padding: 0.5em 0 0.6em 0;
      &:not(:last-child) {
      }
      a {
        font-size: calc(1rem + 1 * var(--scale));
        text-decoration: none;
        color: var(--color-grey-b);
      }
    }
  }
  .main {
    height: min-content;
    grid-column: 1 / 4;
    grid-row-start: 2;
  }
  .footer {
    padding: 2em;
    grid-column: 1 / -1;
    text-align: center;
    ::before {
      padding-bottom: 1em;
      display: block;
      content: "";
      width: 100%;
      height: 1px;
      border-top: 2px solid var(--color-grey-c);
    }
  }
`
const GradientBorder = ({ children }) => {
  return (
    <div css={outer}>
      <div css={inter}>{children}</div>
    </div>
  )
}

function Layout({ children }) {
  const isWriting = useMatch("/writing")
  const isLabs = useMatch("/labs")

  return (
    <GradientBorder>
      <header className="header">
        <img className="logo" src={logo} alt="logo image" width="70px" />
      </header>
      <nav className="navigation">
        <ul className="menu">
          <li className="menu__item">
            <Link to="/">Home</Link>
          </li>
          <li
            className="menu__item"
            style={
              isWriting
                ? { "border-top": ".1em solid var(--color-grey-b)" }
                : undefined
            }
          >
            <Link to="/writing">Writing</Link>
          </li>
          <li
            className="menu__item"
            style={
              isLabs
                ? { "border-top": ".1em solid var(--color-grey-b)" }
                : undefined
            }
          >
            <Link to="/labs">Labs</Link>
          </li>
          <li className="menu__item">
            <Link to="/wip">About</Link>
          </li>
        </ul>
      </nav>
      <main className="main">{children}</main>

      <footer className="footer">
        All articles written with ❤ by apSomething using Gatsby, Emotion, and
        hosted with cloudflare pages.
      </footer>
    </GradientBorder>
  )
}

export default function hasLayoutOrnot({ children, pageContext }) {
  // home page are no layout
  if (pageContext.layout === "special") {
    return children
  }
  return <Layout>{children}</Layout>
}
