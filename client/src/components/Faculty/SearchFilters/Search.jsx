import React from 'react'
import Button from '@mui/material/Button'
import styles from './Search.module.css'

const Search = () => {
  return (
    <React.Fragment>
      <div className={styles.searchContainer}>
        <input placeholder="Search for any student..." className={styles.searchBar} />
        <Button 
          variant="contained"
          sx={{
            color: "var(--text-light)",
            backgroundColor: "var(--primary-color)",
            borderRadius: "0.5rem",
            padding: "0 1.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          filters
        </Button>
      </div>
    </React.Fragment>
  )
}

export default Search
