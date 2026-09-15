import React from 'react'
import Row from './Row'
import SortIcon from './SortIcon'

const ExpenseTable = ({ expenses, handleDelete, handleEdit, categories, sort, handleSort }) => {
  return (
    <main>
      {expenses.length ?
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')} className='noselect'>
                Name

                <SortIcon column='name' sort={sort} />
              </th>
              <th onClick={() => handleSort('amount')} className='noselect'>
                Amount
                <SortIcon column='amount' sort={sort} />
              </th>
              <th>
                Category
              </th>
              <th onClick={() => handleSort('date')} className='noselect'>
                Date
                <SortIcon column='date' sort={sort} />
              </th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map(expense => (
              <Row key={expense.id} expense={expense} handleDelete={handleDelete} handleEdit={handleEdit} categories={categories} />
            ))}
          </tbody>
        </table>
        : <p className='listEmpty'>Your expense list is empty. Congratulations!</p>}
    </main>
  )
}

export default ExpenseTable