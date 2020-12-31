import React from 'react';
import classes from './JobHeader.css';

const JobHeader = (props) =>{
    var company = "Company";
    var jobStatus = "Job Status";
    return (
        <div className={props.noFilterSearch ? classes.savedJobsContainer : classes.jobsContainer}>
            <div className={props.callFromRecruiter ? classes.jobIdRecruiter : classes.jobId}>
                <h3 className={classes.headers}>JobId</h3>
            </div>
            <div className={props.callFromRecruiter ? classes.jobCompanyRecruiter : classes.jobCompany}>
                <h3 className={classes.headers}>{props.callFromRecruiter ? jobStatus : company}</h3>
            </div>
            <div className={props.callFromRecruiter ? classes.jobTitleRecruiter : classes.jobTitle}>
                <h3 className={classes.headers}>Title</h3>
            </div>
            <div className={props.callFromRecruiter ? classes.jobLocationRecruiter : classes.jobLocation}>
                <h3 className={classes.headers}>Location</h3>
            </div>
            <div className={props.callFromRecruiter ? classes.jobType : classes.jobRequirements}>
                <h3 className={classes.headers}>{props.callFromRecruiter ? "Type" : "Requirements"}</h3>
            </div>
            <div className={props.callFromRecruiter ? classes.postedDateRecruiter : classes.postedDate}>
                <h3 className={classes.headers}>Posted On</h3>
            </div>
            <div className={props.callFromRecruiter ? classes.jobVisaRecruiter : classes.jobVisa}>
                <h3 className={classes.headers}>Sponsor Visa</h3>
            </div>
        </div>
      );
};

export default JobHeader;