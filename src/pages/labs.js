import * as React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/react"
import { GatsbyImage } from "gatsby-plugin-image"
import SEO from "../components/seo"

const style = css`
  padding: 4rem 5vw 3rem;
  .demo {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 3rem;

    &__item {
      list-style: none;
      max-width: 100%;
      align-self: flex-start;
    }
    &__link {
      text-decoration: none;
      color: currentColor;
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
    }
    &__img {
      order: 1;
    }
    &__describe {
      order: 2;
    }
    &__describe--sub {
      display: flex;
      &::before {
        content: "[";
      }
      &::after {
        content: "]";
      }
      max-width: initial;

      color: var(--color-grey-c);
    }

    .email {
      grid-row: span 3;
      order: -1;
    }
    .blog {
    }
    .dictionary {
      @media (min-width: 60.25em) {
        grid-row: 1 / 3;
        grid-column: span 2;
        order: 3;
      }
    }
    .bookshelf {
      @media (min-width: 60.25em) {
        grid-row: 3 / 4;
        grid-column: 2 / span 2;
        order: 3;
      }
    }
  }
`

export default function labs({
  data: {
    allProject: { nodes: projects },
  },
}) {
  return (
    <>
      <SEO
        title="Labs"
        description="experiments demonstrating Grid design, and probability in on the web."
      />
      <section css={style}>
        <ul className="demo">
          {projects.map(
            ({ className, liveLink, description, codeLink, cover }) => (
              <li className={`demo__item ${className}`} key={className}>
                <a
                  className="demo__link"
                  href={liveLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4 className="demo__describe">{description}</h4>
                  <GatsbyImage
                    className="demo__img"
                    image={cover.childImageSharp.gatsbyImageData}
                    alt={className}
                  />
                </a>
                <p className="demo__describe--sub">
                  <a
                    className="demo__link"
                    href={codeLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    On Github
                  </a>
                </p>
              </li>
            )
          )}
        </ul>
      </section>
    </>
  )
}

export const pageQuery = graphql`
  query {
    allProject {
      nodes {
        cover {
          childImageSharp {
            gatsbyImageData
          }
        }
        liveLink
        codeLink
        className
        description
      }
    }
  }
`
