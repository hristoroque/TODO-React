import React from 'react'
import Pomodoro from './Pomodoro'

function TodoDetail(props){
  let view
  if(props.currentTask == null){
    view = (
      <div>
        Selecciona una Tarea para ver el detalle
      </div>
    )
  } else {
    view = (
      <div>
        <h2>{props.currentTask.name}</h2>
        <button className="btn" onClick={()=> props.onEdit({pk: props.currentTask.pk, name: 'Hristo', pomodoros: 1})}>
          Editar
        </button>
        <button className="btn" onClick={()=> props.onDelete(props.currentTask.pk)}>
          Eliminar
        </button>
        <hr></hr>
        <div className="divClock">
          <button className="btn" onClick={props.onStartTime}>
            startTime
          </button>
          <Pomodoro time={props.time}/>
        </div>
      </div>
    )
  }

  return view
}

export default TodoDetail