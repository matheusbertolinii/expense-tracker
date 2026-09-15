import React from 'react'
import { LuFilter } from "react-icons/lu";

const Filter = ({ filter, setFilter, categories }) => {
  return (
    <>
      <div className='wrapper'>
        <LuFilter className='insideIcons' />
        <select
          className='filterSelect'
          name="filteredCategory"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {
            Object.entries(categories).map(([key]) => {
              return (
                <option value={key} key={key}>
                  {key}
                </option>
              )
            })
          }
        </select>
      </div>

    </>
  )
}

export default Filter