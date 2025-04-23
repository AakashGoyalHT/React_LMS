// PaginationComponent.js
import React from 'react';

const PaginationComponent = ({ currentPage, totalUsers, usersPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  if (totalPages === 1) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        {'<'}
      </button>

      {[...Array(totalPages)].map((x, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          style={{ fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}
        >
          {index + 1}
        </button>
      ))}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        {'>'}
      </button>
    </div>
  );
};

export default PaginationComponent;
