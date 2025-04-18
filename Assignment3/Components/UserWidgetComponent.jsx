import React from 'react';
import USEIMAGE from '../Assets/USEIMAGE.jpg';
import DeleteUserComponent from './DeleteUserComponent';

const UserWidgetComponent = ({ user, onEdit, onDelete }) => {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <img src={USEIMAGE} alt="User" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
      <h3>{user.firstName} {user.lastName}</h3>
      <p>Login: {user.login}</p>
      <p> Phone: {user.phone} </p>
      <p> Role: {user.role}</p>
      <div>
        <button
          onClick={onEdit}
          style={{
            marginRight: '5px',
            padding: '6px 10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white'
          }}
        >
          Edit
        </button>

        <DeleteUserComponent user={user} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default UserWidgetComponent;
