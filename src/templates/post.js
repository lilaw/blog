import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { css } from "@emotion/react"
import * as React from "react"
import Layout from "../components/layout"

const article = css`
  display: grid;
  grid-template-columns: 4fr minmax(min-content, 42rem) minmax(30rem, 32rem) 1fr;
  row-gap: 0.8em;

  > * {
    grid-column: 2 /4;
  }
  [data-language] {
    grid-column: 2 / 4;
    justify-self: stretch;
    max-width: 72rem;
  }
  h1 {
    --h1-line-height-min: 5;
    --h1-line-height-max: 8.5;
    --h1-font-size-min: 4;
    --h1-font-size-max: 10;
    grid-column: 1 /-1;
    max-width: 120rem;
    text-transform: capitalize;
  }
  h2,
  h3,
  h4 {
    grid-column: 1 / 3;
    max-width: 120rem;
    /* --h2-font-size-max: 4; */
    margin: 0;
    padding-top: 1em;
    @media screen and (min-width: 75em) {
      justify-self: center;
    }
  }
  p {
    margin: 0;
    padding: 0.2em 0;
    code {
      padding: 0 0.3em;
      font-size: 0.8em;
    }
  }
  ul,
  ol {
    padding-left: 2em;
    padding-top: 1em;
    li {
      :not(:last-child) {
        padding-bottom: 0.3em;
      }
    }
  }

  blockquote {
    padding: 0.8em 0;
    padding-left: 1em;
    border-left: 0.2em solid var(--color-lilac-c);
    --text-wght: 530;
    font-style: italic;
  }
  a {
    color: currentColor;
  }
  .img-text {
    grid-column: var(--img-text, 2/4);
    > img,
    > figure {
    }
    @media (min-width: 88em) {
      --img-text: 1 / 4;

      display: grid;
      grid-template-columns: 1fr 74rem;
      column-gap: 1em;
    }
  }
  .img-img {
    grid-column: var(--img-img, 2/4);

    img {
      max-height: 50rem;
    }
    @media (min-width: 88em) {
      --img-img: 1 / 4;

      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-content: center;
      justify-items: center;
      column-gap: 3em;
    }
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
  query($slug: String) {
    contentfulPosts(slug: { eq: $slug }) {
      title
      content {
        childMdx {
          body
        }
      }
    }
  }
`
