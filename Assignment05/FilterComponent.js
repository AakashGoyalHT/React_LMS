import React from 'react';

class FilterComponent extends React.Component {
  handleChange = (e) => {
    this.props.onFilterChange(e.target.value);
  };

  render() {
    return (
      <div style={{
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px'
      }}>
        <label htmlFor="roleFilter" style={{ marginBottom: '5px' }}>
          Filter By Role:
        </label>
        <select
          id="roleFilter"
          value={this.props.selectedRole}
          onChange={this.handleChange}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        >
          <option value="">All</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
    );
  }
}

export default FilterComponent;
