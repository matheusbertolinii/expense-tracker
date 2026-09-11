import React from 'react'

const Input = ({ itemName, placeholder, type, value, setValue }) => {
  return (
    <>
      <label htmlFor="">{itemName}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  )
}

export default Input