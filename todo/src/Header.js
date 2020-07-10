import React from 'react'

/*
Todo Header Component
Its props values are:
date
spentTime:
currentTime:
*/

const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
const suffixes = ['st','nd','rd','th']

function setSuffixToDate(date){
    const last_digit = date%10
    let suffix

    switch(last_digit){
        case 1:
            suffix = suffixes[0]
            break
        case 2:
            suffix = suffixes[1]
            break
        case 3:
            suffix = suffixes[2]
            break
        default:
            suffix = suffixes[3]
            break
    }

    return `${date}${suffix}`
}

function Header(props){

    const month = months[props.date.getMonth()-1]    
    const date = setSuffixToDate(props.date.getDate())
    return (
        <header>
            <h1>
                A simple TODO App
            </h1>
            <p>
                Today is {month} {date}.
                You have planned to do {props.plannedTime} hours,
                and you have done {props.currentTime}
            </p>
        </header>
    )
}

export default Header;