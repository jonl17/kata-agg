const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pages = await graphql(`
    {
      allPrismicPage {
        nodes {
          id
          uid
        }
      }
    }
  `)

  const works = await graphql(`
    {
      allPrismicWork {
        nodes {
          id
          uid
        }
      }
    }
  `)

  const pageTemplate = path.resolve(__dirname, `src/templates/Page/Page.tsx`)
  const workTemplate = path.resolve(__dirname, `src/templates/Work/Work.tsx`)

  pages.data.allPrismicPage.nodes.forEach(node => {
    let path = `/${node.uid}`

    if (node.uid === "frontpage") {
      path = `/`
    } else {
      path = `/${node.uid}`
    }

    createPage({
      path: path,
      component: pageTemplate,
      context: {
        id: node.id,
      },
    })
  })

  works.data.allPrismicWork.nodes.forEach(node => {
    createPage({
      path: `/work/${node.uid}`,
      component: workTemplate,
      context: {
        id: node.id,
      },
    })
  })
}
