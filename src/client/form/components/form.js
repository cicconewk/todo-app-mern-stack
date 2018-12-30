import React, { Component } from 'react'
import propTypes from 'prop-types'

export default class Form extends Component {
  render(){
    const {title, description, _id } = this.props

    return(
        <div className="col s5">
          <div className="card">
            <div className="card-content">
              <div className="title">
                <h5>TASKS</h5>
              </div>
              <form onSubmit={this.props.handleAddTask}>
                <div className="row">
                  <div className="input-field col s12">
                      <input type="text" placeholder="Task title" name="title" onChange={this.props.handleChange} value={title} required></input>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <textarea name="description" onChange={this.props.handleChange} placeholder="Task description..." className="materialize-textarea" value={description} required></textarea>
                  </div>
                </div>
                {
                  _id ? 
                    <button className="btn light-blue darken-4" type="submit">UPDATE</button>
                    :
                    <button className="btn light-blue darken-4" type="submit">ADD</button>
                }
              </form>
            </div>
          </div>
        </div>
    )
  }
}

Form.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  _id: propTypes.string,
  handleChange: propTypes.func.isRequired,
  handleAddTask: propTypes.func.isRequired
}
