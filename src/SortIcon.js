import React from 'react'
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const SortIcon = ({ column, sort }) => {
  if (sort.key !== column) {
    return <FaSort />
  }
  return sort.direction === 'desc' ? <FaSortUp style={{ color: '#52B788' }} /> : <FaSortDown style={{ color: '#52B788' }} />
}

export default SortIcon