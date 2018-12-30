import React from 'react'

export default function MenuLayout(props){
  return(
    <nav className="light-blue darken-4">
      {props.children}
    </nav>
  )
}