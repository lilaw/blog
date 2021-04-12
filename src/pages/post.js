import { graphql } from "gatsby";
// import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import logo from "../images/logo.svg"
import * as React from "react"

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
  /* grid-auto-rows:  25rem; */
  gap: 1rem;
  header {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    img {

    }
  }
  
  nav {
    background-color: var(--color-lilac-c);
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
    display: grid;
    grid-template-columns: 4fr minmax(min-content, 30rem) minmax(30rem, 32rem) 1fr;
    row-gap: .8em;

    > * {
      grid-column: 2 /4;
    }
    > [ data-language] {
      grid-column: 2 / 4;
      justify-self: stretch;
      max-width: 72rem;
    }
    h1 {
      --h1-line-height-min: 5;
      --h1-line-height-max: 8.5;
      --h1-font-size-min: 4.0;
      --h1-font-size-max: 10; 
      grid-column: 1 /-1;
      font-variation-settings: "wght" 576, "ital" 0;
      max-width: 120rem;
    }
    h2, h3, h4 {
      grid-column: 1 / 3;
      max-width: 120rem;
      --h2-font-size-max: 4;
      margin: 0;
      padding-top: 1em;
      @media screen and (min-width: 75em) {
        justify-self: center;
      }
    }
    p {
      margin: 0;
      padding: .2em 0;
      code {
        padding: 0 .3em;
        font-size: .8em;
      }
    }
    ul, ol {
      padding-left: 3rem;
    }
    
    blockquote {
      padding: .8em 0;
      padding-left: 1em;
      border-left: .2em solid var(--color-lilac-c);
      --text-wght: 530;
      font-style: italic;
    }
    a {
      color: currentColor;
    }
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

export default function Post({ data }) {
  console.log('something')
  return (
    <GradientBorder>
      <header>
        <img src={logo} alt="logo image" width="70px"/>
      </header>
        <nav className="navigation">
          <ul className="menu">
            <li><a href="/">Home</a></li>
            <li><a href="/">Writing</a></li>
            <li><a href="/">Labs</a></li>
            <li><a href="/">About</a></li>
          </ul>
        </nav>
      <main>
        <MDXRenderer>{data.contentfulPosts.content.childMdx.body}</MDXRenderer>
      </main>

      <footer>All articles written with ❤ by apSomething</footer>
    </GradientBorder>
  )
}

export const postQuery = graphql`
query {
	contentfulPosts(title: {eq: "startup now"}) {
      title
			content {
				childMdx {
					body
        }
                
      }
    
  }
}
`