import React from 'react'
import './App.css'

// function displayOneSubsection(subsection, cartMode) {
// 	if (!cartMode) {
// 		return (
// 			<div>
// 				<h5> <b>{subsection.number}</b> <button>Add Subsection</button> </h5>
// 				<h6> <b>Location</b>: {subsection.location}</h6>
// 				<h6> <b>Meeting Time</b>: {getMeetingTime(subsection.time)}</h6>
// 			</div>
// 		)
// 	} else {
// 		return (
// 			<div>
// 				<h5> <b>{subsection.number}</b> <button>Remove Subsection</button> </h5>
// 				<h6> <b>Location</b>: {subsection.location}</h6>
// 				<h6> <b>Meeting Time</b>: {getMeetingTime(subsection.time)}</h6>
// 			</div>
// 		)
// 	}
// }

function getMeetingTime(time) {
	var size = Object.keys(time).length;
	if (size === 0) {
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

class Subsection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			section: props.section,
			cartMode: props.cartMode,
		}
	}
	displayAllSubsections() {
		var allSubections = this.state.section.subsections;
		return (
			<div>
				{allSubections.map(subsection => (
					this.displayOneSubsection(subsection, this.state.cartMode)
				))}
			</div>
		)
	}
	displayOneSubsection(subsection, cartMode) {
		if (!cartMode) {
			return (
				<div>
					<h5> <b>{subsection.number}</b> <button style={{color: "orange"}} onClick={() => this.props.updateCourse("add", this.props.course, this.state.section, subsection)}>Add Subsection</button> </h5>
					<h6> <b>Location</b>: {subsection.location}</h6>
					<h6> <b>Meeting Time</b>: {getMeetingTime(subsection.time)}</h6>
				</div>
			)
		} else {
			return (
				<div>
					<h5> <b>{subsection.number}</b> <button style={{color: "orange"}} onClick={() => this.props.updateCourse("remove", this.props.course, this.state.section, subsection)}>Remove Subsection</button> </h5>
					<h6> <b>Location</b>: {subsection.location}</h6>
					<h6> <b>Meeting Time</b>: {getMeetingTime(subsection.time)}</h6>
				</div>
			)
		}
	}
	render() {
		if (this.state.section.subsections.length == 0) {
			return <div> None </div>
		} else {
			return (
				<div>
					{this.displayAllSubsections()}
				</div>
			)
		}
	}
}

export default Subsection;