import React from 'react'

export default function TableLayout(props){
  return(
    <div className="col s7">
      <table>
        <thead>
          <tr>
            <th>{props.th1}</th>
            <th>{props.th2}</th>
          </tr>
        </thead>
        <tbody>
          {props.children}
        </tbody>
      </table>
    </div>
  )
}