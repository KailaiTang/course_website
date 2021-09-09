import React from 'react'
import { Button, Accordion, Card } from 'react-bootstrap'
import './App.css'
import Subsection from './Subsection.js'


// function displayOneSection(course, section, cartMode) {
// 	if (!cartMode) {
// 		return (
// 			<div>
// 				<h4> <b>{section.number}</b> <button onClick={()=>this.props.updateCourse("add",course,section,null)}>Add Section</button></h4>
// 				<h5> <b>Instructor</b>: {section.instructor}</h5>
// 				<h5> <b>Location</b>: {section.location}</h5>
// 				<h5> <b>Meeting Time</b>: {getMeetingTime(section.time)}</h5>
// 				<h5> <b>Subsections</b> <button>Add Subsection</button></h5>
// 				<Subsection data={section.subsections} cartMode={cartMode}></Subsection>
// 			</div>
// 		)
// 	} else {
// 		return (
// 			<div>
// 				<h4> <b>{section.number}</b> <button onClick={()=>this.props.updateCourse("remove",course,section,null)}>Remove Section</button></h4>
// 				<h5> <b>Instructor</b>: {section.instructor}</h5>
// 				<h5> <b>Location</b>: {section.location}</h5>
// 				<h5> <b>Meeting Time</b>: {getMeetingTime(section.time)}</h5>
// 				<h5> <b>Subsections</b> </h5>
// 				<Subsection data={section.subsections} cartMode={cartMode}></Subsection>
// 			</div>
// 		)
// 	}
// }

function getMeetingTime(time) {
	var size = Object.keys(time).length;
	if (size == 0) {
		return "None";
	}
	return (
		<div>
			{Object.keys(time).map((weekday) => (
				<li> {weekday}: {time[weekday]}</li>
			))}
		</div>
	);
}

class Section extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data,
			cartMode: props.cartMode,
		}
	}
	displayOneSection(course, section, cartMode) {
		if (!cartMode) {
			return (
				<div>
					<h4> <b>{section.number}</b> <button style={{color: "#FF5500"}} onClick={()=>this.props.updateCourse("add",course,section,null)}>Add Section</button></h4>
					<h5> <b>Instructor</b>: {section.instructor}</h5>
					<h5> <b>Location</b>: {section.location}</h5>
					<h5> <b>Meeting Time</b>: {getMeetingTime(section.time)}</h5>
					<h5> <b>Subsections</b> </h5>
					<Subsection course={course} section={section} cartMode={cartMode} updateCourse={this.props.updateCourse}></Subsection>
				</div>
			)
		} else {
			return (
				<div>
					<h4> <b>{section.number}</b> <button style={{color: "#FF5500"}} onClick={()=>this.props.updateCourse("remove",course,section,null)}>Remove Section</button></h4>
					<h5> <b>Instructor</b>: {section.instructor}</h5>
					<h5> <b>Location</b>: {section.location}</h5>
					<h5> <b>Meeting Time</b>: {getMeetingTime(section.time)}</h5>
					<h5> <b>Subsections</b> </h5>
					<Subsection course={course} section={section} cartMode={cartMode} updateCourse={this.props.updateCourse}></Subsection>
				</div>
			)
		}
	}

	displayAllSections() {
		var allSections = this.state.data.sections;
		return (
			<div>
				{allSections.map(section => (
					this.displayOneSection(this.state.data, section, this.state.cartMode)
				))}
			</div>
		)
	}
	render() {
		return (
			<div>
				{this.displayAllSections()}
			</div>
		)
	}
}

export default Section;


