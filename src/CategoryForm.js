import React from 'react'
import { FaPlus } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

const CategoryForm = ({ handleAddCategory, categoryColor, setCategoryColor, categoryName, setCategoryName }) => {
  return (
    <form onSubmit={handleAddCategory} className='form categoryForm'>
      <div>
        <CiCirclePlus className="addIcon" />
        <p>Add Category</p>
      </div>
      <label htmlFor="categoryName">Category Name</label>
      <input
        required
        id='categoryName'
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <div className='categoryBtnsWrapper'>
        <div>
          <label htmlFor="categoryColor">Category Color:</label>
          <input
            required
            className='colorInput'
            type="color"
            id='categoryColor'
            value={categoryColor}
            onChange={(e) => setCategoryColor(e.target.value)} />
        </div>
        <button type="submit" className="submitBtn">
          <FaPlus />
          Add Color
        </button>
      </div>
    </form>
  )
}

export default CategoryForm