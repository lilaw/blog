import * as React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/react"
import { GatsbyImage } from "gatsby-plugin-image"

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
  }
`

export default function labs({ data }) {
  let projectMetaDate = [
    {
      className: "email",
      liveLink: "https://6ddf4f52.mail-j4ww.pages.dev/start",
      description: "Html Email",
      codeLink: "https://github.com/lilaw/mail",
    },
    {
      className: "blog",
      liveLink: "/",
      description: "Blog",
      codeLink: "https://github.com/lilaw/blog",
    },
    {
      className: "dictionary",
      liveLink: "https://dictionary-46i7.pages.dev/",
      description: "Merriam-webster learner's dictionary",
      codeLink: "https://github.com/lilaw/dictionary",
    },
  ]
  let mergedData = mergeProjectMetaImageData(
    projectMetaDate,
    data.allImageSharp.nodes
  )
  return (
    <section css={style}>
      <ul className="demo">
        {mergedData.map(
          ({ className, liveLink, description, codeLink, img }) => (
            <li className={`demo__item ${className}`} key={className}>
              <a className="demo__link" href={liveLink} target="_blank">
                <h4 className="demo__describe">{description}</h4>
                <GatsbyImage
                  className="demo__img"
                  image={img}
                  alt="project image"
                />
              </a>
              <p className="demo__describe--sub">
                <a className="demo__link" href={codeLink} target="_blank">
                  On Github
                </a>
              </p>
            </li>
          )
        )}
      </ul>
    </section>
  )
}

export const pageQuery = graphql`
  query {
    allImageSharp(filter: { fluid: { originalImg: { regex: "/projects/" } } }) {
      nodes {
        gatsbyImageData
        fluid {
          originalName
        }
      }
    }
  }
`

// image store in src/images/ folder
function mergeProjectMetaImageData(meta, imageData) {
  if (meta.length !== imageData.length) {
    console.error({ meta, imageData })
    throw new Error(
      `project mate date length should match total number of image, because every project should has a cover image`
    )
  }
  let [metaHead, ...metaTail] = meta
  let [imageDataHead, ...imageDataTail] = imageData

  return metaHead === undefined
    ? []
    : classNameMatchFileName(
        metaHead.className,
        imageDataHead.fluid.originalName
      )
    ? [
        composeObject(metaHead, imageDataHead),
        ...mergeProjectMetaImageData(metaTail, imageDataTail),
      ]
    : mergeProjectMetaImageData([...metaTail, metaHead], imageData)
}

function composeObject(a, b) {
  return { ...a, img: b.gatsbyImageData }
}

function classNameMatchFileName(className, fileName) {
  return new RegExp(className).test(fileName)
}
