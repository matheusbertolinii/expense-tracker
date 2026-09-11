import React from 'react'
import Cell from './Cell'

const Row = ({ expense, handleDelete, handleEdit }) => {
  const { id, ...expenseData } = expense

  return (
    <tr>
      {Object.entries(expenseData).map(([key, value]) => {
        if (key === "amount") {
          value = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(value)
        }
        return (
          <Cell key={key} celldata={value} />
        )
      })}
      <td>
        <button onClick={() => handleEdit(expense.id)}>Edit</button>
        <button onClick={() => handleDelete(expense.id)}>Delete</button>
      </td>
    </tr >
  )
}

export default Row