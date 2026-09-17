import React from 'react'
import Cell from './Cell'
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const Row = ({ expense, handleDelete, handleEdit, categories }) => {
  const { id, ...expenseData } = expense
  const [year, month, day] = expense.date.split('-')

  const formattedDate = `${day}/${month}/${year}`

  return (
    <tr>
      <td>{expense.name}</td>

      <td>{new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(expense.amount)}</td>

      <td>
        {
          <span className={`category`} style={{ color: `${categories[expense.category]}`, backgroundColor: `color-mix(in srgb, ${categories[expense.category]} 20%, transparent)` }}>
            {expense.category}
          </span>
        }
      </td>

      <td>{formattedDate}</td>

      <td>
        <button className='editBtn btn' onClick={() => handleEdit(expense.id)}><MdModeEdit className='btnIcon' /></button>
        <button className='deleteBtn btn' onClick={() => handleDelete(expense.id)}><RiDeleteBin6Line className='btnIcon' /></button>
      </td>
    </tr >
  )
}

export default Row