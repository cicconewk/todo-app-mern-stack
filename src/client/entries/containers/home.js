import React, { Component } from 'react'
import HomeLayout from '../components/home-layout'
import Menu from '../../menu/containers/menu'

export default class Home extends Component {
  state = {
    _id: '',
    title: '',
    description: '',
    tasks: []
  }

  handleAddTask = (e) => {
    let id = this.state._id

    if(id){
      fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          M.toast({html:'TASK UPDATED'})

          this.setState({ _id: '', title: '', description: ''})
          this.getTasks()
        })
        .catch(err => console.error(err))
    }else{
      fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          M.toast({html:'TASK SAVED'})
          
          this.setState({ title: '', description:'' })
          this.getTasks()
        })
        .catch(err => console.error(err))
    }

    e.preventDefault()
  }

  handleDeleteTask = (id) => {
    if(confirm("Are you sure you want to delete this task?")){
      fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Assets': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))

        M.toast({html: "TASK DELETED"})
        this.getTasks()
    }else{
      M.toast({html: "ACTION CANCELED"})
    }

    if(this.state._id){
      this.setState({
        _id: '',
        title: '',
        description: ''
      })
    }
    
  }

  handleEditTask = (task) => {
    const { _id, title, description } = task

    this.setState({
      _id: _id,
      title: title,
      description: description
    })
  }

  componentDidMount(){
    console.log('Component is mount')
    this.getTasks()
  }

  getTasks = () => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        this.setState({
          tasks: data
        })
      })
      .catch(err => console.error(err))
  }

  handleChange = (e) => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  render() {
    return(
      <HomeLayout>
        <Menu />
        
        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.handleAddTask}>
                    <div className="row">
                      <div className="input-field col s12">
                          <input type="text" placeholder="Task title" name="title" onChange={this.handleChange} value={this.state.title} required></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="description" onChange={this.handleChange} placeholder="Task description..." className="materialize-textarea" value={this.state.description} required></textarea>
                      </div>
                    </div>
                    {
                      this.state._id ? 
                        <button className="btn light-blue darken-4" type="submit">UPDATE</button>
                        :
                        <button className="btn light-blue darken-4" type="submit">ADD</button>
                    }
                  </form>
                </div>
              </div>
            </div>

            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.tasks.map(task => {
                      return (
                        <tr key={task._id}>
                          <td>{task.title}</td>
                          <td>{task.description}</td>
                          <td>
                            <button className="btn green darken-4" style={{margin: '4px'}} onClick={() => this.handleEditTask(task)}>
                              <i className="material-icons">edit</i>
                            </button>
                            <button className="btn red darken-4" onClick={() => this.handleDeleteTask(task._id)}>
                              <i className="material-icons">delete</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </HomeLayout>
    )
  }
}
