import { CiCirclePlus } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";

const AddForm = ({
  handleChange, handleSubmit, formData, editID, categories
}) => {

  return (
    <div className="form">
      <div>
        <CiCirclePlus className="addIcon" />
        <p>Add Expense</p>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Expense Name</label>
        <input
          required
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g Groceries"
        />
        <label htmlFor="amount">Amount ($)</label>
        <input
          required
          id="amount"
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="0.00"
        />
        <label htmlFor="category">Category</label>
        <select
          required
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >

          <option value="" disabled>Select Category</option>
          {
            Object.entries(categories).map(([key]) => {
              return (
                <option value={key} key={key}>
                  {key}
                </option>
              )
            })
          }
          {/* {categories.map(category => (
            <option value={category} key={category}>
              {category}
            </option>
          ))} */}
        </select>
        <label htmlFor="date">Date</label>
        <input
          required
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <button type="submit" className="submitBtn">
          <FaPlus />
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
    </div>
  )
}

export default AddForm