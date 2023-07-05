import React from 'react'
import styles from './Search.module.css'

const Search = () => {
  return (
    <div>
      search using filters
      <input placeholder="Search for any student..." className={styles.searchBar} />
    </div>
  )
}

export default Search
