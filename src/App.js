import React from 'react';
import './App.css';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Sidebar from './Sidebar';
import CourseArea from './CourseArea';
import Home from './Home';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: {},
      cartCourses: [],
      subjects: [],
      activeKey: "home"
    };
    this.updateActiveKey = this.updateActiveKey.bind(this)
  }

  updateActiveKey(key) {
    this.setState({activeKey:key})
  }

  componentDidMount() {
    fetch('http://mysqlcs639.cs.wisc.edu:53706/api/react/classes').then(
      res => res.json()
    ).then(data => this.setState({ allCourses: data, filteredCourses: data, cartCourses: [], subjects: this.getSubjects(data) }));
  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");
    for (const course of Object.values(data)) {
      if (subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }
    return subjects;
  }

  setCourses(courses) {
    this.setState({ filteredCourses: courses })
  }

  updateCourse(status, course, section, subsection) {
    // add a course
    if (status === "add" && section == null && subsection == null) {
      this.addCourse(course);
    }
    // remove a course
    else if (status === "remove" && section == null && subsection == null) {
      this.removeCourse(course);
    }
    // add a section
    else if (status === "add" && subsection == null) {
      this.addSection(course, section);
    }
    // remove a section
    else if (status === "remove" && subsection == null) {
      this.removeSection(course, section);
    }
    // add a subsection
    else if (status === "add") {
      this.addSubsection(course, section, subsection);
    }
    // remove a subsection
    else if (status === "remove") {
      this.removeSubsection(course, section, subsection);
    }
    if (section == null && subsection == null) {
      alert(status.toUpperCase() + " " + course.number + ") successfully!")
    } else if (subsection == null) {
      alert(status.toUpperCase() + " " + course.number + " (" + section.number + ") successfully!")
    } else {
      alert(status.toUpperCase() + " " + course.number + " (" + section.number + ", " + subsection.number + ") successfully!")
    }
    
  }

  addCourse(course) {
    // course already exists
    for (let i = 0; i < this.state.cartCourses.length; i++) {
      if (this.state.cartCourses[i].number === course.number) {
        this.state.cartCourses[i] = course;
        this.setState({cartCourses:this.state.cartCourses});
        return;
      }
    }
    // course not exist
    this.state.cartCourses.push(course);
    this.setState({cartCourses:this.state.cartCourses});
  }

  removeCourse(course) {
    for (let i = 0; i < this.state.cartCourses.length; i++) {
      if (this.state.cartCourses[i].number === course.number) {
        this.state.cartCourses.splice(i, 1);
        this.setState({cartCourses:this.state.cartCourses});
        return;
      }
    }
    this.setState({cartCourses:this.state.cartCourses});
  }

  addSection(course, section) {
    // course already exists
    for (let i = 0; i < this.state.cartCourses.length; i++) {
      if (this.state.cartCourses[i].number === course.number) {
        // section already exists
        for (let j = 0; j < this.state.cartCourses[i].sections.length; j++) {
          if (this.state.cartCourses[i].sections[j].number === section.number) {
            this.state.cartCourses[i].sections.splice(j, 1);
            break;
          }
        }
        // add the section
        this.state.cartCourses[i].sections.push(section);
        this.setState({cartCourses:this.state.cartCourses});
        return;
      }
    }
    // course not exists
    var new_course = JSON.parse(JSON.stringify(course));
    new_course.sections = [];
    new_course.sections.push(section);
    this.state.cartCourses.push(new_course);
    this.setState({cartCourses:this.state.cartCourses});
  }

  removeSection(course, section) {
    for (let i = 0; i < this.state.cartCourses.length; i++) {
      if (this.state.cartCourses[i].number === course.number) {
        // remove the section if the section already exists
        for (let j = 0; j < this.state.cartCourses[i].sections.length; j++) {
          if (this.state.cartCourses[i].sections[j].number === section.number) {
            this.state.cartCourses[i].sections.splice(j, 1);
            // if no section in a course, remove the course
            if (this.state.cartCourses[i].sections.length == 0) {
              this.removeCourse(course);
            }
            this.setState({cartCourses:this.state.cartCourses});
            return;
          }
        }
      }
    }
    this.setState({cartCourses:this.state.cartCourses});
  }

  addSubsection(course, section, subsection) {
    // to check whether course exists
    for (let i = 0; i < this.state.cartCourses.length; i++) {
      if (this.state.cartCourses[i].number === course.number) {
        // to check whether the section exists
        for (let j = 0; j < this.state.cartCourses[i].sections.length; j++) {
          if (this.state.cartCourses[i].sections[j].number == section.number) {
            // to check whether the subsection exists
            for (let k = 0; k < this.state.cartCourses[i].sections[j].subsections.length; k++) {
              if (this.state.cartCourses[i].sections[j].subsections[k] == subsection.number) {
                return;
              }
            }
            // if subsection does not exist, but section exists
            this.state.cartCourses[i].sections[j].subsections.push(subsection);
            this.setState({cartCourses:this.state.cartCourses});
            return;
          }
        }
        // if section does not exist, but course exists
        var new_section = JSON.parse(JSON.stringify(section));
        new_section.subsections = [];
        new_section.subsections.push(subsection);
        this.state.cartCourses[i].sections.push(new_section);
        this.setState({cartCourses:this.state.cartCourses});
        return;
      }
    }
    // if course does not exist
    var new_section = JSON.parse(JSON.stringify(section));
    new_section.subsections = [];
    new_section.subsections.push(subsection);
    var new_course = JSON.parse(JSON.stringify(course));
    new_course.sections = [];
    new_course.sections.push(new_section);
    this.state.cartCourses.push(new_course);
    this.setState({cartCourses:this.state.cartCourses});
  }

  removeSubsection(course, section, subsection) {
    // to check whether course exists
    for (let i = 0; i < this.state.cartCourses.length; i++) {
      if (this.state.cartCourses[i].number === course.number) {
        // to check whether the section exists
        for (let j = 0; j < this.state.cartCourses[i].sections.length; j++) {
          if (this.state.cartCourses[i].sections[j].number == section.number) {
            // to check whether the subsection exists
            for (let k = 0; k < this.state.cartCourses[i].sections[j].subsections.length; k++) {
              if (this.state.cartCourses[i].sections[j].subsections[k].number == subsection.number) {
                this.state.cartCourses[i].sections[j].subsections.splice(k, 1);
                // if no subsection in a section, remove the course
                if (this.state.cartCourses[i].sections[j].subsections.length == 0) {
                  this.removeSection(course, section);
                }
                this.setState({cartCourses:this.state.cartCourses});
                return;
              }
            }
          }
        }
      }
    }
    this.setState({cartCourses:this.state.cartCourses});
  }

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <Tabs activeKey={this.state.activeKey} onSelect={this.updateActiveKey} style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: 'white' }}>
          
          <Tab eventKey="home" title="HOME" style={{paddingTop: '5vh', backgroundColor: 'white'}}>
            <Home updateActiveKey={this.updateActiveKey.bind(this)}></Home>
          </Tab>

          <Tab eventKey="search" title="Search" style={{ paddingTop: '5vh' }}>
            <Sidebar setCourses={(courses) => this.setCourses(courses)} courses={this.state.allCourses} subjects={this.state.subjects} />
            <div style={{ marginLeft: '20vw' }}>
              <CourseArea 
                data={this.state.filteredCourses} 
                allData={this.state.allCourses} 
                cartCourses={this.state.cartCourses} 
                updateCourse={this.updateCourse.bind(this)} 
                cartMode={false} />
            </div>
          </Tab>

          <Tab eventKey="cart" title="Cart" style={{ paddingTop: '5vh' }}>
            <div style={{ marginLeft: '5vw' }}>
              <CourseArea 
                data={this.state.cartCourses} 
                allData={this.state.allCourses} 
                cartCourses={this.state.cartCourses} 
                updateCourse={this.updateCourse.bind(this)} 
                cartMode={true} />
            </div>
          </Tab>

        </Tabs>
      </>
    )
  }
}

export default App;
