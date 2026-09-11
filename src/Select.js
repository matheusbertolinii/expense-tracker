import React from 'react'

const Select = ({ category, setCategory }) => {

  const categories = [
    'Food',
    'Transport',
    'Entertainment',
    'Bills',
    'Shopping',
    'Health',
    'Other'
  ]
  return (
    <>
      <label htmlFor="">Select Category</label>
      <select
        name="category"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >

        <option value="" disabled>Select Category</option>
        {categories.map(category => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
    </>
  )
}

export default Select