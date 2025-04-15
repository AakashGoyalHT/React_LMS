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
      editingUser: null
    };
  }

  addUser = (newUser) => {
    this.setState(prevState => ({
      users: [...prevState.users, newUser]
    }));
  };

  deleteUser = (userId) => {
    this.setState(prevState => ({
      users: prevState.users.filter(user => user.id !== userId)
    }));
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

  render() {
    const { users, editingUser } = this.state;

    return (
      <div>
        {editingUser ? (
          <EditUserComponent user={editingUser} onEditUser={this.handleEditUser} />
        ) : (
          <>
            <AddUserComponent onAddUser={this.addUser} />
            <UserListComponent
              users={users}
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
