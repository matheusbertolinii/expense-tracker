import Input from "./Input"
import Select from "./Select"

const AddCell = ({ handleSubmit, amount, setAmount, name, setName, date, setDate, category, setCategory }) => {
  return (
    <form action="" onSubmit={(e) => e.preventDefault()}>
      < Input
        required
        id='expenseName'
        itemName='Expense Name'
        type='text'
        placeholder='Expense Name'
        value={name}
        setValue={setName}
      />

      <Input
        required
        id='expenseAmount'
        itemName='Amount'
        type='number'
        placeholder='Amount'
        value={amount}
        setValue={setAmount}
      />

      <Select
        category={category}
        setCategory={setCategory}
      />

      <Input
        required
        id='expenseDate'
        itemName='Date'
        type='date'
        placeholder='Date'
        value={date}
        setValue={setDate}
      />
      <button type="submit" onClick={handleSubmit}>Add Expense</button>

    </form >
  )
}

export default AddCell