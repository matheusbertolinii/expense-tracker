import './index.css';
import { useState, useEffect, useMemo } from 'react';
import Header from './Header';
import AddForm from './AddForm';
import ExpenseTable from './ExpenseTable'
import Summary from './Summary';
import CategoryForm from './CategoryForm';
import Filter from './Filter.js'

function App() {
  const getToday = () => {
    const today = new Date()

    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  const defaultCategories = {
    'Food': '#facc15',
    'Transport': '#a78bfa',
    'Entertainment': '#f472b6',
    'Bills': '#60a5fa',
    'Shopping': '#fb923c',
    'Health': '#2dd4bf',
    'Education': '#c084fc',
    'Housing': '#fb7185',
    'Travel': '#38bdf8',
    'Gifts': '#e879f9',
    'Personal': '#4ade80',
    'Others': '#94a3b8',
  }

  const [expenses, setExpenses] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    date: getToday()
  })

  const [editID, setEditID] = useState(null)
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories')
    return savedCategories ? JSON.parse(localStorage.getItem('categories')) : defaultCategories
  })
  const [categoryName, setCategoryName] = useState('')
  const [categoryColor, setCategoryColor] = useState('')
  const [sort, setSort] = useState({
    key: null,
    direction: null
  })
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [filterAmount, setFilterAmount] = useState('')
  const [activeCategories, setActiveCategories] = useState([])
  const [addNewCategory, setAddNewCategory] = useState(false)

  useEffect(() => {
    const expenseList = JSON.parse(localStorage.getItem('expenses'));
    (expenseList ? setExpenses(expenseList) : setExpenses([]))
    const categoriesList = JSON.parse(localStorage.getItem('categories'));
    (categoriesList ? setCategories(categoriesList) : setCategories({}))
  }, [])

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories))
  }, [categories])

  useEffect(() => {
    setCurrentPage(1)
  }, [filter, sort, search, filterDate, filterAmount])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editID !== null) {
      const updatedExpense = expenses.map(expense => expense.id === editID ? { ...expense, ...formData } : expense)
      setExpenses(updatedExpense)
      localStorage.setItem('expenses', JSON.stringify(updatedExpense))
      setEditID(null)

    } else {

      const id = expenses.length ? expenses[expenses.length - 1].id + 1 : 1
      const newExpense = {
        id,
        ...formData
      }
      const updatedExpense = [...expenses, newExpense]
      setExpenses(updatedExpense)
      localStorage.setItem('expenses', JSON.stringify(updatedExpense))
    }
    setFormData({
      name: '',
      amount: '',
      category: '',
      date: getToday()
    })
  }

  const handleDelete = (id) => {
    const newExpenseList = expenses.filter(expense => expense.id !== id)
    setExpenses(newExpenseList)
    localStorage.setItem('expenses', JSON.stringify(newExpenseList))
  }

  const handleEdit = (id) => {
    const expense = expenses.find(expense => expense.id === id)
    setFormData({
      name: expense.name,
      amount: expense.amount,
      category: expense.category,
      date: expense.date
    })
    setEditID(id)
  }

  const handleAddCategory = (e) => {
    e.preventDefault(e)
    setCategories(prev => ({
      ...prev,
      [categoryName]: categoryColor
    }))
    setCategoryColor('')
    setCategoryName('')
    setAddNewCategory(false)
  }

  const handleSort = (key) => {
    setSort(prev => {
      if (prev.key !== key) {
        return {
          key,
          direction: 'asc'
        }
      }
      if (prev.direction === 'asc') {
        return {
          key,
          direction: 'desc'
        }
      }
      return {
        key: null,
        direction: null
      }
    }
    )
  }

  const toggleCategories = (category) => {
    setActiveCategories(prev =>
      activeCategories.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    )
  }

  const shownExpenses = useMemo(() => {
    let result = [...expenses]

    if (filter !== '') {
      result = result.filter(expense => expense.category === filter)
    }

    if (search !== '') {
      result = result.filter(expense => ((expense.name).toLowerCase()).includes(search.toLowerCase()))
    }

    if (sort.key) {
      result.sort((a, b) => {
        if (!sort.key) return 0

        if (sort.key === 'name') {
          const comparison = a.name.localeCompare(b.name)
          return sort.direction === 'asc' ? comparison : -comparison
        }

        if (sort.key === 'amount') {
          const comparison = Number(a.amount) - Number(b.amount)
          return sort.direction === 'desc' ? comparison : -comparison
        }
        if (sort.key === 'date') {
          const comparison = new Date(a.date) - new Date(b.date)
          return sort.direction === 'desc' ? comparison : -comparison
        }
      })
    }

    if (filterAmount !== '') {
      result = result.filter(expense => (Number(expense.amount) >= Number(filterAmount)))
    }

    if (filterDate !== '') {
      result = result.filter(expense => expense.date === filterDate)
    }

    if (activeCategories.length > 0) {
      result = result.filter(expense => (activeCategories).includes(expense.category))
    }

    return result
  }, [expenses, filter, search, sort, filterAmount, filterDate, activeCategories])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const totalPages = Math.ceil(shownExpenses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedExpenses = shownExpenses.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const paginationFirstItem = paginatedExpenses.length === 0 ? 0 : startIndex + 1

  const paginationLastItem = Math.min(
    startIndex + itemsPerPage,
    paginatedExpenses.length
  )

  useEffect(() => {
    const totalPages = Math.ceil(shownExpenses.length / itemsPerPage)

    if (totalPages === 0) {
      setCurrentPage(1)
    }
    else if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [shownExpenses, currentPage])

  return (
    <div className="App">
      <Header />
      <main className='content'>
        <div className='formWrapper'>
          <AddForm
            formData={formData}
            handleSubmit={handleSubmit}
            editID={editID}
            handleChange={handleChange}
            categories={categories}
          />
        </div>

        <div className='expenseList'>
          <Summary
            expenses={expenses}
            setExpenses={setExpenses}
            filter={filter}
            setFilter={setFilter}
            setSearch={setSearch}
            search={search}
            categories={categories} />
          <Filter
            filter={filter}
            setFilter={setFilter}
            categories={categories}
            expenses={expenses}
            filterAmount={filterAmount}
            filterDate={filterDate}
            setFilterAmount={setFilterAmount}
            setFilterDate={setFilterDate}
            toggleCategories={toggleCategories}
            activeCategories={activeCategories}
            setActiveCategories={setActiveCategories}
            setCategories={setCategories}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            categoryColor={categoryColor}
            setCategoryColor={setCategoryColor}
            handleAddCategory={handleAddCategory}
            addNewCategory={addNewCategory}
            setAddNewCategory={setAddNewCategory}
          />
          <ExpenseTable
            allItems={shownExpenses}
            expenses={paginatedExpenses}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            categories={categories}
            sort={sort}
            handleSort={handleSort}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            firstItem={paginationFirstItem}
            lastItem={paginationLastItem}
          />
        </div>

      </main>
    </div >
  );
}

export default App;
