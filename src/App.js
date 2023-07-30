import React, { Component } from 'react'
import NavBar from './components/NavBar'
import NewsContaner from './components/NewsContaner'
import './App.css'

export default class App extends Component {

  render() {
    return (
      <div>
        <NavBar/>
        <NewsContaner country="in" category="science" />
      </div>
    )
  }
}
