import React from 'react'
import Input from './Input'
import Select from './Select'

const EditCell = ({
  editName, setEditName, editAmount, setEditAmount, editCategory, setEditCategory, editDate, setEditDate, editID, saveEdit
}) => {
  return (
    <form action="" onSubmit={(e) => e.preventDefault()}>
      <Input
        required
        id='editExpenseName'
        itemName='Expense Name'
        type='text'
        placeholder='Expense Name'
        value={editName}
        setValue={setEditName}
      />

      <Input
        required
        id='editExpenseAmount'
        itemName='Amount'
        type='number'
        placeholder='Amount'
        value={editAmount}
        setValue={setEditAmount}
      />

      <Select
        category={editCategory}
        setCategory={setEditCategory}
      />

      <Input
        required
        id='editExpenseDate'
        itemName='Date'
        type='date'
        placeholder='Date'
        value={editDate}
        setValue={setEditDate}
      />

      <button type="submit" onClick={(e) => saveEdit(editID)}>Save changes</button>
    </form>
  )
}

export default EditCell