import React from 'react';
import Header from "./Header.js"
import Content from "./Content.js"
import Total from "./Total.js"

const Course = ({course}) => {
  return (
    <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
    </div>
  )
}

export default Course