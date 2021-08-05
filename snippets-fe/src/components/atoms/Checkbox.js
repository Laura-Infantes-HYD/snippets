import React from 'react'

const Checkbox = ({ label, placeholder="" }) => {

    return (
        <>
        <input type="checkbox" value={label} id={label} placeholder={placeholder}></input>
        <label htmlFor={label} >{label}</label>
      </>
    )
}

export default Checkbox
