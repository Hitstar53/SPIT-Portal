import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import styles from './Search.module.css'

const Search = (props) => {
  const [newData, setNewData] = React.useState({})
  const handleDataChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value })
  }
  const handleDataSubmit = async (e) => {
    e.preventDefault()
    props.onSubmit(newData)
  }
  return (
    <React.Fragment>
      <Box 
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleDataSubmit}
        className={styles.searchContainer}
      >
        <input 
          name="search"
          onChange={handleDataChange}
          placeholder="Search for any student..." 
          className={styles.searchBar}
        />
        <Button 
          type="submit"
          variant="contained"
          sx={{
            color: "var(--text-light)",
            backgroundColor: "var(--primary-color)",
            borderRadius: "0.5rem",
            padding: "0 1.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "var(--secondary-color)",
            },
          }}
        >
          Go
        </Button>
      </Box>
    </React.Fragment>
  )
}

export default Search
