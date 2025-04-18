import React, { Component } from 'react';

class DeleteUserComponent extends Component {
  handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${this.props.user.firstName}?`);
    if (confirmDelete) {
      this.props.onDelete(this.props.user.id);
      alert("The user has been deleted successfully");
    }
  };

  render() {
    return (
      <button
        style={{ backgroundColor: '#f44336', color: 'white', padding: '6px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        onClick={this.handleDelete}
      >
        Delete
      </button>
    );
  }
}

export default DeleteUserComponent;
