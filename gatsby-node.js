// const path = require(`path`)
// const { createFilePath } = require(`gatsby-source-filesystem`)

// exports.createPages = async ({ graphql, actions, reporter }) => {
//   const { createPage } = actions

//   // Define a template for blog post
//   const blogPost = path.resolve(`./src/templates/blog-post.js`)

//   // Get all markdown blog posts sorted by date
//   const result = await graphql(
//     `
//       {
//         allMarkdownRemark(
//           sort: { fields: [frontmatter___date], order: ASC }
//           limit: 1000
//         ) {
//           nodes {
//             id
//             fields {
//               slug
//             }
//           }
//         }
//       }
//     `
//   )

//   const posts = result.data.allMarkdownRemark.nodes

//   // Create blog posts pages
//   // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
//   // `context` is available in the template as a prop and as a variable in GraphQL

//   if (posts.length > 0) {
//     posts.forEach((post, index) => {
//       const previousPostId = index === 0 ? null : posts[index - 1].id
//       const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

//       createPage({
//         path: post.fields.slug,
//         component: blogPost,
//         context: {
//           id: post.id,
//           previousPostId,
//           nextPostId,
//         },
//       })
//     })
//   }
// }

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `Mdx`) {
//     const value = createFilePath({ node, getNode })

//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions

//   // Explicitly define the siteMetadata {} object
//   // This way those will always be defined even if removed from gatsby-config.js

//   // Also explicitly define the Markdown frontmatter
//   // This way the "MarkdownRemark" queries will return `null` even when no
//   // blog posts are stored inside "content/blog" instead of returning an error
//   createTypes(`
//     type SiteSiteMetadata {
//       author: Author
//       siteUrl: String
//       social: Social
//     }

//     type Author {
//       name: String
//       summary: String
//     }

//     type Social {
//       twitter: String
//     }

//     type MarkdownRemark implements Node {
//       frontmatter: Frontmatter
//       fields: Fields
//     }

//     type Frontmatter {
//       title: String
//       description: String
//       date: Date @dateformat
//     }

//     type Fields {
//       slug: String
//     }
//   `)
// }
const projects = require("./content/lab/projects.json")

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode, createTypes } = actions

  createTypes(`
  type Project implements Node { cover: File @link(from: "fileName", by: "name") }
  `)

  projects.forEach(project => {
    createNode({
      ...project,
      id: createNodeId(`project-${project.className}`),
      parent: null,
      children: [],
      internal: {
        type: "Project",
        content: JSON.stringify(project),
        contentDigest: createContentDigest(project),
      },
    })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(`
    query {
      allContentfulPosts(sort: { fields: [createdAt], order: DESC }) {
        nodes {
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }
  const posts = result.data.allContentfulPosts.nodes

  posts.forEach(post => {
    actions.createPage({
      path: post.slug,
      component: require.resolve("./src/templates/post.js"),
      context: {
        slug: post.slug,
      },
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {
  if (page.path === "/") {
    page.context.layout = "special"
    actions.createPage(page)
  }
}
