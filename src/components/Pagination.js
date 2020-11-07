import React from 'react';
import classes from './Pagination.css';

const Pagination = ({ jobsPerPage, totalJobs, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={classes.pageNums}>
        {pageNumbers.map(number => (
          <li key={number} className={classes.pageNumsLI}>
            <a onClick={() => paginate(number)} href='!#' className={classes.pageNumsAnchorTags}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;