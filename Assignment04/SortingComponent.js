import React from "react";

class SortingComponent extends React.Component {
  handleChange = (e) => {
    this.props.onSortChange(e.target.value);
  };

  render() {
    return (
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="sort">Sort By: </label>
        <select id="sort" value={this.props.selectedSort} onChange={this.handleChange}>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
          <option value="created">Created Date</option>
          <option value="updated">Last Updated</option>
        </select>
      </div>
    );
  }
}

export default SortingComponent;
