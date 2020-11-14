import React from 'react';
import classes from './JobHeader.css';

const JobHeader = (props) =>{
    return (
        <div className={props.noFilterSearch ? classes.savedJobsContainer : classes.jobsContainer}>
            <div className={classes.jobId}>
                <h3 className={classes.headers}>ID</h3>
            </div>
            <div className={classes.jobCompany}>
                <h3 className={classes.headers}>Company</h3>
            </div>
            <div className={classes.jobLocation}>
                <h3 className={classes.headers}>Location</h3>
            </div>
            <div className={classes.jobTitle}>
                <h3 className={classes.headers}>Title</h3>
            </div>
            <div className={classes.jobRequirements}>
                <h3 className={classes.headers}>Requirements</h3>
            </div>
            <div className={classes.jobVisa}>
                <h3 className={classes.headers}>Visa</h3>
            </div>
        </div>
      );
};

export default JobHeader;