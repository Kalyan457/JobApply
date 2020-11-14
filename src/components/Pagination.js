import React from 'react';
import classes from './Pagination.css';

const Pagination = ({ jobsPerPage, totalJobs, paginate,curNumber }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={classes.pageNums}>
        {pageNumbers.map(number => (
          // <li key={number} className={classes.pageNumsLI}>
          <li key={number} className={curNumber == number ? classes.pageNumsLIActive : classes.pageNumsLI}>
            <a onClick={() => paginate(number)} className={classes.pageNumsAnchorTags}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;