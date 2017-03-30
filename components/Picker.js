import React , { Component, PropTypes } from 'react'

export default class Picker extends Component {
  render() {
    const { value, onChnage, options } = this.props

    return (
      <span>
        <h1>{value}</h1>
        <select onChnage={e => onChnage(e.target.value)} value={value}>
          {options.map(option =>
            <option value={option} key={option}>
              {option}
            </option>)
          }
        </select>
      </span>
    )
  }
}
