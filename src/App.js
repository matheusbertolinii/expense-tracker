import './index.css';
import { useState, useEffect } from 'react';
import Header from './Header';
import Form from './Form';
import Table from './Table'

function App() {
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
  const [categories, setCategories] = useState([
    'Food',
    'Transport',
    'Entertainment',
    'Bills',
    'Shopping',
    'Health',
    'Other'
  ])

  useEffect(() => {
    const expenseList = JSON.parse(localStorage.getItem('expenses'));
    (expenseList ? setExpenses(expenseList) : setExpenses([]))
  }, [])

  useEffect(() => {
    setFilterResults(filter === '' ? expenses : expenses.filter(expense => expense.category === filter))
  }, [expenses, filter])

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

  const total = expenses.reduce((sum, expense) => {
    return sum + Number(expense.amount);
  }, 0);

  return (
    <div className="App">
      <Header />
      <Form
        formData={formData}
        handleSubmit={handleSubmit}
        editID={editID}
        handleChange={handleChange}
        categories={categories}
      />
      <Table expenses={filterResults} handleDelete={handleDelete} handleEdit={handleEdit} />
      <p>Total: {new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(total)}</p>
      <select
        name="filteredCategory"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >

        <option value="">All Categories</option>
        {categories.map(category => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
