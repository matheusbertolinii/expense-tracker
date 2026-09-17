import React from 'react'
import Row from './Row'
import SortIcon from './SortIcon'
import { useState } from 'react'

const ExpenseTable = ({ expenses, handleDelete, handleEdit, categories, sort, handleSort, firstItem, lastItem, currentPage, setCurrentPage, totalPages, allItems }) => {

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
            <tr>
              <td colSpan={5} className='tdPages'>
                <div className='pagination'>
                  <p className='paginationParagraph'>Showing {firstItem} - {lastItem} of {allItems.length} expenses</p>
                  <div>
                    <button
                      className='paginationBtn'
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(page => page - 1)}
                    >
                      Previous
                    </button>

                    {
                      Array.from({ length: totalPages }, (_, index) => {
                        const page = index + 1
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`paginationBtn ${currentPage === page ? 'active' : ''}`}
                          > {page} </button>
                        )
                      })
                    }
                    <button
                      className='paginationBtn'
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(page => page + 1)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        : <p className='listEmpty'>Your expense list is empty. Congratulations!</p>}
    </main>
  )
}

export default ExpenseTable