import React from 'react';

class DashboardWidgetComponent extends React.Component {
  handleClick = (filter) => {

    if (filter === 'All') {
      window.location.href = '/user-list';
    } else {
      window.location.href = `/user-list?status=${filter}`;
    }
  };

  render() {
    const { users } = this.props;

    const totalUsers = users.length;
    const totalActive = users.filter(user => user.status === 'Active').length;
    const totalInactive = users.filter(user => user.status === 'Inactive').length;

    const widgetStyle = {
      flex: 1,
      margin: '10px',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      cursor: 'pointer',
      background: '#f2f2f2',
      boxShadow: '0px 2px 8px rgba(0,0,0,0.1)'
    };

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={widgetStyle} onClick={() => this.handleClick('All')}>
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div style={widgetStyle} onClick={() => this.handleClick('Active')}>
          <h3>Active Users</h3>
          <p>{totalActive}</p>
        </div>
        <div style={widgetStyle} onClick={() => this.handleClick('Inactive')}>
          <h3>Inactive Users</h3>
          <p>{totalInactive}</p>
        </div>
      </div>
    );
  }
}

export default DashboardWidgetComponent;
