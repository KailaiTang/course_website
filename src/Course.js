import React from 'react';
import './App.css';
import Section from './Section'

class Course extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
      key: props.key,
      course: props.course,
		}
	}

  setAllKeywords() {
    return this.state.course.keywords.join(", ");
  }

  setAllRequisites() {
    var allRequisites = this.state.course.requisites;
    if (allRequisites.length == 0) {
      return "None";
    }
    var requisitesString = "";
    for (let i = 0; i < allRequisites.length; i++) {
      for (let j = 0; j < allRequisites[i].length; j++) {
        if (j == 0) {
          requisitesString = requisitesString.concat("(");
        }
        requisitesString = requisitesString.concat(allRequisites[i][j]);
        if (j != allRequisites[i].length - 1) {
          requisitesString = requisitesString.concat(" OR ");
        } else {
          requisitesString = requisitesString.concat(")");
        }
      }
      if (i != allRequisites.length - 1) {
        requisitesString = requisitesString.concat(" AND ");
      }
    }
    return requisitesString;
  }

  getCartCourse() {
    for (let i = 0; i < this.props.cartCourses.length; i++) {
      if (this.props.cartCourses[i].number === this.props.course.number) {
        return this.props.cartCourses[i];
      }
    }
    return null;
  }

  render() {
    const course = this.state.course;
    if (!this.props.cartMode) {
      return (
        <div>
          <h1 style={{color: "blue"}}> <b>({course.number}) {course.name}</b> | ({course.credits} Credits) <button style={{color: "red"}} onClick={()=>this.props.updateCourse("add",course,null,null)}> Add Course</button> </h1>
          <h3> <b>Subject</b>: {course.subject} </h3>
          <h4> {course.description} </h4>
          <h3> <b>Requisites</b>: {this.setAllRequisites()} </h3>
          <h4> <b>Keywords</b>: {this.setAllKeywords()} </h4>
          <h2> <b>Sections</b></h2>
          <Section data={course} cartMode={this.props.cartMode} cartCourse={this.props.cartCourses} updateCourse={this.props.updateCourse}></Section>
        </div>
      )
    } else {
      return (
        <div>
          <h1> <b>({course.number}) {course.name}</b> | ({course.credits} Credits) <button style={{color: "red"}} onClick={()=>this.props.updateCourse("remove",course,null,null)}> Remove Course</button></h1>
          <h3> <b>Subject</b>: {course.subject} </h3>
          <h4> {course.description} </h4>
          <h3> <b>Requisites</b>: {this.setAllRequisites()} </h3>
          <h4> <b>Keywords</b>: {this.setAllKeywords()} </h4>
          <h2> <b>Sections</b> </h2>
          <Section data={course} cartMode={this.props.cartMode} cartCourse={this.props.cartCourses} updateCourse={this.props.updateCourse}></Section>
        </div>
      )
    }
  }
}

export default Course;

