import * as React from "react"
import { graphql } from "gatsby"

const NotFoundPage = () => {
  return <h1>404: Not Found</h1>
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
