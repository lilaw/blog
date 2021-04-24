import { Link } from "gatsby"
import React from "react"
import { css } from "@emotion/react"
import logo from "../images/logo.svg"

const outer = css`
  background: linear-gradient(30deg, var(--color-lilac-e), var(--color-lilac-a));
  padding: .5rem;
`
const inter = css`
  background-color: var(--color-grey-z);
  display: grid;
  padding: 2rem;
  grid-template-columns: minmax(7rem, 1fr) repeat(2, minmax(min-content, 46.5rem));
  grid-template-rows: 9rem;
  gap: 1rem;
  header {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    img {

    }
  }
  
  nav {
    background-color: var(--color-lilac-e);
    justify-self: stretch;
    align-self: baseline;
    grid-column: 3 /4;
    grid-row: 1 /3;
    writing-mode: vertical-rl;
    ul {
      padding: 1rem;
    }
    li {
      list-style-type: none;
      &:not(:last-child) {
        padding-left: .5rem;
      }
      a {
        font-size: calc(1rem + 1 * var(--scale));
        text-decoration: none;
        color: var(--color-grey-b)
      }
    }
  }
  main {
    height: min-content;
    grid-column: 1 / 4;
    grid-row-start: 2;
  }
  footer {
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
const GradientBorder = ({children}) => {
  return (
      <div css={outer}><div css={inter}>{children}</div></div>
  )
}

function Layout({ children }) {
  return (
    <GradientBorder>
      <header>
        <img src={logo} alt="logo image" width="70px"/>
      </header>
        <nav className="navigation">
          <ul className="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/writing">Writing</Link></li>
            <li><Link to="/">Labs</Link></li>
            <li><Link to="/">About</Link></li>
          </ul>
        </nav>
      <main>{children}</main>

      <footer>All articles written with ❤ by apSomething</footer>
    </GradientBorder>
  )
}

export default ({ children, pageContext }) => {
  // home page are no layout
  if (pageContext.layout === "special") {
    return children
  }
  return <Layout>{children}</Layout>
}