import React from 'react'
import { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";

const Summary = ({ expenses, setFilterResults }) => {
  const total = expenses.reduce((sum, expense) => {
    return sum + Number(expense.amount);
  }, 0);

  const [search, setSearch] = useState('')

  useEffect(() => {
    const searchedExpenses = expenses.filter(expense => ((expense.name).toLowerCase()).includes(search.toLowerCase()))
    setFilterResults(searchedExpenses)
  }, [expenses, search])

  return (
    <div className='totalArea'>
      <div className='wrapper'>
        <FaSearch className='insideIcons' />
        <input
          className='searchInput'
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search expenses...'
        />
      </div>

      <p className='totalExpenses'> <span>Total Expenses:</span> <span className='totalNumber'> {new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(total)}</span></p>
    </div>
  )
}

export default Summary