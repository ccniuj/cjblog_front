import React, { Component } from 'react'
import { Link } from 'react-router'
import Navbar from './Navbar'

export default class App extends Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <Navbar />
        {children}
      </div>
    )
  }
}
