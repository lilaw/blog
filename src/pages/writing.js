import React from "react"
import Layout from "../components/layout"
import { css } from "@emotion/react"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"

function Writing({
  data: {
    allContentfulPosts: { nodes: articles },
  },
}) {
  return (
    <>
      <SEO title={"Writing"} description={"apSomething blog posts"} />
      <section css={style}>
        <h1>Writing & Article</h1>
        <div className="content">
          {articles
            .map(art => ({
              slug: art.slug,
              title: art.title,
              excerpt: art.content.childMdx.excerpt,
            }))
            .map(art => (
              <article key={art.slug}>
                <Link to={`/${art.slug}`}>
                  <h2>{art.title}</h2>
                  <p className="excerpt">{art.excerpt}</p>
                </Link>
              </article>
            ))}
        </div>
      </section>
    </>
  )
}

const style = css`
  h1 {
    --h1-line-height-min: 5;
    --h1-line-height-max: 8.5;
    --h1-font-size-min: 4;
    --h1-font-size-max: 10;
    grid-column: 1 /-1;
    max-width: initial;
  }
  h2 {
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
  a {
    color: currentColor;
    text-decoration: none;
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
