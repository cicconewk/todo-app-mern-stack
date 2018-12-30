import React, { Component } from 'react'
import HomeLayout from '../components/home-layout'
import Menu from '../../menu/containers/menu'
import Form from '../../form/components/form'
import Table from '../../table/components/table'
import Container from '../../form/components/container'

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
          console.log(data)
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
          console.log(data)
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
        <Container>
          <Form _id={this.state._id} title={this.state.title} description={this.state.description} handleChange={this.handleChange} handleAddTask={this.handleAddTask}/>
          <Table tasks={this.state.tasks} handleDeleteTask={this.handleDeleteTask} handleEditTask={this.handleEditTask} />
        </Container>
      </HomeLayout>
    )
  }
}
