import React from 'react';

function Todo(props){
  let poms_list = Array(4).fill(0)

  return (
    <div className="todo" onClick={props.selectTodoHandler}>
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
      { props.todos.map((todo)=><Todo key={todo.pk} name={todo.name} pomodoros={todo.pomodoros} onDelete={()=>props.onDelete(todo.pk)} selectTodoHandler={()=>props.selectTodoHandler(todo.pk)} />) }
    </div>
  )
}

/*
CreationForm component
it receives:
a taskInputText
a todoCreationHandler
a todoTextChangeHandler
*/
function TodoCreationForm(props){
  return (
    <form onSubmit={props.todoCreationHandler} >
      <input type='text' value={props.taskInputText} onChange={props.todoTextChangeHandler} />
      <input type='submit' value='Create' />
    </form>
  )
}

/*
DetailView component
it receives:
the currentTask
a todoUpdateHandler
a todoDeleteHandler
*/

function TodoDetailView(props){

  let view

  if(props.currentTask === null){
    view = (
      <div>
        Selecciona una Tarea para ver el detalle
      </div>
    )
  } else {
    view = (
      <div>
        <h2>{props.currentTask.name}</h2>
        <button>
          Editar
        </button>
        <button>
          Eliminar
        </button>
      </div>
    )
  }

  return view
}

class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      spentTime: 0,
      plannedTime: 0,
      currentTask: null,
      lastCreatedTask: null,
      tasks: [],
      taskInputText: '',
      currentTime: 25,
    }

    this.selectTodoTask = this.selectTodoTask.bind(this)
    this.updateTodoText = this.updateTodoText.bind(this)
    this.createTodo = this.createTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
  }

  render() {
    return (
      <div className='content'>
        <div className="list-view">
          <TodoCreationForm
            taskInputText={this.state.taskInputText}
            todoCreationHandler={this.createTodo}
            todoTextChangeHandler={this.updateTodoText}
          />
          <TodoList todos={ this.state.tasks } onDelete={ this.deleteTodo } selectTodoHandler={ this.selectTodoTask } />
        </div>
        <div className='detail-view'>
            <TodoDetailView 
              currentTask={this.state.currentTask}
            />
        </div>
      </div>
    )
  }

  updateTodoText(e){
    const taskInputText = e.target.value
    this.setState({taskInputText})
  }

  selectTodoTask(pk){
    const tasks = this.state.tasks.filter(task=>task.pk === pk)

    if(tasks.length===0){
      this.setState({currentTask: null})
    } else {
      this.setState({currentTask: tasks[0]})
    }
  }
  
  /*
  CRUD Functions
  */
  createTodo(e){
    e.preventDefault()
    const taskName = this.state.taskInputText
    let tasks = this.state.tasks

    if(taskName.length!==0 && !tasks.some(task=>task.name===taskName)){
      const pk = this.state.tasks.length + 1
      tasks = tasks.concat({pk, name: taskName, pomodoros: 0})
      this.setState({tasks})
    }
  }
  deleteTodo(pk){
    const tasks = this.state.tasks.filter(todo=>todo.pk!==pk)
    if(this.state.currentTask!==null && this.state.currentTask.pk === pk){
      this.setState({currentTask: null})
    }
    this.setState({tasks})
  }
}

export default App;
