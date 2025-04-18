import React, { Component } from 'react';

class EditUserComponent extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;

    this.state = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      login: user.login,
      role: user.role,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, phone, login, role} = this.state;


    const updatedUser = {
      id: this.state.id,
      firstName,
      lastName,
      phone,
      login,
      role
    };

    this.props.onEditUser(updatedUser);
    alert("The user has been updated successfully!");
  };

  render() {
    return (
      <div>
        <h3>Edit User</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Login:</label>
            <input
              type="text"
              name="login"
              value={this.state.login}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Role:</label>
            <input
              type="text"
              name="role"
              value={this.state.role}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit">Update User</button>
        </form>
      </div>
    );
  }
}

export default EditUserComponent;
