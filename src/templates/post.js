import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx"
import { css } from "@emotion/react"
import * as React from "react"
import Layout from "../components/layout"

const article = css`
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
`

export default function Post({ data }) {
  return (
    <Layout>
      <article css={article}>
        <MDXRenderer>{data.contentfulPosts.content.childMdx.body}</MDXRenderer>
      </article>
    </Layout>
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