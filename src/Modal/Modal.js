import React from 'react'
import './Modal.css'

const styles = {
  button: {
    cursor: 'pointer'
  }
}

export default class Modal extends React.Component {
  state = {
    isOpen: false
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.setState({ isOpen: true })} style={styles.button}>
          About app
        </button>

        {this.state.isOpen && (
          <div className='modal'>
            <div className='modal-body'>
              <h1>Modal title</h1>
              <p>This app was created by Victor Stepanov. Thanks for using :)</p>
              <button onClick={() => this.setState({ isOpen: false })} style={styles.button}>Close modal</button>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}