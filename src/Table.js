import React from 'react'
import Row from './Row'

const Table = ({ expenses, handleDelete, handleEdit }) => {
  return (
    <main>
      {expenses.length ?
        <table>
          <thead>
            <tr>
              <th>Expense Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map(expense => (
              <Row key={expense.id} expense={expense} handleDelete={handleDelete} handleEdit={handleEdit} />
            ))}
          </tbody>
        </table>
        : <p className='listEmpty'>Your expense list is empty. Congratulations!</p>}
    </main>
  )
}

export default Table