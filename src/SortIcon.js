import React from 'react'
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const SortIcon = ({ column, sort }) => {
  if (sort.key !== column) {
    return <FaSort />
  }
  return sort.direction === 'asc' ? <FaSortUp /> : <FaSortDown />
}

export default SortIcon