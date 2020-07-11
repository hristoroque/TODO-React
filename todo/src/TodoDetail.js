import React from 'react'

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
        <button onClick={()=> props.onEdit({pk: props.currentTask.pk, name: 'Hristo', pomodoros: 1})}>
          Editar
        </button>
        <button onClick={()=> props.onDelete(props.currentTask.pk)}>
          Eliminar
        </button>
      </div>
    )
  }

  return view
}

export default TodoDetail