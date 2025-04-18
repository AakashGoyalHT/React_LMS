import React, { Component } from 'react';
import AddUserComponent from '../Components/AddUserComponent';
import UserListComponent from '../Components/UserListComponent';
import EditUserComponent from '../Components/EditUserComponent';
import { initialUsers } from '../UserData';

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: initialUsers,
      editingUser: null,
      message: '',
      searchQuery: ''
    };
  }

  addUser = (newUser) => {
    this.setState(prevState => ({
      users: [...prevState.users, newUser]
    }));
  };

  deleteUser = (userId) => {
    this.setState(prevState => ({
      users: prevState.users.filter(user => user.id !== userId),
      message: "The user has been deleted successfully."
    }));

    setTimeout(() => {
      this.setState({ message: '' });
    }, 3000);

    // alert("The user has been deleted successfully");
  };

  editUser = (user) => {
    this.setState({ editingUser: user });
  };

  handleEditUser = (updatedUser) => {
    this.setState(prevState => ({
      users: prevState.users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      ),
      editingUser: null
    }));
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    const { users, editingUser, message, searchQuery } = this.state;

    const filteredUsers = users.filter(user =>
      Object.values(user).some(val =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    return (
      <div style={{ padding: '20px' }}>
        {editingUser ? (
          <EditUserComponent user={editingUser} onEditUser={this.handleEditUser} />
        ) : (
          <>
            <AddUserComponent onAddUser={this.addUser} />

            <div style={{ margin: '10px 0' }}>
              <strong>User Count: {filteredUsers.length}</strong>
            </div>

            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={this.handleSearchChange}
              style={{ padding: '8px', width: '100%', maxWidth: '300px', marginBottom: '10px' }}
            />

            {message && (
              <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>
            )}

            <UserListComponent
              users={filteredUsers}
              onEdit={this.editUser}
              onDelete={this.deleteUser}
            />
          </>
        )}
      </div>
    );
  }
}

export default TestPage;
