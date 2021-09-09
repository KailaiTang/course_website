import React from 'react';
import './App.css';
import Course from './Course';

class CourseArea extends React.Component {
  getCourses() {
    let courses = [];
    for(const course of Object.values(this.props.data)) {
      //console.log(this.props.cartCourses);
      courses.push (
        <Course key={course.name} course={course} cartMode={this.props.cartMode} updateCourse={this.props.updateCourse} cartCourses={this.props.cartCourses}/>
      )
    }
    return courses;
  }

  render() {
    return (
      <div style={{margin: '5px'}}>
        {this.getCourses()}
      </div>
    )
  }
}

export default CourseArea;
