import { FaSearch } from "react-icons/fa";

const Summary = ({ expenses, setSearch, search }) => {
  const total = expenses.reduce((sum, expense) => {
    return sum + Number(expense.amount);
  }, 0);

  return (
    <div className='totalArea'>
      <div className='wrapper'>
        <FaSearch className='insideIcons' />
        <input
          className='searchInput'
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search expenses...'
        />
      </div>

      <p className='totalExpenses'> <span>Total Expenses:</span> <span className='totalNumber'> {new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(total)}</span></p>
    </div>
  )
}

export default Summary