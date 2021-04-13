import React from "react"
import Layout from "../components/layout"
import { css } from "@emotion/react"
import { graphql } from "gatsby"

function Writing() {
  return (
    <Layout>
      <section css={style}>
        <h1>Writing & Article</h1>
        <div className="content">
          <article>
            <h2>Hightling from CSS</h2>
            <p className="excerpt">
              Chris Coyier asked a few folks to write about what excites them
              about building websites this year. Shockingly, I volunteered to
              write about variable fonts. But all in all, I think it's been an
              exciting year for them, and feel...
            </p>
          </article>
          <article>
            <h2>Hightling from CSS</h2>
            <p className="excerpt">
              Chris Coyier asked a few folks to write about what excites them
              about building websites this year. Shockingly, I volunteered to
              write about variable fonts. But all in all, I think it's been an
              exciting year for them, and feel...
            </p>
          </article>
          <article>
            <h2>Hightling from CSS</h2>
            <p className="excerpt">
              Chris Coyier asked a few folks to write about what excites them
              about building websites this year. Shockingly, I volunteered to
              write about variable fonts. But all in all, I think it's been an
              exciting year for them, and feel...
            </p>
          </article>
          <article>
            <h2>Hightling from CSS</h2>
            <p className="excerpt">
              Chris Coyier asked a few folks to write about what excites them
              about building websites this year. Shockingly, I volunteered to
              write about variable fonts. But all in all, I think it's been an
              exciting year for them, and feel...
            </p>
          </article>
        </div>
      </section>
    </Layout>
  )
}

const style = css`
  h1 {
    --h1-line-height-min: 5;
    --h1-line-height-max: 8.5;
    --h1-font-size-min: 4;
    --h1-font-size-max: 10;
    grid-column: 1 /-1;
    font-variation-settings: "wght" 576, "ital" 0;
    max-width: initial;
  }
  h2 {
    --h2-vf-wght-multiplier-l: 6;
    margin-bottom: 0.4em;
  }
  .content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 2fr));
    row-gap: 2em;
    column-gap: 1.5em;
  }
  article {
    grid-column: auto / span 2;
  }
`
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
