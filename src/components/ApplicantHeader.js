import React from 'react';
import classes from './ApplicantHeader.css';

const ApplicantHeader = () =>{
    return (
        <div className={classes.applicantsContainer}>
            <div className={classes.jobId}>
                <h3 className={classes.headers}>JobId</h3>
            </div>
            <div className={classes.applicantsName}>
                <h3 className={classes.headers}>Name</h3>
            </div>
            <div className={classes.jobTitle}>
                <h3 className={classes.headers}>Job Title</h3>
            </div>
            <div className={classes.appliedDate}>
                <h3 className={classes.headers}>Applied Date</h3>
            </div>
            <div className={classes.jobLocation}>
                <h3 className={classes.headers}>Job Location</h3>
            </div>
            <div className={classes.jobVisa}>
                <h3 className={classes.headers}>Sponsorship Required</h3>
            </div>
            <div className={classes.jobStatus}>
                <h3 className={classes.headers}>Job Status</h3>
            </div>
        </div>
      );
};

export default ApplicantHeader;