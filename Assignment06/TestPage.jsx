import React, { Component } from 'react';
import AddUserComponent from '../Components/AddUserComponent';
import UserListComponent from '../Components/UserListComponent';
import EditUserComponent from '../Components/EditUserComponent';
import { initialUsers } from '../UserData';
import PaginationComponent from './PaginationComponent';
import SortingComponent from './SortingComponent';
import FilterComponent from './FilterComponent';
import DashboardWidgetComponent from './DashboardWidgetComponent';

class TestPage extends Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(window.location.search);
    const role = params.get('role') || 'All';
    const status = params.get('status') || 'All';

    this.state = {
      users: initialUsers,
      editingUser: null,
      message: '',
      searchQuery: '',
      currentPage: 1,
      usersPerPage: 10,
      sortOrder: 'A-Z',
      selectedRole: role,
      selectedStatus: status,
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

  handleFilterChange = (role) => {
    this.setState({ selectedRole: role, currentPage: 1 }, () => {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set('role', role);
      window.history.replaceState(null, '', '?' + queryParams.toString());
    });
  };

  handleStatusFilterChange = (status) => {
    this.setState({ selectedStatus: status, currentPage: 1 }, () => {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set('status', status);
      window.history.replaceState(null, '', '?' + queryParams.toString());
    });
  };

  render() {
    const {
      users, editingUser, message, searchQuery,
      currentPage, usersPerPage, sortOrder,
      selectedRole, selectedStatus
    } = this.state;

    const statusFilteredUsers = selectedStatus === 'All'
      ? users
      : users.filter(user => user.status === selectedStatus);

    const roleFilteredUsers = selectedRole === 'All'
      ? statusFilteredUsers
      : statusFilteredUsers.filter(user => user.role === selectedRole);

    const searchedUsers = roleFilteredUsers.filter(user =>
      Object.values(user).some(val =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    const sortedUsers = searchedUsers.sort((a, b) => {
      if (sortOrder === 'A-Z') {
        return a.firstName.localeCompare(b.firstName);
      } else if (sortOrder === 'Z-A') {
        return b.firstName.localeCompare(a.firstName);
      } else if (sortOrder === 'Created Date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortOrder === 'Last Updated') {
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
            <DashboardWidgetComponent
              users={users}
              onStatusFilterChange={this.handleStatusFilterChange}
            />

            <AddUserComponent onAddUser={this.addUser} />

            <div style={{ margin: '10px 0' }}>
              <strong>User Count: {searchedUsers.length}</strong>
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={this.handleSearchChange}
              style={{ padding: '8px', width: '100%', maxWidth: '300px', marginBottom: '10px' }}
              placeholder="Search by name or email"
            />

            <FilterComponent
              selectedRole={selectedRole}
              onFilterChange={this.handleFilterChange}
            />

            <SortingComponent
              selectedSort={sortOrder}
              onSortChange={this.handleSortChange}
            />

            <PaginationComponent
              currentPage={currentPage}
              totalUsers={sortedUsers.length}
              usersPerPage={usersPerPage}
              onPageChange={this.handlePaginationChange}
            />

            {message && (
              <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>
            )}

            <UserListComponent
              users={currentUsers}
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
