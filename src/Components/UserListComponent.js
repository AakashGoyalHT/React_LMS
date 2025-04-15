import React, { Component } from 'react';
import DeleteUserComponent from './DeleteUserComponent';

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const thTdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const buttonStyle = {
  marginRight: '5px',
  padding: '6px 10px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
};

class UserListComponent extends Component {
  render() {
    const { users, onEdit, onDelete } = this.props;

    return (
      <div style={{ padding: '20px' }}>
        <h2>User List</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thTdStyle}>ID</th>
                <th style={thTdStyle}>First Name</th>
                <th style={thTdStyle}>Last Name</th>
                <th style={thTdStyle}>Phone</th>
                <th style={thTdStyle}>Login</th>
                <th style={thTdStyle}>Role</th>
                <th style={thTdStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td style={thTdStyle}>{user.id}</td>
                  <td style={thTdStyle}>{user.firstName}</td>
                  <td style={thTdStyle}>{user.lastName}</td>
                  <td style={thTdStyle}>{user.phone}</td>
                  <td style={thTdStyle}>{user.login}</td>
                  <td style={thTdStyle}>{user.role}</td>
                  <td style={thTdStyle}>
                    <button
                      style={{ ...buttonStyle, backgroundColor: '#4CAF50', color: 'white' }}
                      onClick={() => onEdit(user)}
                    >
                      Edit
                    </button>
                    <DeleteUserComponent user={user} onDelete={onDelete} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserListComponent;
