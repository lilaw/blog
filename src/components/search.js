import * as React from "react"
import { matchSorter, rankings } from "match-sorter"
import { css } from "@emotion/react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

const searchStyle = css`
  width: 100%;
  margin-bottom: 2rem;
  @media screen and (min-width: 43.75em) {
    justify-self: right;
    align-self: center;
    width: 30rem;
  }

  @media screen and (min-width: 60.25em) {
    width: 46rem;
  }
  .search {
    &__form {
      display: flex;
      margin-right: 1rem;
      margin-bottom: 0.5em;
    }

    &__input {
      width: 95%;
      height: 3rem;
      padding: 0.2em 2em 0.2em 0.7em;
      border-radius: 0.3em;
      @media screen and (min-width: 43.75em) {
      }
    }
    &__result-counter {
      color: var(--color-grey-e);
      float: right;
      margin-left: -1em;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__tags {
      list-style: none;
      gap: 0.5em;
      display: flex;
      flex-wrap: wrap;
    }
    &__tag {
    }
    &__tag-btn {
      color: currentColor;
      padding: 0.3em 0.5em;
      border: var(--color-lilac-b) solid 0.1em;
      border-radius: 0.2em;
    }
  }
  .blogPosts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 2fr));
    row-gap: 2em;
    column-gap: 1.5em;
  }
  .blogPostCard {
    &__title {
      margin-bottom: 0.4em;
    }
    grid-column: auto / span 2;
    @media screen and (min-width: 24.15em) {
      max-width: 45rem;
    }
  }
  .blogPostCard__link,
  a {
    color: currentColor;
    text-decoration: none;
  }
`

// eslint-disable-next-line no-unused-vars
const TagBtn = styled.button`
  background-color: ${props =>
    props.isSelected ? `var(--color-lilac-b)` : `transparent`};
`

function useQueryParamState(searchParamName) {
  const [value, setValue] = React.useState(() => {
    if (typeof window == "undefined") return ""

    const searchParams = new URL(window.location.href).searchParams
    if (searchParams.has(searchParamName))
      return searchParams.get(searchParamName)
    else return ""
  })

  React.useEffect(() => {
    const url = new URL(window.location.href)

    if (value) {
      url.searchParams.set(searchParamName, value)
      window.history.pushState(window.history.state, "", url)
    } else {
      url.searchParams.delete(searchParamName)
      window.history.replaceState(window.history.state, "", url)
    }
  }, [value, searchParamName])

  return [value, setValue]
}

export default function Search(props) {
  const [value, setValue] = useQueryParamState("query")

  const articles = React.useMemo(() => {
    return props.blogposts.allContentfulPosts.nodes.map(art => ({
      slug: art.slug,
      title: art.title,
      excerpt: art.content.childMdx.excerpt,
    }))
  }, [props.blogposts.allContentfulPosts.nodes])
  // eslint-disable-next-line no-unused-vars
  const tags = [
    "JavaScript",
    "Catdfdf",
    "JavaScript",
    "JavaScript",
    "JavaScript",
    "JavaScript",
    "JavaScript",
  ]

  const [filteredArticle, setFilteredArticle] = React.useState(
    value ? [] : articles
  )
  React.useEffect(() => {
    if (!value) return setFilteredArticle(articles)

    const options = {
      keys: [
        { key: "title", threshold: rankings.CONTAINS },
        { key: "excerpt", threshold: rankings.CONTAINS, maxRanking: Infinity },
      ],
    }

    setFilteredArticle(searchPosts(articles, value, options))
  }, [value, articles])

  // eslint-disable-next-line no-unused-vars
  function handleTagClick(tag) {
    setValue(v => {
      if (v.includes(tag)) return v.split(tag).join("").trim()
      return `${v} ${tag}`.trim()
    })
  }

  return (
    <>
      <div className="headingAndSearch">
        <h1 className="heading-1">Writing & Article</h1>
        <div className="search" css={searchStyle}>
          <form
            className="search__form"
            method="GET"
            action="/writing"
            onSubmit={e => e.preventDefault()}
          >
            <input
              className="search__input"
              name="q"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Search blogs"
              autoFocus
            />
            <div className="search__result-counter">
              {filteredArticle.length}
            </div>
          </form>
          <ul className="search__tags">
            {/* {tags.map(tag => (
          <li className="search__tag" key={tag}><TagBtn className="search__tag-btn" isSelected={value.includes(tag)} onClick={() => handleTagClick(tag)} >{tag}</TagBtn></li>
        ))} */}
          </ul>
        </div>
      </div>
      <div className="blogPosts">
        {filteredArticle.map(art => (
          <article key={art.slug} className="blogPostCard">
            <Link to={`/${art.slug}`}>
              <h2 className="blogPostCard__title">{art.title}</h2>
              <p className="blogPostCard__excerpt">{art.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </>
  )
}

function searchPosts(items, keywords, options) {
  const allResult = matchSorter(items, keywords, options)
  const searchs = Array.from(new Set(keywords.split(" ").filter(s => s !== "")))
  if (searchs.length < 2) return allResult

  const additionOptions = {
    ...options,
    keys: options.keys.map(key => {
      if (typeof key == "string") key = { key }
      return {
        ...key,
        maxRanking: Infinity,
        threshold: rankings.WORD_STARTS_WITH,
      }
    }),
  }

  const additionResult = searchs
    .map(word => matchSorter(items, word, additionOptions))
    .flat()

  // each key should include those keyword that after spliting space
  new Set(additionResult).forEach(item => {
    const repeatedItem = additionResult.filter(i => i == item)
    if (repeatedItem.length === searchs.length) allResult.push(item)
    console.log({ length: repeatedItem.length, size: searchs.length })
  })

  return [...new Set(allResult)]
}
