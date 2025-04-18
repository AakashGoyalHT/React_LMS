import React, { Component } from 'react';

class AddUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      role: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { firstName, lastName, phone, role } = this.state;

    let counter = 3;
    const newUser = {
      id: counter+1,
      firstName,
      lastName,
      phone,
      login: firstName + '.' + lastName,
      role
    };

    this.props.onAddUser(newUser);
    alert("The user has been added successfully");

    this.setState({
      firstName: '',
      lastName: '',
      phone: '',
      role: '',
    });
  };

  render() {
    const { firstName,lastName,phone,role} = this.state;

    return (
      <form onSubmit={this.handleSubmit} style={{ padding: '20px' }}>
        <h2>Add New User</h2>

        <div>
          <label>First Name:</label><br />
          <input name="firstName" value={firstName} onChange={this.handleChange} required />
        </div>

        <div>
          <label>Last Name:</label><br />
          <input name="lastName" value={lastName} onChange={this.handleChange} required />
        </div>

        <div>
          <label>Phone:</label><br />
          <input name="phone" value={phone} onChange={this.handleChange} required />
        </div>

        <div>
          <label>Role:</label><br />
          <input name="role" value={role} onChange={this.handleChange} required />
        </div>

        <br />
        <button type="submit">Add User</button>
      </form>
    );
  }
}

export default AddUserComponent;
