import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import TodoDetail from './TodoDetail'
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
      <input className="form-control" type='text' value={props.taskInputText} onChange={props.todoTextChangeHandler} />
      <input className="btn" type='submit' value='Create' />
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
      interval: null,
    }

    this.selectTodoTask = this.selectTodoTask.bind(this)
    this.updateTodoText = this.updateTodoText.bind(this)
    this.createTodo = this.createTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.editTodo = this.editTodo.bind(this)
    this.startTime = this.startTime.bind(this)
  }

  render() {
    return (
      <div>
      <Header
        date={new Date()}
        currentTime={this.state.currentTime}
        plannedTime={this.state.plannedTime}
      />
      <hr/>
      <div className='content'>
        <div className="list-view">
          <TodoCreationForm
            taskInputText={this.state.taskInputText}
            todoCreationHandler={this.createTodo}
            todoTextChangeHandler={this.updateTodoText}
          />
          <TodoList 
            todos={ this.state.tasks } 
            onDelete={ this.deleteTodo }
            selectTodoHandler={ this.selectTodoTask } 
            />
        </div>
        <div className='detail-view'>
            <TodoDetail 
              currentTask={ this.state.currentTask }
              onEdit={ this.editTodo }
              onDelete={ this.deleteTodo }
              onStartTime={ this.startTime }
              time={this.state.currentTime}
            />
        </div>
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
      const task = tasks[0]
      this.setState({currentTask: {pk: task.pk, name: task.name, pomodoros: task.pomodoros}})
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
  editTodo(editedTask){
    const tasks = this.state.tasks.map(task => {
      if(task.pk === editedTask.pk){
        return {pk: editedTask.pk,name: editedTask.name, pomodoros: editedTask.pomodoros}
      } return task
    })
    this.setState({tasks})
  }
  startTime(){ 
    let interval = setInterval(()=>{
      if(this.state.currentTime <= 0){
        this.setState({currentTime: 25})
        this.stopTime()
      }
      else {
        this.setState((prevState) =>
        ({currentTime: prevState.currentTime-1})
        )
      }
    },1000)
    this.setState({interval})
  }
  stopTime(){
    clearInterval(this.state.interval)
    this.setState({interval: null})
  }
}

export default App;