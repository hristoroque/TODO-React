import React from 'react';

function Todo(props){
  let poms_list = Array(4).fill(0)

  return (
    <div className="todo">
      <div className="todo-task">
        <div className="todo-text">
          {props.name}
        </div>
      </div>
      <div className="todo-detalles">
        <div className="todo-time">
          {poms_list.map((pom)=><div className="pomodoro"></div>)}
        </div>
        <button className="btn todo-acciones" onClick={props.onDelete}>
          X
        </button>
      </div>
    </div>
  )
}

function TodoList(props){
  return (
    <div className="todo-list">
      { props.todos.map((todo)=><Todo key={todo.pk} name={todo.name} pomodoros={todo.pomodoros} onDelete={()=>props.onDelete(todo.pk)} />) }
    </div>
  )
}

class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      task: '',
      lastTask: '',
      todos: []
    }

    this.deleteTodo = this.deleteTodo.bind(this)
  }

  renderForm() {
    return (
      <div className="form">
        <input className="form-control" type="text" value={this.state.task} onChange={(e)=>this.updateText(e)}/>
        <button className="btn" onClick={()=> this.createTodo()} >
          Crear Todo
        </button>
      </div>
    )
  }

  renderDetail(){
    return (
      <div className="detail">
        <h2>
          { this.state.text }
        </h2>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="main">
          { this.renderForm() }
          <TodoList todos={ this.state.todos } onDelete={ this.deleteTodo } />
        </div>
      </div>
    )
  }

  updateText(e){
    const task = e.target.value
    this.setState({task})
  }

  createTodo(){
    if(this.state.task.length!==0 && this.state.task!==this.state.lastTask){
      this.setState({lastTask: this.state.task})
      const pk = this.state.todos.length + 1
      const todos = this.state.todos.concat({pk, name: this.state.task, pomodoros: 1})
      this.setState({todos})
    }
  }

  deleteTodo(pk){
    const todos = this.state.todos.filter(todo=>todo.pk!==pk)
    this.setState({todos})
  }
}

export default App;
