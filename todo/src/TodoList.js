import React from 'react'
import PropTypes from 'prop-types'

function TodoList(props) {
    return (
        <div className="todo-list">
            {props.todos.map((todo) =>
                <Todo
                    key={todo.pk}
                    name={todo.name}
                    pomodoros={todo.pomodoros}
                    onDelete={() => props.onDelete(todo.pk)}
                    selectTodoHandler={() => props.selectTodoHandler(todo.pk)}
                />)}
        </div>
    )
}

TodoList.propTypes = { todos: PropTypes.array }

function Todo(props) {
    let poms_list = Array(4).fill(0)

    return (
        <div className="todo">
            <div className="todo-task"
                onClick={props.selectTodoHandler}>
                <div className="todo-text">
                    {props.name}
                </div>
            </div>
            <div className="todo-detalles">
                <div className="todo-time">
                    {poms_list.map((pom, i) =>
                        <div key={i} className="pomodoro"></div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default TodoList