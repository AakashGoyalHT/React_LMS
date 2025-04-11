import React from 'react';
import UserWidgetComponent from './UserWidgetComponent';

const TestPage = () => {
  const user1 = {
    photo: 'https://randomuser.me/api/portraits/men/75.jpg',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    status: 'Active'
  };

  const user2 = {
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    status: 'Inactive'
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>User Widget</h1>

      {/* First User */}
      <UserWidgetComponent
        photo={user1.photo}
        firstName={user1.firstName}
        lastName={user1.lastName}
        email={user1.email}
        status={user1.status}
      />

      {/* Second User */}
      <UserWidgetComponent
        photo={user2.photo}
        firstName={user2.firstName}
        lastName={user2.lastName}
        email={user2.email}
        status={user2.status}
      />
    </div>
  );
};

export default TestPage;
