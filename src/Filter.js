import { useState, useEffect, useRef } from 'react'
import { IoIosRemoveCircle } from "react-icons/io";
import { FaPlus, FaSearch } from "react-icons/fa";

const Filter = ({
  filterAmount, filterDate, setFilterAmount, setFilterDate, expenses, categories, toggleCategories, activeCategories, setActiveCategories, setCategories, categoryName, setCategoryName, categoryColor, setCategoryColor, handleAddCategory, addNewCategory, setAddNewCategory
}) => {

  const [showMoreCategories, setShowMoreCategories] = useState(false)
  const [displayedCategories, setDisplayedCategories] = useState(Object.keys(categories).slice(0, 9))
  const [searchCategories, setSearchCategories] = useState('')


  const highestExpense = expenses.length > 0
    ? Math.max(...expenses.map(expense => Number(expense.amount)))
    : null;

  const percentage = (filterAmount / highestExpense) * 100

  const clearFilter = () => {
    setFilterAmount('')
    setFilterDate('')
    setActiveCategories([])
  }
  const moreCategories = Object.entries(categories).slice(9)

  const popoverRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target)
      ) {
        setShowMoreCategories(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  const handleRemoveCategory = (category) => {
    setCategories(prev => {
      const updatedCategories = { ...prev }
      delete updatedCategories[category]
      return updatedCategories
    })
    setDisplayedCategories(prev => prev.filter(item => item !== category))
    setActiveCategories(prev => prev.filter(item => item != category))
  }

  const searchedCategories = Object.entries(categories).filter(
    ([category]) =>
      category.toLowerCase().includes(searchCategories.toLowerCase())
  )

  return (
    <div className='filterWrapper'>
      <div className='filterItem'>
        <label className='filterWrapperLabel' htmlFor="dateRange">Date Range</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>
      <div className='filterItem'>
        <label className='filterWrapperLabel' htmlFor="amountRange">Amount Range</label>
        <div className='rangeWrapper'>
          <span>R${filterAmount || '0'} - R${highestExpense}</span>
          <input
            max={highestExpense}
            type="range"
            value={filterAmount}
            onChange={(e) => setFilterAmount(e.target.value)}
            style={{ "--value": `${percentage}%` }}
          />
        </div>
      </div>

      <div className='categoryFilter'>
        <label className='filterWrapperLabel' htmlFor="categoryFilter">Filter By Categories</label>

        <div className='categories'>
          {
            displayedCategories.map(category => {
              const isActive = activeCategories.includes(category)
              const color = categories[category]
              return (
                <button
                  value={category}
                  onClick={() => toggleCategories(category)}
                  className={`categoryButton category ${isActive ? 'active' : ""}`}
                  style={{ '--category-color': color }}
                >
                  {category}
                </button>
              )
            })
          }
          {
            moreCategories.length > 0 && (
              <div ref={popoverRef}>
                <button
                  className='categoryButton category plusBtn'
                  onClick={() => setShowMoreCategories(prev => !prev)}
                >
                  {showMoreCategories ? 'Show less' : `Show more`}
                </button>


                {showMoreCategories && (
                  <div className='categoriesPopover'>
                    <div className='wrapper categoriesInputWrapper'>
                      <FaSearch className='insideIcons' />
                      <input
                        className='searchInputCategories'
                        type="text"
                        placeholder='Search expenses...'
                        value={searchCategories}
                        onChange={(e) => setSearchCategories(e.target.value)}
                      />
                    </div>
                    <div className='categoriesPopoverList'>
                      {searchedCategories.map(([category, color]) => {
                        return (
                          <div className='categoriesPopoverBtn' style={{ backgroundColor: `color-mix(${color} 20%, transparent)` }}>
                            <label htmlFor="" style={{ color: 'white' }}>{category}</label>
                            <div className='categoriesButtonWrapper'>
                              <button className='removeCategoryBtn' onClick={() => handleRemoveCategory(category)}><IoIosRemoveCircle /></button>

                              <input
                                className='categoryCheckbox'
                                style={{ '--category-check-color': color }}
                                disabled={displayedCategories.length >= 9 && !displayedCategories.includes(category)}
                                checked={displayedCategories.includes(category)}
                                type="checkbox"
                                onChange={() => setDisplayedCategories(prev => {
                                  if (prev.includes(category)) {
                                    return prev.filter(item => item !== category)
                                  }
                                  return [...prev, category]
                                })}
                              />

                            </div>

                          </div>

                        )
                      })}
                    </div>
                    <div>
                      <button
                        className='categoriesPopoverNew'
                        onClick={() => setAddNewCategory(prev => !prev)}> <FaPlus /> Add New Category</button>
                      {addNewCategory &&
                        <form onSubmit={handleAddCategory} className='categoryForm'>
                          <input
                            placeholder='Category name'
                            type='text'
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                          />

                          <input
                            className='colorInput'
                            type="color"
                            value={categoryColor}
                            onChange={(e) => setCategoryColor(e.target.value)}
                          />
                          <button type='submit' className='btn'>OK</button>
                        </form>
                      }
                    </div>
                  </div>
                )}
              </div>
            )
          }

        </div>
      </div>
      <button onClick={clearFilter} className=' clearBtn'>Clear</button>
    </div >
  )
}

export default Filter