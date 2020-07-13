import React,{Fragment} from 'react'

let pomodoro = {width: 30, height: 30, borderRadius: '50%'}

// A pomodoro has a number of pomodoros and a number of 
// pomodoros done

// props has pomodorosSet and pomodorosDone
function Pomodoro(props){
    const style = pomodoro
    return (
        <div>
            {props.time}
        </div>
    )
}

export default Pomodoro