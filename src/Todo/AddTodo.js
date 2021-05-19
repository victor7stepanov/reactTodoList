import React, { useState } from 'react'
import PropTypes from 'prop-types'

const styles = {
  button: {
    cursor: 'pointer'
  }
}

function useInputValue(defaultValue = '') {
  const [value, setValue] = useState(defaultValue)

  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value)
    },
    clear: () => setValue(''),
    value: () => value
  }
}

function AddTodo( { onCreate } ) {
  // const [value, setValue] = useState('')

  const input = useInputValue('')

  function submitHandler(event) {
    event.preventDefault()

    if (input.value().trim()) {
      onCreate(input.value())
      // setValue('')
      input.clear()
    }
  }

  return (
    <form style={{ marginBottom: '1rem' }} onSubmit={submitHandler}>
      {/* <input value={value} onChange={event => setValue(event.target.value)} /> */}
      <input {...input.bind} />
      <button type='submit' style={styles.button}>Add todo</button>
    </form>
  )
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired
}

export default AddTodo