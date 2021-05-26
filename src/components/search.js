import * as React from 'react'
import {matchSorter, rankings} from 'match-sorter'
import {Link } from "gatsby"

function useQueryParamState(searchParamName) {
  const  [value, setValue] = React.useState(() => {
    if (typeof window == 'undefined') return ""
    
    let searchParams = new URL(window.location.href).searchParams
    if (searchParams.has(searchParamName)) return searchParams.get(searchParamName)
    else return ''
  })
  
  React.useEffect(() => {
    let url = new URL(window.location.href)
    
    if (value) {
      url.searchParams.set(searchParamName, value)
      window.history.pushState(window.history.state, '', url)
    } else {
      url.searchParams.delete(searchParamName)
      window.history.replaceState(window.history.state, '', url)
    }
    
  }, [value, searchParamName])

  return [value, setValue]
}


export default function Search(props) {
  const [value, setValue] = useQueryParamState('query')

  const articles = React.useMemo(() => {
    return props.blogposts.allContentfulPosts.nodes.map(art => ({
              slug: art.slug,
              title: art.title,
              excerpt: art.content.childMdx.excerpt,
    }))
  }, [props.blogposts.allContentfulPosts.nodes])
  const tags = ['JavaScript']
  
  const [filteredArticle, setFilteredArticle] = React.useState(value ? [] : articles)
  React.useEffect(() => {
    if(!value) return setFilteredArticle(articles)

    let options = {
      keys: [
        {key: 'title', threshold: rankings.CONTAINS},
        {key: 'excerpt', threshold: rankings.CONTAINS, maxRanking: Infinity}
      ]
    }
    
    setFilteredArticle(searchPosts(articles, value, options))
    
  }, [value, articles])
  
  function handleTagClick(tag) {
    setValue(v => {
      if (v.includes(tag)) return v.split(` %{tag}`).join('').trim()
      return `${v} ${tag}`.trim()
    })
  }


  return (
    <>
    <div className="search">
      <form className="search__form" method="GET" action='/writing' onSubmit={e => e.preventDefault()}>
        <input className="search__input" name="q" value={value} onChange={e => setValue(e.target.value)} placeholder="Search blogs" autoFocus/>
        <div className="search__result-counter">{filteredArticle.length}</div>
      </form>
      <ul className="search__tags">
        {/* {tags.map(tag => (
          <li className="search__tag" key={tag}><button className="search__tag-btn" isSelected={value.includes(tag)} onClick={() => handleTagClick(tag)} >{tag}</button></li>
        ))} */}
      </ul>
      
    <pre>{value}</pre>
    <pre>{JSON.stringify(filteredArticle, null, 2)}</pre>
    </div>
    <div className="content">
      {filteredArticle
        .map(art => (
          <article key={art.slug}>
            <Link to={`/${art.slug}`}>
              <h2>{art.title}</h2>
              <p className="excerpt">{art.excerpt}</p>
            </Link>
          </article>
        ))}
    </div>
    </>
  )
}



function searchPosts(items, keywords, options) {
  let allResult = matchSorter(items, keywords, options)
  const searchs = Array.from( new Set(keywords.split(' ').filter(s => s !== '')))
  if (searchs.length < 2) return allResult

  const additionOptions = {
    ...options,
    keys: options.keys.map(key => {
      if (typeof key == 'string') key = {key}
      return {
        ...key,
        maxRanking: Infinity,
        threshold: rankings.WORD_STARTS_WITH
      }
    })
  }

  let additionResult = searchs
    .map(word => matchSorter(items, word, additionOptions))
    .flat()
  
  // each key should include those keyword that after spliting space
  new Set(additionResult).forEach(item => {
    const repeatedItem = additionResult.filter(i => i == item)
    if (repeatedItem.length === searchs.length) allResult.push(item)
    console.log({length: repeatedItem.length , size: searchs.length})
  })
  
  console.log({additionResult, allResult})
  return [...new Set(allResult)]
}