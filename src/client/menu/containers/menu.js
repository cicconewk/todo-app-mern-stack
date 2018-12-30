import React, { Component } from 'react'
import MenuLayout from '../components/menu-layout'

export default class Menu extends Component {
  render() {
    return(
      <MenuLayout>
        <div className="container">
          <a className="brand-logo" href="/">MERN Stack</a>
        </div>
      </MenuLayout>
    )
  }
}