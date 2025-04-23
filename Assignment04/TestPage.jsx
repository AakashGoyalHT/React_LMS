
import React, { Component } from 'react';
import AddUserComponent from '../Components/AddUserComponent';
import UserListComponent from '../Components/UserListComponent';
import EditUserComponent from '../Components/EditUserComponent';
import { initialUsers } from '/home/akash_goyal/user-widget/src/UserData.js';
import PaginationComponent from './PaginationComponent.js';
import SortingComponent from './SortingComponent.js';

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: initialUsers,
      editingUser: null,
      message: '',
      searchQuery: '',
      currentPage: 1,
      usersPerPage: 10,
      sortOrder: 'A-Z',
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

  handleSortChange = (sortOrder) => {
    this.setState({ sortOrder });
  };

  handlePaginationChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { users, editingUser, message, searchQuery, currentPage, usersPerPage, sortOrder } = this.state;

    const filteredUsers = users.filter(user =>
      Object.values(user).some(val =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    const sortedUsers = filteredUsers.sort((a, b) => {
      if (sortOrder === 'az') {
        return a.firstName.localeCompare(b.firstName);
      } else if (sortOrder === 'za') {
        return b.firstName.localeCompare(a.firstName);
      } else if (sortOrder === 'created') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortOrder === 'updated') {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      return 0;
    });
    
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

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
              value={searchQuery}
              onChange={this.handleSearchChange}
              style={{ padding: '8px', width: '100%', maxWidth: '300px', marginBottom: '10px' }}
            />

            {message && (
              <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>
            )}

        <SortingComponent selectedSort={sortOrder} onSortChange={this.handleSortChange}/>

        <PaginationComponent currentPage={currentPage} totalUsers={sortedUsers.length} 
         usersPerPage={usersPerPage} onPageChange={this.handlePaginationChange}/>


        <UserListComponent users={currentUsers} onEdit={this.editUser} onDelete={this.deleteUser}/>
          </>
        )}
      </div>
    );
  }
}

export default TestPage;


// import React, { Component } from 'react';
// import AddUserComponent from '../Components/AddUserComponent';
// import UserListComponent from '../Components/UserListComponent';
// import EditUserComponent from '../Components/EditUserComponent';
// import { initialUsers } from '../UserData';

// class TestPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       users: initialUsers,
//       editingUser: null,
//       message: '',
//       searchQuery: ''
//     };
//   }

//   addUser = (newUser) => {
//     this.setState(prevState => ({
//       users: [...prevState.users, newUser]
//     }));
//   };

//   deleteUser = (userId) => {
//     this.setState(prevState => ({
//       users: prevState.users.filter(user => user.id !== userId),
//       message: "The user has been deleted successfully."
//     }));

//     setTimeout(() => {
//       this.setState({ message: '' });
//     }, 3000);
//   };

//   editUser = (user) => {
//     this.setState({ editingUser: user });
//   };

//   handleEditUser = (updatedUser) => {
//     this.setState(prevState => ({
//       users: prevState.users.map(user =>
//         user.id === updatedUser.id ? updatedUser : user
//       ),
//       editingUser: null
//     }));
//   };

//   handleSearchChange = (event) => {
//     this.setState({ searchQuery: event.target.value });
//   };

//   render() {
//     const { users, editingUser, message, searchQuery } = this.state;

//     const filteredUsers = users.filter(user =>
//       Object.values(user).some(val =>
//         String(val).toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );

//     return (
//       <div style={{ padding: '20px' }}>
//         {editingUser ? (
//           <EditUserComponent user={editingUser} onEditUser={this.handleEditUser} />
//         ) : (
//           <>
//             <AddUserComponent onAddUser={this.addUser} />

//             <div style={{ margin: '10px 0' }}>
//               <strong>User Count: {filteredUsers.length}</strong>
//             </div>

//             <input
//               type="text"
//               value={searchQuery}
//               onChange={this.handleSearchChange}
//               style={{ padding: '8px', width: '100%', maxWidth: '300px', marginBottom: '10px' }}
//             />

//             {message && (
//               <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>
//             )}

//             <UserListComponent
//               users={filteredUsers}
//               onEdit={this.editUser}
//               onDelete={this.deleteUser}
//             />
//           </>
//         )}
//       </div>
//     );
//   }
// }

// export default TestPage;
