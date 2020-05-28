//this file consists of two types of components Exercise(functional react component) and ExerciseList(class component)
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (   //this component is implemented as a functional react component
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>Edit</Link>&nbsp; | &nbsp;<a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/excercises/')
      .then(response => {
        this.setState({ exercises: response.data })     // stores all the values of response from get request into exrercises array
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {    //deletes the exercise
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)     //if the id of the exercise in exercises array and the user doesnt eual to the id of user then pass it back to the exercise array
    })    // .id is that of the exercise and ._id is id of user made in the database which is created automatically when we create the object
  }

  exerciseList() {    //this function returns a component(and every component is the row of the table)
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }  
          </tbody>
        </table>
      </div>
    )
  }
} //in <tbody> tag the body calls the exercise list method that returns the rows of the table