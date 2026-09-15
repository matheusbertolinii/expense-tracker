import './index.css';
import { useState, useEffect } from 'react';
import Header from './Header';
import AddForm from './AddForm';
import ExpenseTable from './ExpenseTable'
import Summary from './Summary';
import CategoryForm from './CategoryForm';
import Filter from './Filter.js'

function App() {
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
    date: new Date().toISOString().split("T")[0]
  })
  const [editID, setEditID] = useState(null)
  const [filter, setFilter] = useState('')
  const [filterResults, setFilterResults] = useState('')
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

  useEffect(() => {
    const expenseList = JSON.parse(localStorage.getItem('expenses'));
    (expenseList ? setExpenses(expenseList) : setExpenses([]))
    const categoriesList = JSON.parse(localStorage.getItem('categories'));
    (categoriesList ? setCategories(categoriesList) : setCategories({}))
  }, [])

  useEffect(() => {
    setFilterResults(filter === '' ? expenses : expenses.filter(expense => expense.category === filter))
  }, [expenses, filter])

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories))
  }, [categories])

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
      date: new Date().toISOString().split("T")[0]
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

  const sortedExpenses = [...filterResults].sort((a, b) => {
    if (!sort.key) return 0

    if (sort.key === 'name') {
      const comparison = a.name.localeCompare(b.name)
      return sort.direction === 'asc' ? comparison : -comparison
    }

    if (sort.key === 'amount') {
      const comparison = Number(a.amount) - Number(b.amount)
      return sort.direction === 'asc' ? comparison : -comparison
    }
    if (sort.key === 'date') {
      const comparison = new Date(a.date) - new Date(b.date)
      return sort.direction === 'asc' ? comparison : -comparison
    }
    return 0
  })

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
          <CategoryForm
            handleAddCategory={handleAddCategory}
            categoryColor={categoryColor}
            setCategoryColor={setCategoryColor}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
          />
        </div>

        <div className='expenseList'>
          <Summary
            expenses={expenses}
            setExpenses={setExpenses}
            filter={filter}
            setFilter={setFilter}
            setFilterResults={setFilterResults}
            categories={categories} />
          <Filter
            filter={filter}
            setFilter={setFilter}
            categories={categories}
          />
          <ExpenseTable
            expenses={sortedExpenses}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            categories={categories}
            sort={sort}
            handleSort={handleSort} />
        </div>

      </main>
    </div >
  );
}

export default App;
