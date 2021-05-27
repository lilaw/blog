import React from "react"
import Search from "../components/search"
import { css } from "@emotion/react"
import { graphql } from "gatsby"
import SEO from "../components/seo"

const style = css`
  .headingAndSearch {
    grid-column: 1 /-1;
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 43.75em) {
      grid-template-columns: 1fr min-content;
    }
  }
  .heading-1 {
    --h1-line-height-min: 5;
    --h1-line-height-max: 8.5;
    --h1-font-size-min: 4;
    --h1-font-size-max: 10;
    max-width: initial;
  }
`

function Writing({ data }) {
  return (
    <>
      <SEO title="Writing" description="apSomething blog posts" />
      <section css={style}>
        <Search blogposts={data} />
      </section>
    </>
  )
}
export const WritingQuery = graphql`
  query {
    allContentfulPosts(sort: { fields: [createdAt], order: DESC }) {
      nodes {
        slug
        title
        content {
          childMdx {
            excerpt
          }
        }
      }
    }
  }
`

export default Writing
