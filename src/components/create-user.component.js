import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)     //sending http post to the backend endpoint(users.js in routes)
      .then(res => console.log(res.data));      // after posting we print the response in console

    this.setState({     //to keep the user on same page to add another user if he wants to add another
      username: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}