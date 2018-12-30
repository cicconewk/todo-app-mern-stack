import React, { Component } from 'react'
import propTypes from 'prop-types'
import TableLayout from './table-layout'

export default class Table extends Component {
  render(){
    return(
      <TableLayout th1="Title" th2="Description">
        {
          this.props.tasks.map(task => {
            return (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <button className="btn green darken-4" style={{margin: '4px'}} onClick={() => this.props.handleEditTask(task)}>
                    <i className="material-icons">edit</i>
                  </button>
                  <button className="btn red darken-4" onClick={() => this.props.handleDeleteTask(task._id)}>
                    <i className="material-icons">delete</i>
                  </button>
                </td>
              </tr>
            )
          })
        }
      </TableLayout>
    )
  }
}

Table.propTypes = {
  tasks: propTypes.array.isRequired,
  handleEditTask: propTypes.func.isRequired,
  handleDeleteTask: propTypes.func.isRequired
}