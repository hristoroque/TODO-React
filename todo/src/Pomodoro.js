import React from 'react'

let pomodoro = {width: 30, height: 30, borderRadius: '50%'}

// A pomodoro has a number of pomodoros and a number of 
// pomodoros done

// props has pomodorosSet and pomodorosDone
function Pomodoro(props){
    const style = pomodoro
    style.backgroundColor = '#e62e00'
    return (
        <div>
            { props.pomodorosSet.map(pom=><div style={style} ></div>) }
        </div>
    )
}

export default Pomodoro