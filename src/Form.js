const Form = ({
  handleChange, handleSubmit, formData, editID, categories
}) => {

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          required
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Add Expense"
        />
        <input
          required
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
        />
        <select
          required
          name="category"
          value={formData.category}
          onChange={handleChange}
        >

          <option value="" disabled>Select Category</option>
          {categories.map(category => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          required
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <button type="submit">
          {editID !== null ? "Save Changes" : "Add Expense"}
        </button>
      </form>

      {/* {editID === null
        ? <AddCell
          handleSubmit={handleSubmit}
          amount={amount}
          setAmount={setAmount}
          name={name}
          setName={setName}
          date={date}
          setDate={setDate}
          category={category}
          setCategory={setCategory}
        />
        : <EditCell
          editID={editID}
          editName={editName}
          setEditName={setEditName}
          editAmount={editAmount}
          setEditAmount={setEditAmount}
          editCategory={editCategory}
          setEditCategory={setEditCategory}
          editDate={editDate}
          saveEdit={saveEdit}
          setEditDate={setEditDate}
        />
      } */}
    </>
  )
}

export default Form