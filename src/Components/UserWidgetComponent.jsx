import React from 'react';
import './UserWidgetComponent.css';

const UserWidgetComponent = ({ photo, firstName, lastName, email, status }) => {
  return (
    <div className="user-widget">
      <img src={photo} alt={firstName + ' ' + lastName} className="user-photo" />
      <div className="user-info">
        <h2>{firstName + ' ' + lastName}</h2>
        <p>{email}</p>
        <p className={"status " + status.toLowerCase()}>{status}</p>
      </div>
    </div>
  );
};

export default UserWidgetComponent;
